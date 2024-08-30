import Image from "next/image";
import Candidate from "./types/CandidateType";
import CandidateCard from "./CandidateCard";
import Link from "next/link";
import CandidatesList from "./CandidateList";

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
    <main className="mx-auto px-8 container md:px-32 lg:px-48">
      {/* Hero Section */}
      <section className="rounded-lg md:grid md:grid-cols-2 h-[100vh] flex flex-col pt-24">
        <div className="flex items-center">
          <div>
            <h2 className="mb-4 font-bold text-3xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Welcome to the Election App
            </h2>
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

      {/* Profil Calon Pemimpin */}
      <section className="mt-12">
        <h3 className="mb-4 font-bold text-2xl bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent">
          Candidates
        </h3>
        {/* Contoh profil kandidat */}
        {/* <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              name={candidate.name}
              vision={candidate.vision}
              imageUrl={candidate.imageUrl}
            />
          ))}
        </div> */}
        <CandidatesList />
      </section>

      {/* Statistik Pemilihan */}
      <section className="mt-12">
        <h3 className="mb-4 font-bold text-2xl">Election Statistics</h3>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <h4 className="mb-2 font-bold text-xl">100</h4>
            <p className="text-gray-700">Total Voters</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <h4 className="mb-2 font-bold text-xl">5</h4>
            <p className="text-gray-700">Candidates</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <h4 className="mb-2 font-bold text-xl">75%</h4>
            <p className="text-gray-700">Voter Turnout</p>
          </div>
        </div>
      </section>

      {/* Berita & Pengumuman */}
      <section className="mt-12">
        <h3 className="mb-4 font-bold text-2xl">News & Announcements</h3>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h4 className="mb-2 font-bold text-xl">Upcoming Debate</h4>
          <p className="text-gray-700">
            Join us for the upcoming debate on [date] to hear from the
            candidates directly.
          </p>
        </div>
      </section>

      {/* Testimoni Pengguna */}
      <section className="mt-12">
        <h3 className="mb-4 font-bold text-2xl">User Testimonials</h3>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <p className="text-gray-700">
            This app made the election process so much easier and more
            transparent! - User A
          </p>
        </div>
      </section>
    </main>
  );
}
