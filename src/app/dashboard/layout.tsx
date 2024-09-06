"use client";
import Link from "next/link";
import { Home, LineChart, Menu, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { ModeToggle } from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] opacity-50"
        )}
      />
      <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] w-full min-h-screen">
        <div className="md:block hidden bg-muted/40 border-r">
          <div className="flex flex-col gap-2 h-full max-h-screen">
            <div className="flex items-center px-4 lg:px-6 border-b h-14 lg:h-[60px]">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent">
                  Election App
                </span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="items-start grid px-2 lg:px-4 font-medium text-sm">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname === "/dashboard"
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }  transition-all hover:text-primary`}
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/candidates"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.startsWith("/dashboard/candidates")
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }  transition-all hover:text-primary`}
                >
                  <Users className="w-4 h-4" />
                  Candidates
                </Link>
                <Link
                  href="/dashboard/users"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname === "/dashboard/users"
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }  transition-all hover:text-primary`}
                >
                  <User className="w-4 h-4" />
                  Users
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex items-center gap-4 bg-muted/40 px-4 lg:px-6 border-b h-14 lg:h-[60px]">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden shrink-0"
                >
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="gap-2 grid font-medium text-lg">
                  <Link
                    href="#"
                    className="flex items-center gap-2 pb-4 font-semibold text-lg"
                  >
                    <span className="sr-only">Election App</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-4 bg-muted mx-[-0.65rem] px-3 py-2 rounded-xl text-foreground hover:text-foreground"
                  >
                    <Home className="w-5 h-5" />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/candidates"
                    className="flex items-center gap-4 mx-[-0.65rem] px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground"
                  >
                    <Users className="w-5 h-5" />
                    Candidates
                  </Link>
                  <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-4 mx-[-0.65rem] px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="w-5 h-5" />
                    Analytics
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex justify-end w-full">
              <ModeToggle />
            </div>
          </header>
          <main className="flex flex-col flex-1 gap-4 lg:gap-6 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
