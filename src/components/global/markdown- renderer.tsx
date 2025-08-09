import Link from "next/link";
import ReactMarkdown from "react-markdown";



export default function MarkdownRenderer({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          const isInternalLink =
            href?.startsWith(process.env.NEXT_PUBLIC_BASE_URL!) ||
            href?.startsWith("/");
          if (isInternalLink) {
            return (
              <Link href={href || "#"} className="text-primary hover:underline">
                {children}
              </Link>
            );
          }
          return (
            <a href={href || "#"} className="text-primary hover:underline">
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
