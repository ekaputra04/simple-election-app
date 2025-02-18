"use client";

import CandidatesList from "./CandidateList";

export default function VotePage() {
  return (
    <>
      <section className="px-8 md:px-32 lg:px-48 py-24">
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
