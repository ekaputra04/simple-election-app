import Image from "next/image";

interface CandidateCardProps {
  name: string;
  vision: string;
  imageUrl: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  vision,
  imageUrl,
}) => {
  return (
    <div className="border-spacing-1 border-white/50 bg-primary shadow-md border rounded-lg w-80 overflow-hidden">
      <Image
        src={imageUrl}
        alt={name}
        width={320}
        height={180}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="mb-2 font-semibold text-white text-xl">{name}</h2>
        <p className="text-gray-600">{vision}</p>
      </div>
    </div>
  );
};

export default CandidateCard;
