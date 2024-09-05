"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthMiddleware } from "@/app/auth/middleware/useAuthMiddleware";
import { useParams, useRouter } from "next/navigation";
import Candidate from "./types/CandidateType";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import DotPattern from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function EditCandidatePage() {
  const { user, loading, isAdmin } = useAuthMiddleware();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCandidate = async () => {
        const candidateDoc = await getDoc(doc(db, "candidates", id as string));
        if (candidateDoc.exists()) {
          const candidateData = candidateDoc.data() as Candidate;
          setCandidate({
            id: candidateDoc.id,
            name: candidateData.name || "",
            description: candidateData.description || "",
            vision: candidateData.vision || "",
            mission: candidateData.mission || "",
            photoURL: candidateData.photoURL || "",
          });

          setName(candidateData.name || "");
          setDescription(candidateData.description || "");
          setVision(candidateData.vision || "");
          setMission(candidateData.mission || "");
        }
      };

      fetchCandidate();
    }
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  if (!user || isAdmin === false) return <h1>Access Denied</h1>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      setFile(newFile);

      // Update the candidate state to show the new image immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setCandidate(
          (prev) => prev && { ...prev, photoURL: e.target?.result as string }
        );
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleSubmit = async () => {
    setUploading(true);

    try {
      let photoURL = candidate?.photoURL || "";

      if (file) {
        // If there's an existing photoURL, delete the old file from storage
        if (candidate?.photoURL && candidate.photoURL !== "") {
          const oldPhotoRef = ref(storage, candidate.photoURL);
          await deleteObject(oldPhotoRef);
        }

        // Upload new file to Firebase Storage
        const storageRef = ref(storage, `candidates/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => reject(error),
            async () => {
              photoURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Update candidate in Firestore
      const candidateRef = doc(db, "candidates", id as string);
      await updateDoc(candidateRef, {
        name,
        description,
        vision,
        mission,
        photoURL,
      });

      toast.success("Candidate updated successfully");
      router.push("/dashboard/candidates");
    } catch (error) {
      console.error("Error updating candidate:", error);
      toast.error("Error updating candidate");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] opacity-50"
        )}
      />
      <div className="">
        <div className="">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/candidates">
                  Candidates
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashboard/candidates/edit/${id}`}>
                  Edit
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="font-bold text-lg mt-4">Edit Candidate</h1>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid w-full gap-1.5 max-w-sm mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Type candidate's description here."
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid w-full gap-1.5 max-w-sm mt-4">
          <Label htmlFor="vision">Vision</Label>
          <Textarea
            placeholder="Type candidate's vision here."
            id="vision"
            value={vision}
            onChange={(e) => setVision(e.target.value)}
          />
        </div>

        <div className="grid w-full gap-1.5 max-w-sm mt-4">
          <Label htmlFor="mission">Mission</Label>
          <Textarea
            placeholder="Type candidate's mission here."
            id="mission"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
          />
        </div>

        <div className="grid w-full gap-1.5 max-w-sm mt-4">
          {candidate?.photoURL && (
            <div className="rounded-md overflow-hidden object-cover flex justify-center">
              <Image
                width={200}
                height={100}
                src={candidate.photoURL}
                alt={candidate?.name}
                className="rounded-md"
              />
            </div>
          )}
          <Label htmlFor="picture" className="mt-2">
            Picture
          </Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
        </div>

        <Button
          className="text-white dark:text-slate-900 mt-4"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </Button>
        <Button
          className="text-white mt-4 ms-4"
          onClick={() => {
            router.back();
          }}
          variant={"destructive"}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
