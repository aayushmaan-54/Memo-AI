import Icons from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";



export default function Hero() {
  return (
    <>
      <section className="sm:max-w-2xl w-[90vw] px-5 mx-auto flex flex-col items-center justify-center gap-5 mt-10">
        <Icons.AiDocument className="fill-foreground" />
        <h1 className="sm:text-4xl text-3xl font-bold text-center text-balance">Take Notes. Ask Anything. Get Answers.</h1>
        <p className="text-center text-balance text-foreground/70 sm:text-base text-sm">
          Your notes just got smarter. Save anything — from WiFi passwords to project plans — then ask the AI, and it&apos;ll bring back exactly what you need, with a link to the original note.
        </p>

        <Button asChild size="lg" className="group inline-flex items-center gap-1">
          <Link href="/notes">
            Get Started
            <ArrowRight className="transition-transform duration-150 group-hover:translate-x-0.5 size-4 mx-1" />
          </Link>
        </Button>
      </section>
    </>
  );
}
