export default function AboutPage() {
  return (
    <section className="px-48 pt-24">
      <div className="text-center">
        <h3 className="bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4 font-extrabold text-3xl text-transparent lg:text-4xl">
          About the Election
        </h3>
        <p className="mb-8 text-lg lg:text-xl">
          Join us in making a difference! This app allows you to participate in
          the election and vote for the best candidate. Your vote matters, and
          together we can shape the future!
        </p>
      </div>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mt-12">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="bg-cyan-500 shadow-lg p-5 rounded-full">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l6.16-3.422A12 12 0 0112 2a12 12 0 00-6.16 8.578L12 14zm0 0v8m0 0l6.16-3.422A12 12 0 0112 22a12 12 0 01-6.16-3.422L12 14z"
              ></path>
            </svg>
          </div>
          <h4 className="mt-4 font-semibold text-xl lg:text-2xl">
            Transparent Voting
          </h4>
          <p className="mt-2 text-center text-gray-600">
            Ensure transparency with a secure and easy-to-use voting system.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 shadow-lg p-5 rounded-full">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c.902 0 1.783-.3 2.475-.844m0 0A6.97 6.97 0 0012 3c-1.63 0-3.134.553-4.336 1.48M7.76 7.156C6.73 8.053 6 9.24 6 10.5 6 12.985 9.013 15 12 15s6-2.015 6-4.5c0-1.26-.73-2.447-1.76-3.344M9.305 14.588C8.387 15.313 7.227 16 6 16c-3 0-5-2-5-4.5C1 10 2 9 3.305 8.412"
              ></path>
            </svg>
          </div>
          <h4 className="mt-4 font-semibold text-xl lg:text-2xl">
            Empower Your Voice
          </h4>
          <p className="mt-2 text-center text-gray-600">
            Every vote counts. Make your voice heard and help elect the best
            leader.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="bg-purple-500 shadow-lg p-5 rounded-full">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v4a4 4 0 01-4 4H8z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 8v8"
              ></path>
            </svg>
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
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-4.553A1 1 0 0119.954 4h-.587a2 2 0 01-1.415-.586L17 3a2 2 0 00-2-2H9a2 2 0 00-2 2l-.952.952A2 2 0 015 4.418V19.57a2 2 0 01-.586 1.415l-.952.952A2 2 0 002 23h16a2 2 0 001.414-.586l.952-.952A2 2 0 0021 19.571V10a2 2 0 00-2-2h-4a1 1 0 01-1-1V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H7a2 2 0 00-2 2v7a1 1 0 01-1 1v1a1 1 0 001 1h10a2 2 0 002-2v-1a1 1 0 011-1h1V10z"
              ></path>
            </svg>
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

      <div className="mt-16 text-center">
        <button className="bg-cyan-500 hover:bg-cyan-600 shadow-md px-6 py-3 rounded-md font-semibold text-white">
          Learn More
        </button>
      </div>
    </section>
  );
}
