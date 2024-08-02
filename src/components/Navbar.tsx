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
    <header className="px-48 py-4 text-white/90">
      <div className="flex justify-between items-center mx-auto">
        <h1 className="font-bold text-lg">
          <a href="/">Election App</a>
        </h1>
        <nav className="flex gap-3">
          <a
            href="/"
            className="hover:bg-white/90 px-3 py-1 hover:rounded-md text-sm text-white/90 hover:text-primary transition-all"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:bg-white/90 px-3 py-1 hover:rounded-md text-sm text-white/90 hover:text-primary transition-all"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:bg-white/90 px-3 py-1 hover:rounded-md text-sm text-white/90 hover:text-primary transition-all"
          >
            Contact
          </a>
        </nav>
        <nav className="flex">
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
              className="hover:bg-white/90 px-3 py-1 hover:rounded-md text-sm text-white/90 hover:text-primary transition-all"
            >
              Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
