"use client";

import { toast } from "sonner";
import { useState, ChangeEvent } from "react";
import { auth } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { useAuthMiddleware } from "../../auth/middleware/authMiddleware";
import Loader from "@/components/Loader";

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
      <Head>
        <title>Simple Election App</title>
      </Head>

      <Loader loading={isLoading} />

      <div className="flex justify-center items-center bg-primary w-full h-[100vh]">
        <div className="flex flex-col border-white/30 shadow-sm/50 shadow-white p-8 border rounded-md md:w-1/2 lg:w-1/3">
          <h4 className="scroll-m-20 text-white text-xl poppins-semibold">
            Login
          </h4>
          <p className="[&:not(:first-child)]:mt-4 text-sm text-white/50 poppins-regular">
            Enter your email below to login
          </p>
          <p className="[&:not(:first-child)]:mt-4 text-sm text-white poppins-regular">
            Email
          </p>
          <input
            required
            type="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            placeholder="eka@gmail.com"
            className="border-white/30 bg-primary mt-2 p-2 border rounded-sm text-sm text-white placeholder:text-white/30 poppins-regular"
          />
          <p className="[&:not(:first-child)]:mt-4 text-sm text-white poppins-regular">
            Password
          </p>
          <input
            required
            type="password"
            value={password}
            onChange={handleInputChange(setPassword)}
            placeholder="*****"
            className="border-white/30 bg-primary mt-2 p-2 border rounded-sm text-sm text-white placeholder:text-white/30 poppins-regular"
          />
          <button
            className="bg-white mt-8 py-2 rounded-sm font-bold text-primary poppins-semibold"
            onClick={handleLogin}
            disabled={isLoading}
          >
            Submit
          </button>

          <p className="m-auto mt-6 text-sm text-white">
            Dont have an Account? Sign Up{" "}
            <Link href={"/auth/register"} className="font-bold">
              Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
