"use client";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CandidateCardProps {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  votingOption?: boolean;
  vision?: string;
  mission?: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  id,
  name,
  description,
  photoUrl,
  votingOption = false,
  vision,
  mission = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  const validphotoUrl =
    photoUrl && photoUrl.trim() !== "" ? photoUrl : "@/images/candidate.png";

  // Check if the user has already voted
  useEffect(() => {
    const checkUserVote = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.selectedCandidate === "") {
            setHasVoted(false);
          } else if (userData.selectedCandidate !== null) {
            setHasVoted(userData.selectedCandidate !== null);
          } else {
            setHasVoted(userData.selectedCandidate !== null);
          }
        }
      }
    };

    checkUserVote();
  }, [auth.currentUser]);

  const handleVote = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("You need to be logged in to vote.");
      return;
    }

    setIsLoading(true);

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        selectedCandidate: id,
      });
      setHasVoted(true);
      toast.success(`You have voted for ${name}`);
      router.push("/vote");
    } catch (error) {
      toast.error("Failed to cast vote. Please try again.");
      console.error("Error updating selectedCandidate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const missionList = mission
    .split("*")
    .filter((m) => m.trim() !== "")
    .map((m) => m.trim());

  return (
    <>
      <AlertDialog>
        <Card className="bg-transparent shadow-lg dark:text-white/70 overflow-hidden">
          <Image
            src={validphotoUrl}
            alt={name}
            width={320}
            height={180}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle className="font-semibold text-lg">{name}</CardTitle>
            <CardDescription className="text-gray-600 text-sm dark:text-white/70">
              {description}
            </CardDescription>
            <hr />
            <CardDescription className="text-gray-600 text-sm dark:text-white/70">
              <div className="py-2 font-bold text-base">Vision :</div>
              {vision}
            </CardDescription>
            <CardDescription className="pb-4 text-gray-600 text-sm dark:text-white/70">
              <div className="py-2 font-bold text-base">Mission :</div>
              <ul>
                {missionList.map((misi, index) => (
                  <li key={index}>- {misi}</li>
                ))}
              </ul>
            </CardDescription>
            {votingOption && (
              <>
                <AlertDialogTrigger disabled={isLoading || hasVoted}>
                  <Button
                    disabled={isLoading || hasVoted}
                    className="w-full text-white dark:text-slate-950"
                  >
                    {isLoading
                      ? "Processing..."
                      : hasVoted
                      ? "Already Voted"
                      : "Choose Candidate"}
                  </Button>
                </AlertDialogTrigger>
              </>
            )}
          </CardHeader>
        </Card>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You will select {name} as your
              candidate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleVote}
              className="text-white dark:text-slate-950"
              disabled={isLoading || hasVoted}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CandidateCard;
