import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { collection, getDocs, query, where } from "firebase/firestore";
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

interface VoterData {
  selectedCandidate: string;
}

interface CandidateData {
  name: string;
}

async function getElectionStats(): Promise<{
  totalVoters: number;
  totalCandidates: number;
  voterTurnout: number;
}> {
  try {
    // Fetching total voters who have voted
    const votersQuery = query(
      collection(db, "users"),
      where("selectedCandidate", ">", "")
    );
    const votersSnapshot = await getDocs(votersQuery);
    const totalVoters = votersSnapshot.size;

    // Fetching total candidates
    const candidatesSnapshot = await getDocs(collection(db, "candidates"));
    const totalCandidates = candidatesSnapshot.size;

    // Calculating voter turnout
    const totalUsersSnapshot = await getDocs(collection(db, "users"));
    const totalUsers = totalUsersSnapshot.size;
    const voterTurnout = totalUsers > 0 ? (totalVoters / totalUsers) * 100 : 0;

    return {
      totalVoters,
      totalCandidates,
      voterTurnout,
    };
  } catch (error) {
    console.error("Error fetching election stats:", error);
    throw new Error("Failed to fetch election statistics");
  }
}

export default getElectionStats;
