"use client";
import { BsGlobeAmericas } from "react-icons/bs";
import RetroGrid from "./magicui/retro-grid";

export default function AboutPage() {
  return (
    <>
      <section className="px-8 lg:px-48 py-24">
        <div className="text-center">
          <h3 className="bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4 font-extrabold text-3xl text-transparent lg:text-4xl">
            About the Election
          </h3>
          <p className="mb-8 font-normal text-gray-600 text-md lg:text-xl dark:text-white/70">
            Join us in making a difference! This app allows you to participate
            in the election and vote for the best candidate. Your vote matters,
            and together we can shape the future!
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mt-12">
          <div className="flex flex-col items-center">
            <div className="bg-cyan-500 shadow-lg p-5 rounded-full">
              <BsGlobeAmericas width={64} height={64} />
            </div>
            <h4 className="mt-4 font-semibold text-xl lg:text-2xl">
              Transparent Voting
            </h4>
            <p className="mt-2 text-center text-gray-600">
              Ensure transparency with a secure and easy-to-use voting system.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-blue-500 shadow-lg p-5 rounded-full">
              <BsGlobeAmericas width={64} height={64} />
            </div>
            <h4 className="mt-4 font-semibold text-xl lg:text-2xl">
              Empower Your Voice
            </h4>
            <p className="mt-2 text-center text-gray-600">
              Every vote counts. Make your voice heard and help elect the best
              leader.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-purple-500 shadow-lg p-5 rounded-full">
              <BsGlobeAmericas width={64} height={64} />
            </div>
            <h4 className="mt-4 font-semibold text-xl lg:text-2xl">
              Secure Platform
            </h4>
            <p className="mt-2 text-center text-gray-600">
              Our platform uses state-of-the-art security to protect your vote.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-500 shadow-lg p-5 rounded-full">
              <BsGlobeAmericas width={64} height={64} />
            </div>
            <h4 className="mt-4 font-semibold text-xl lg:text-2xl">
              User-Friendly Interface
            </h4>
            <p className="mt-2 text-center text-gray-600">
              Navigate with ease. Our platform is designed for simplicity and
              efficiency.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
