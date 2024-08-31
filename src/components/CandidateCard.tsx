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
  mission,
}) => {
  const validphotoUrl =
    photoUrl && photoUrl.trim() !== "" ? photoUrl : "/images/candidate.png";

  return (
    <>
      <AlertDialog>
        <Card className="shadow-lg overflow-hidden">
          <Image
            src={validphotoUrl}
            alt={name}
            width={320}
            height={180}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle className="font-semibold text-xl">{name}</CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              {description}
            </CardDescription>
            <CardDescription className="text-gray-600 text-sm">
              {vision}
            </CardDescription>
            <CardDescription className="pb-4 text-gray-600 text-sm">
              {mission}
            </CardDescription>
            {votingOption && (
              <>
                <AlertDialogTrigger>
                  <Button className="w-full text-white dark:text-slate-950">
                    Choice Candidate
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-white dark:text-slate-950">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CandidateCard;
