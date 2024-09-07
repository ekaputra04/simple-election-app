import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vote | Election App",
  description: "Generated by create next app",
};

export default function VoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}
