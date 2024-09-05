import Image from "next/image";
import Link from "next/link";
import CandidatesList from "./CandidateList";
import TypingAnimation from "./magicui/typing-animation";
import RetroGrid from "./magicui/retro-grid";
import { VelocityScroll } from "./magicui/scroll-based-velocity";
import StatisticCard from "./StatisticCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarqueeDemo } from "./MarqueeDemo";
import Meteors from "./magicui/meteors";

export default function HomePage() {
  return (
    <>
      <main className="mx-auto px-8 container md:px-32 lg:px-48 relative">
        {/* Hero Section */}
        <div className="fixed left-0 -z-30 flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden ">
          <Meteors number={30} />
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
                Participate in the election and vote for your favorite
                candidate!
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

        <section className="lg:mt-32">
          <TypingAnimation
            className="mb-4 font-bold text-3xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent flex justify-start pt-16"
            text="Candidates"
          />
          <CandidatesList votingOption={false} />
        </section>

        <section className="lg:mt-32">
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

        <section className="lg:mt-32 pb-32">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I register to vote?</AccordionTrigger>
              <AccordionContent>
                To register as a voter, go to the Register section on the
                homepage, fill in your personal details, and submit the form.
                Make sure to complete the registration before the election date.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How many candidates can I vote for?
              </AccordionTrigger>
              <AccordionContent>
                You can vote for one candidate only. Once you have cast your
                vote, it cannot be changed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How do I view candidate profiles?
              </AccordionTrigger>
              <AccordionContent>
                Candidate profiles, including their name, vision, and mission,
                can be viewed on the homepage under the Candidates section.
                Click on each candidate to see detailed information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I change my vote?</AccordionTrigger>
              <AccordionContent>
                No, once you have cast your vote, it is final and cannot be
                changed. Please make sure you have reviewed the candidates
                before voting.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                How are the results announced?
              </AccordionTrigger>
              <AccordionContent>
                The results will be announced on the homepage after the voting
                period ends. You can see the winner and the vote count for each
                candidate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <MarqueeDemo />
        </section>
      </main>
    </>
  );
}
