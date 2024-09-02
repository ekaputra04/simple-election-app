"use client";

import { toast } from "sonner";
import { useState, ChangeEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RetroGrid from "@/components/magicui/retro-grid";
import { useAuthMiddleware } from "@/app/auth/middleware/useAuthMiddleware";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, loading } = useAuthMiddleware();

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (user) {
    // Jika pengguna sudah login, arahkan ke halaman utama atau dashboard
    return null;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be longer than 6 characters!");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/"); // Replace with your desired route
      }, 500);
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast.error("Login failed!");
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
            <CardTitle>Login</CardTitle>
            <CardDescription>
              <p className="[&:not(:first-child)]:mt-4 py-3 text-sm poppins-regular">
                Enter your email below to login
              </p>
              <div className="items-center gap-2 grid pt-3 w-full max-w-sm">
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
                onClick={handleLogin}
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
