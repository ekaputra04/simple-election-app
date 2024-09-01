"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsList } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { ModeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import { useAuthMiddleware } from "@/app/auth/middleware/useAuthMiddleware";

export default function Navbar() {
  const { user, isAdmin } = useAuthMiddleware(); // Menggunakan useAuthMiddleware
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="z-50 fixed flex justify-between items-center backdrop-blur-sm mx-auto px-8 md:px-32 lg:px-48 py-4 md:py-1 w-full">
      <h1 className="font-bold text-lg">
        <Link
          href={"/"}
          className="bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent"
        >
          Election App
        </Link>
      </h1>

      {/* Sidebar */}
      <nav
        className={`fixed top-16 right-0 md:top-0 md:items-center bg-white md:relative md:dark:bg-transparent dark:bg-slate-950  shadow-lg transition-transform transform w-64 md:flex md:bg-transparent md:translate-x-0 md:shadow-none  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
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
                  {isAdmin && <DropdownMenuItem>Dashboard</DropdownMenuItem>}
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={"/auth/login"}
                className="block hover:bg-primary/5 px-3 py-2 hover:rounded-md text-sm transition-all"
              >
                Login
              </Link>
            )}
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>

      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-2xl">
          {isOpen ? <AiOutlineClose /> : <BsList />}
        </button>
      </div>
    </header>
  );
}
