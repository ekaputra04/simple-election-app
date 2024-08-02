import CandidateCard from "@/components/CandidateCard";
import Navbar from "@/components/Navbar";

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
  // Tambahkan calon lain di sini
];

export default function HomePage() {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <main className="mx-auto px-48 py-6 container">
        <h2 className="mb-6 font-semibold text-lg text-white/90">
          Meet the Candidates
        </h2>
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
      </main>

      <footer className="bg-blue-600 p-4 text-white/90">
        <div className="mx-auto text-center container">
          <p>&copy; 2024 Election App. All rights reserved.</p>
          <div className="mt-2">
            <a href="/contact" className="text-white/90 hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
