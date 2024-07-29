"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { auth, firestore } from "../../lib/firebase";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showAlert = () => {
    Swal.fire({
      title: "Error!",
      text: "Do you want to continue",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };

  const handleRegister = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await firestore.collection("users").doc(user.uid).set({
        uid: user.uid,
        name,
        email,
        selectedCandidate: null,
      });
      toast.success("Registrasi berhasil!");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Registrasi gagal!");
      setTimeout(() => {
        toast.error(error.message);
      }, 1000);
    }
  };

  return (
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
          placeholder="Eka Putra"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-white/30 bg-primary mt-2 p-2 border rounded-sm text-sm text-white placeholder:text-white/30 poppins-regular"
        />
        <p className="[&:not(:first-child)]:mt-4 text-sm text-white poppins-regular">
          Email
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="eka@gmail.com"
          className="border-white/30 bg-primary mt-2 p-2 border rounded-sm text-sm text-white placeholder:text-white/30 poppins-regular"
        />
        <p className="[&:not(:first-child)]:mt-4 text-sm text-white poppins-regular">
          Password
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*****"
          className="border-white/30 bg-primary mt-2 p-2 border rounded-sm text-sm text-white placeholder:text-white/30 poppins-regular"
        />
        <button
          className="bg-white mt-8 py-2 rounded-sm font-bold text-primary poppins-semibold"
          onClick={handleRegister}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
