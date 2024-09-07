"use client";

import { useEffect, useState } from "react";
import { VotingStatusPieChart, CandidateVotesPieChart } from "./PieChart";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export function DashboardPage() {
  const [votingData, setVotingData] = useState({ voted: 0, notVoted: 0 });
  const [candidateData, setCandidateData] = useState<
    { name: string; votes: number }[]
  >([]);

  useEffect(() => {
    const fetchVotingData = async () => {
      const usersCollection = collection(db, "users");
      const candidatesCollection = collection(db, "candidates");

      const [usersSnapshot, candidatesSnapshot] = await Promise.all([
        getDocs(usersCollection),
        getDocs(candidatesCollection),
      ]);

      let voted = 0;
      let notVoted = 0;
      const candidateVotes: { [key: string]: number } = {};

      // Create a map of candidate IDs to names
      const candidateMap: { [key: string]: string } = {};
      candidatesSnapshot.forEach((doc) => {
        const candidate = doc.data();
        candidateMap[doc.id] = candidate.name;
      });

      // Count votes and voting status
      usersSnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.selectedCandidate) {
          voted++;
          const candidateName =
            candidateMap[user.selectedCandidate] || "Unknown";
          candidateVotes[candidateName] =
            (candidateVotes[candidateName] || 0) + 1;
        } else {
          notVoted++;
        }
      });

      setVotingData({ voted, notVoted });

      const candidateDataArray = Object.entries(candidateVotes).map(
        ([name, votes]) => {
          return { name, votes };
        }
      );

      setCandidateData(candidateDataArray);
    };

    fetchVotingData();
  }, []);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <VotingStatusPieChart votingData={votingData} />

      <CandidateVotesPieChart candidateData={candidateData} />
    </>
  );
}
