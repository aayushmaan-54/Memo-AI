import Icons from "@/assets/icons";
import Link from "next/link";
import ModeToggle from "./mode-toggle";



export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-5">
          <Link href={'/'} className="flex items-center gap-1.5">
            <Icons.AiDocument className="fill-foreground size-8" />
            <h1 className="text-2xl font-bold">Memo AI</h1>
          </Link>

          <div>
            <ModeToggle />
            {/* TODO: Login / Profile */}
          </div>
        </div>
      </header>
    </>
  );
}
