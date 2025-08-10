import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from 'react-hot-toast';
import { cn } from "@/lib/utils";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";
import ConvexClientProvider from "@/provider/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://memo-notes-ai.vercel.app"),
  title: {
    default: "Memo AI | Smart Notes with AI Assistant",
    template: "%s | Memo AI",
  },
  description:
    "Memo AI is your AI-powered second brain. Take notes, organize your thoughts, and instantly recall anything just by asking. Built for productivity and memory recall.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Memo AI | Smart Notes with AI Assistant",
    description:
      "Memo AI helps you remember everything. Store notes and ask the AI to find anything — from passwords to plans — in seconds.",
    url: "https://memo-notes-ai.vercel.app",
    siteName: "Memo AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Memo AI - Smart Notes Assistant",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memo AI | Smart Notes with AI Assistant",
    description:
      "Memo AI is your smart, searchable, conversational notebook. Ask it anything and get the right note with a link.",
    images: ["/og-image.png"],
    creator: "@aayushmaan5oni",
    site: "@aayushmaan5oni",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
    yandex: "",
  },
  alternates: {
    canonical: "https://memo-notes-ai.vercel.app",
  },
  authors: [{ name: "Aayushmaan Soni", url: "https://www.aayushmaan.me" }],
  keywords: [
    "AI Notes App",
    "Smart Notes",
    "Second Brain",
    "AI Chat Notes",
    "Memo AI",
    "Note Taking",
    "AI Assistant",
    "Productivity Tool",
    "Personal Knowledge Management",
    "Ask your notes",
  ],
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(geistMono.variable, geistMono.className, 'antialiased font-mono bg-background text-foreground flex flex-col min-h-screen selection:bg-accent selection:text-foreground')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>
              <Toaster position="top-center" reverseOrder={false} />
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
