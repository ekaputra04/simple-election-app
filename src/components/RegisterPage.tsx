"use client";

import { toast } from "sonner";
import { useState, ChangeEvent } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import RetroGrid from "@/components/magicui/retro-grid";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthMiddleware } from "@/app/auth/middleware/useAuthMiddleware";

const auth = getAuth();
const firestore = getFirestore();

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, loading } = useAuthMiddleware();

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (user) {
    return null;
  }

  const handleRegister = async () => {
    if (password.length < 6) {
      toast.error("Password must be longer than 6 characters!");
      return;
    }

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        selectedCandidate: null,
        isAdmin: false,
      });
      toast.success("Registrasi berhasil!");
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Error registering:", error);
      toast.error("Registrasi gagal!");
      setTimeout(() => {
        toast.error(error.message);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <>
      <Loader loading={isLoading} />

      <div className="flex justify-center items-center w-full h-[100vh]">
        <RetroGrid />

        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              <p className="[&:not(:first-child)]:mt-4 py-3 text-sm poppins-regular">
                Enter your data below to create your account
              </p>
              <div className="items-center gap-2 grid pt-3 w-full max-w-sm">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  required
                  onChange={handleInputChange(setName)}
                  value={name}
                />
              </div>
              <div className="items-center gap-2 grid mt-4 w-full max-w-sm">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={handleInputChange(setEmail)}
                  value={email}
                />
              </div>
              <div className="items-center gap-2 grid mt-4 w-full max-w-sm">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  onChange={handleInputChange(setPassword)}
                  value={password}
                />
              </div>

              <Button
                className="mt-6 w-full text-white dark:text-slate-950"
                onClick={handleRegister}
                disabled={isLoading}
              >
                Submit
              </Button>
              <p className="m-auto mt-6 text-sm">
                Dont have an Account? Sign Up{" "}
                <Link href={"/auth/register"} className="font-bold underline">
                  Here
                </Link>
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
