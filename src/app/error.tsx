"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";



export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);


  return (
    <div className="min-h-screen flex mt-12 justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="size-16 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold ">Something went wrong!</h1>
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again later, refresh the page, or try logging out and back in.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={reset} className="w-full">
            <RefreshCw className="size-4 mr-2" />
            Try again
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full"
          >
            <Home className="size-4 mr-2" />
            Go home
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 p-4 border border-border bg-muted rounded-lg text-left">
            <summary className="cursor-pointer font-medium text-sm text-muted-foreground">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
