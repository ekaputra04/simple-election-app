"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthMiddleware } from "@/app/auth/middleware/useAuthMiddleware";
import { useParams, useRouter } from "next/navigation";
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
import { toast } from "sonner";
import User from "./types/UserType";

export default function EditUserPage() {
  const { user, loading, isAdmin } = useAuthMiddleware();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdminState, setIsAdminState] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [users, setUser] = useState<User | null>(null);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, "users", id as string));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser({
            uid: userDoc.id,
            name: userData.name || "",
            email: userData.email || "",
            isAdmin: userData.isAdmin || false,
            selectedCandidate: userData.selectedCandidate || "",
          });

          setName(userData.name || "");
          setEmail(userData.email || "");
          setIsAdminState(userData.isAdmin || false);
          setSelectedCandidate(userData.selectedCandidate || "");
        }
      };

      fetchUser();
    }
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  if (!user || !isAdmin) return <h1>Access Denied</h1>;

  const handleSubmit = async () => {
    setUploading(true);

    try {
      const userRef = doc(db, "users", id as string);
      await updateDoc(userRef, {
        name,
        email,
        isAdmin: isAdminState,
        selectedCandidate,
      });

      toast.success("User updated successfully");
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/users">Users</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashboard/users/edit/${id}`}>
                  Edit
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="mt-4 font-bold text-lg">Edit User</h1>

        <div className="items-center gap-1.5 grid mt-4 w-full max-w-sm">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="gap-1.5 grid mt-4 w-full max-w-sm">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Type candidate's email here."
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="gap-1.5 grid mt-4 w-full max-w-sm">
          <Label>Is Admin</Label>
          <Select
            value={isAdminState.toString()}
            onValueChange={(value) => setIsAdminState(value === "true")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Is Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="mt-4 text-white dark:text-slate-900"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </Button>
        <Button
          className="mt-4 text-white ms-4"
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
