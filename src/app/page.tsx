import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Head from "next/head";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Simple Election App</title>
      </Head>
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      ></div>
    </>
  );
}
