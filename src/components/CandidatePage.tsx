"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { cn, fetchCandidates } from "@/lib/utils";
import Candidate from "./types/CandidateType";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/lib/firebase";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DotPattern from "./magicui/dot-pattern";

export function CandidatePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");

  const fetchData = async () => {
    const candidatesData = await fetchCandidates();
    setCandidates(candidatesData);
    setLoading(false);
  };

  fetchData();

  const handleDelete = async (id: string) => {
    try {
      // Referensi ke dokumen kandidat yang ingin dihapus
      const candidateRef = doc(db, "candidates", id);

      // Menghapus dokumen dari Firestore
      await deleteDoc(candidateRef);

      toast.success("Candidate deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("Error deleting candidate");
    }
  };

  return (
    <>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] opacity-50"
        )}
      />
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete(id);
              }}
              className="text-white dark:text-slate-900"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
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
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Candidate List</h1>
          <Link href={"/dashboard/candidates/create"}>
            <Button className="text-white dark:text-slate-900">
              Create Candidate
            </Button>
          </Link>
        </div>
        <Table>
          <TableCaption>A list of candidates</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Vision</TableHead>
              <TableHead>Mission</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.description}</TableCell>
                <TableCell>{candidate.vision}</TableCell>
                <TableCell>{candidate.mission}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-wrap justify-end gap-4">
                    <Link href={`/dashboard/candidates/edit/${candidate.id}`}>
                      <Button className="bg-muted hover:text-white dark:hover:text-slate-900">
                        Edit
                      </Button>
                    </Link>

                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-red-500 btn hover:text-white dark:hover:text-slate-900"
                        onClick={() => {
                          setId(candidate.id);
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">{candidates.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </AlertDialog>
    </>
  );
}
