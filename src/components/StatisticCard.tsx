"use client";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NumberTicker from "./magicui/number-ticker";

interface StatisticCardProps {
  number: number;
  description: string;
  isPercentage?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  number,
  description,
  isPercentage = false,
}) => {
  return (
    <Card className="bg-transparent shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="mx-auto font-semibold text-xl">
          <NumberTicker value={number} />
          {isPercentage ? "%" : ""}
        </CardTitle>
        <CardDescription className="mx-auto text-gray-600 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StatisticCard;
