"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CandidateCard from "./CandidateCard";

interface Candidate {
  id: string;
  name: string;
  description: string;
  photoURL: string;
  vision: string;
  mission: string;
}

interface CandidateListProps {
  votingOption: boolean;
}

const CandidatesList: React.FC<CandidateListProps> = ({
  votingOption = false,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      const candidatesData = querySnapshot.docs.map((doc) => {
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
      }) as Candidate[];
      console.log(candidatesData);

      setCandidates(candidatesData);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {candidates.map((candidate) => (
        <CandidateCard
          id={candidate.id}
          key={candidate.id}
          name={candidate.name}
          description={candidate.description}
          photoUrl={candidate.photoURL}
          vision={candidate.vision}
          mission={candidate.mission}
          votingOption={votingOption}
        />
      ))}
    </div>
  );
};

export default CandidatesList;
