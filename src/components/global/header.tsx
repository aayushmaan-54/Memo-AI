"use client";
import Icons from "@/assets/icons";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";



export default function Header() {
  const { signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed!");
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-5">
          <Link href={'/'} className="flex items-center gap-1.5">
            <Icons.AiDocument className="fill-foreground size-8" />
            <h1 className="text-2xl font-bold">Memo AI</h1>
          </Link>

          <div className="flex items-center justify-center gap-1">
            <ModeToggle />

            {isAuthenticated && (
              <Button variant={"ghost"} size={"icon"} onClick={handleLogout}>
                <LogOut />
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
