"use client";

import CandidatesList from "./CandidateList";
import RetroGrid from "./magicui/retro-grid";

export default function VotePage() {
  return (
    <>
      <section className="px-48 py-24">
        <div className="left-0 -z-30 fixed flex flex-col justify-center items-center w-full h-[100vh] overflow-hidden">
          <RetroGrid />
        </div>

        <h3 className="bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4 font-extrabold text-3xl text-transparent lg:text-4xl">
          Vote your favorite candidate
        </h3>

        <section className="lg:mt-8">
          <CandidatesList votingOption={true} />
        </section>
      </section>
    </>
  );
}
