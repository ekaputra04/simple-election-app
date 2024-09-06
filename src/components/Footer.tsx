export default function Footer() {
  return (
    <>
      <footer className="lg:px-48 py-8">
        <div className="flex md:flex-row flex-col justify-between items-center mx-auto container">
          <div className="text-center md:text-left">
            <h5 className="mb-2 font-semibold text-lg">Election App</h5>
            <p className="text-sm">
              &copy; 2024 Election App. All rights reserved.
            </p>
          </div>
          <div className="flex md:flex-row flex-col items-center mt-4 md:mt-0">
            <a href="/about" className="mx-2 text-sm hover:underline">
              About Us
            </a>
            <a href="/privacy" className="mx-2 text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="mx-2 text-sm hover:underline">
              Terms of Service
            </a>
            <a href="/contact" className="mx-2 text-sm hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
