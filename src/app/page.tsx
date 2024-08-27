import CandidateCard from "@/components/CandidateCard";
import Navbar from "@/components/Navbar";
import Image from "next/image";

interface Candidate {
  id: string;
  name: string;
  vision: string;
  imageUrl: string;
}

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

export default function HomePage() {
  return (
    <div className="">
      <Navbar />
      <main className=" mx-auto px-48 py-16 text-white/90 container">
        {/* Hero Section */}
        <section className="shadow-lg py-12 rounded-lg">
          <h2 className="mb-4 font-bold text-3xl">
            Welcome to the Election App
          </h2>
          <p className="mb-6 text-lg">
            Participate in the election and vote for your favorite candidate!
          </p>
          <button className="bg-white hover:bg-gray-200 shadow px-4 py-2 rounded text-primary">
            Get Started
          </button>
        </section>

        {/* Informasi Umum */}
        <section className="mt-12">
          <h3 className="mb-4 font-bold text-2xl">About the Election</h3>
          <p className="">
            This app allows you to participate in the election and vote for the
            best candidate. Your vote matters!
          </p>
        </section>

        {/* Profil Calon Pemimpin */}
        <section className="mt-12">
          <h3 className="mb-4 font-bold text-2xl">Candidates</h3>
          {/* Contoh profil kandidat */}
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                name={candidate.name}
                vision={candidate.vision}
                imageUrl={candidate.imageUrl}
              />
            ))}
          </div>
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
    </div>
  );
}
