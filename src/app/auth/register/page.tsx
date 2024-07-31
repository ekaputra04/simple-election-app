"use client";

import { toast } from "sonner";
import { useState, ChangeEvent } from "react";
// import { auth, firestore } from "../../../lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// inisialisasi aplikasi firebase
const auth = getAuth();
const firestore = getFirestore();

/**
 * RegisterPage component is responsible for handling the registration process of a new user.
 *
 * @return {JSX.Element} The JSX element containing the registration form.
 */

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    if (password.length < 6) {
      toast.error("Password must be longer than 6 characters!");
      return;
    }

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

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
      });
      toast.success("Registrasi berhasil!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 500);
    } catch (error: any) {
      console.error("Error registering:", error);
      toast.error("Registrasi gagal!");
      setTimeout(() => {
        toast.error(error.message);
      }, 1000);
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
        <title>Login</title>
      </Head>

      <div className="flex justify-center items-center bg-primary w-full h-[100vh]">
        <div className="flex flex-col border-white/30 shadow-sm/50 shadow-white p-8 border rounded-md md:w-1/2 lg:w-1/3">
          <h4 className="scroll-m-20 text-white text-xl poppins-semibold">
            Create an account
          </h4>
          <p className="[&:not(:first-child)]:mt-4 text-sm text-white/50 poppins-regular">
            Enter your email below to create your account
          </p>
          <p className="[&:not(:first-child)]:mt-4 text-sm text-white poppins-regular">
            Full Name
          </p>
          <input
            required
            placeholder="Eka Putra"
            type="text"
            value={name}
            onChange={handleInputChange(setName)}
            className="border-white/30 bg-primary mt-2 p-2 border rounded-sm text-sm text-white placeholder:text-white/30 poppins-regular"
          />
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
            onClick={handleRegister}
          >
            Submit
          </button>

          <p className="m-auto mt-6 text-sm text-white">
            Have an Account? Sign In{" "}
            <Link href={"/auth/login"} className="font-bold">
              Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
