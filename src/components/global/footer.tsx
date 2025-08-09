import { Earth, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "../ui/button";



export default function Footer() {
  const footerSocialLinks = [
    {
      name: "Portfolio",
      href: "https://www.aayushmaan.me",
      icon: Earth,
    },
    {
      name: "GitHub",
      href: "https://www.aayushmaan.me/github",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.aayushmaan.me/linkedin",
      icon: Linkedin,
    },
    {
      name: "Twitter/X",
      href: "https://www.aayushmaan.me/twitter",
      icon: Twitter,
    },
    {
      name: "Gmail",
      href: "mailto:aayushmaansoni.dev@gmail.com",
      icon: Mail,
    }
  ];


  return (
    <>
      <footer className="w-full mt-auto p-6 text-center text-sm text-muted-foreground border-t border-border">
        <div className="flex justify-center items-center gap-4 mb-3">
          {footerSocialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-md hover:bg-muted/50"
              aria-label={link.name}
            >
              <link.icon className="size-5" />
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Memo AI. Built with ☕ by{' '}
          <Button variant="link" asChild className="p-0 h-auto font-normal">
            <a
              href="https://www.aayushmaan.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aayushmaan Soni
            </a>
          </Button>
          .
        </p>
      </footer>
    </>
  );
}
