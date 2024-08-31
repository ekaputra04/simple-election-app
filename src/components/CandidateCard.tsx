"use client";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CandidateCardProps {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  id,
  name,
  description,
  photoUrl,
}) => {
  const validphotoUrl =
    photoUrl && photoUrl.trim() !== "" ? photoUrl : "/images/candidate.png";

  return (
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
      </CardHeader>
    </Card>
  );
};

export default CandidateCard;
