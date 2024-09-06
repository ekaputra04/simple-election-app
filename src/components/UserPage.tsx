"use client";

import { fetchUsers } from "@/lib/utils";
import { useEffect, useState } from "react";
import User from "./types/UserType";

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
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
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
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchUsers();

      // Fetch nama kandidat untuk setiap user
      const usersWithCandidateNames = await Promise.all(
        usersData.map(async (user) => {
          if (user.selectedCandidate) {
            const candidateDoc = await getDoc(
              doc(db, "candidates", user.selectedCandidate)
            );
            if (candidateDoc.exists()) {
              return {
                ...user,
                selectedCandidate: candidateDoc.data().name,
              };
            }
          }
          return { ...user, selectedCandidate: "Unknown Candidate" };
        })
      );

      setUsers(usersWithCandidateNames);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      const userRef = doc(db, "users", id);
      await deleteDoc(userRef);

      toast.success("User deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteUser(id);
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
                <BreadcrumbLink href="/dashboard/users">Users</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Users List</h1>
        </div>

        {loading ? (
          <h1>Loading..</h1>
        ) : (
          <Table>
            <TableCaption>A list of users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>IsAdmin</TableHead>
                <TableHead>Selected Candidate</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <>
                        <Badge className="bg-green-700 text-white">Yes</Badge>
                      </>
                    ) : (
                      <>
                        <Badge className="bg-red-700 text-white">No</Badge>
                      </>
                    )}
                  </TableCell>
                  <TableCell>{user.selectedCandidate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-wrap justify-end gap-4">
                      <Link href={`/dashboard/users/edit/${user.uid}`}>
                        <Button className="bg-muted hover:text-white dark:hover:text-slate-900">
                          Edit
                        </Button>
                      </Link>

                      <AlertDialogTrigger asChild>
                        <Button
                          className="bg-red-500 btn hover:text-white dark:hover:text-slate-900"
                          onClick={() => {
                            setId(user.uid);
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
                <TableCell className="text-right">{users.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </AlertDialog>
    </>
  );
}
