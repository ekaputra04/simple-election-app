import Image from "next/image";
import Candidate from "./types/CandidateType";
import CandidateCard from "./CandidateCard";
import Link from "next/link";
import CandidatesList from "./CandidateList";
import TypingAnimation from "./magicui/typing-animation";
import RetroGrid from "./magicui/retro-grid";
import NumberTicker from "./magicui/number-ticker";
import { VelocityScroll } from "./magicui/scroll-based-velocity";
import StatisticCard from "./StatisticCard";

export default function HomePage() {
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "John Doe",
      vision: "To lead with integrity and innovation.",
      imageUrl: "/images/candidate.jpg",
    },
    {
      id: "2",
      name: "John Doe",
      vision: "To lead with integrity and innovation.",
      imageUrl: "/images/candidate.jpg",
    },
    {
      id: "3",
      name: "John Doe",
      vision: "To lead with integrity and innovation.",
      imageUrl: "/images/candidate.jpg",
    },
  ];

  return (
    <main className="mx-auto px-8 container md:px-32 lg:px-48 relative">
      {/* Hero Section */}
      <div className="fixed left-0 -z-30 flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden ">
        <RetroGrid />
      </div>
      <section className="rounded-lg md:grid md:grid-cols-2 h-[100vh] flex flex-col pt-24">
        <div className="flex items-center">
          <div>
            <TypingAnimation
              className="mb-4 font-bold text-3xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent flex justify-start"
              text="Welcome to the Election App"
            />
            <p className="mb-6 text-lg">
              Participate in the election and vote for your favorite candidate!
            </p>
            <button className="shadow-md border border-purple-500 px-4 py-2 rounded-lg text-primary animate-bounce">
              <Link href={"/about"}>Get Started</Link>
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="">
            <Image
              src="/images/voting.png"
              alt="voting"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      <section>
        <VelocityScroll
          text="Choice your candidate!"
          default_velocity={1}
          className="font-display text-center text-xl font-bold tracking-[-0.02em] bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent md:text-3xl md:leading-[3rem] opacity-30 "
        />
      </section>

      {/* Profil Calon Pemimpin */}
      <section className="lg:mt-32">
        <TypingAnimation
          className="mb-4 font-bold text-3xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent flex justify-start pt-16"
          text="Candidates"
        />
        <CandidatesList votingOption={false} />
      </section>

      {/* Statistik Pemilihan */}
      <section className="lg:mt-32 pb-32">
        <TypingAnimation
          className="mb-4 font-bold text-3xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent flex justify-start pt-16"
          text="Election Statistics"
        />
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <StatisticCard number={100} description="Total Voters" />
          <StatisticCard number={5} description="Candidate" />
          <StatisticCard
            number={75}
            description="Voter Turnout"
            isPercentage={true}
          />
        </div>
      </section>
    </main>
  );
}
