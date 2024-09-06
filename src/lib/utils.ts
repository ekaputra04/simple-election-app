import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchCandidates = async () => {
  const querySnapshot = await getDocs(collection(db, "candidates"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || "No Name Provided",
      description: data.description || "No Description Provided",
      vision: data.vision || "No Vision Provided",
      mission: data.mission || "No Mission Provided",
      photoURL:
        typeof data.photoURL === "string"
          ? data.photoURL
          : "/images/candidate.png",
    };
  });
};

export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      uid: doc.id,
      name: data.name || "null",
      email: data.email || "null",
      isAdmin: data.isAdmin || false,
      selectedCandidate: data.selectedCandidate || "null",
    };
  });
};
