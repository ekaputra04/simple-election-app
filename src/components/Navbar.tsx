"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsList } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"; // Import icon untuk close

import { ModeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const user = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State untuk mengatur sidebar

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle state ketika tombol diklik
  };

  return (
    <header className="z-50 fixed flex justify-between items-center backdrop-blur-sm mx-auto px-8 md:px-48 py-4 w-full glas">
      <h1 className="font-bold text-lg">
        <Link
          href={"/"}
          className="bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent"
        >
          Election App
        </Link>
      </h1>

      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-2xl">
          {isOpen ? <AiOutlineClose /> : <BsList />} {/* Toggle icon */}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed top-16 right-0 bg-white dark:bg-black shadow-lg transition-transform transform  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-64 md:relative md:flex md:items-center md:bg-transparent md:translate-x-0 md:shadow-none`}
      >
        <ul className="flex md:flex-row flex-col md:items-center gap-6 p-4 w-full">
          <li>
            <Link
              href={"/about"}
              className="block hover:bg-primary/5 px-3 py-2 hover:rounded-md text-sm transition-all"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={"/vote"}
              className="block hover:bg-primary/5 px-3 py-2 hover:rounded-md text-sm transition-all"
            >
              Vote
            </Link>
          </li>
          <li>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="/images/candidate" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                href="/auth/login"
                className="block px-3 py-2 hover:rounded-md text-sm transition-all"
              >
                Login
              </a>
            )}
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
