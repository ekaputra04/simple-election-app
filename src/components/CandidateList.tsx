"use client";

import { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import { fetchCandidates } from "@/lib/utils";
import Candidate from "./types/CandidateType";

interface CandidateListProps {
  votingOption: boolean;
}

const CandidatesList: React.FC<CandidateListProps> = ({
  votingOption = false,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const candidatesData = await fetchCandidates();
      setCandidates(candidatesData);
      setLoading(false);
    };

    fetchData();
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
