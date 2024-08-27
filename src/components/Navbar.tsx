"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth"; // Pastikan path ini sesuai dengan struktur proyek Anda
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { ModeToggle } from "./ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  const user = useAuth(); // Menggunakan custom hook useAuth untuk mendapatkan status pengguna
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <header className="fixed flex justify-between items-center backdrop-blur-sm mx-auto px-48 py-4 w-full glas">
      <h1 className="font-bold text-lg">
        <a href="/">Election App</a>
      </h1>
      <nav className="flex gap-3">
        <a
          href="/about"
          className="hover:bg-primary/5 px-3 py-1 hover:rounded-md text-sm transition-all"
        >
          About
        </a>
        <a
          href="/vote"
          className="hover:bg-primary/5 px-3 py-1 hover:rounded-md text-sm transition-all"
        >
          Vote
        </a>
      </nav>
      <nav className="flex gap-3">
        {user ? (
          <>
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
          </>
        ) : (
          <a
            href="/auth/login"
            className="px-3 py-1 hover:rounded-md text-sm transition-all"
          >
            Login
          </a>
        )}
        <ModeToggle />
      </nav>
    </header>
  );
}
