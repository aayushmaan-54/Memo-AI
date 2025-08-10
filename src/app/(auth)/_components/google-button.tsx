import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";



export default function GoogleButton({ disabled }: { disabled?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthActions();

  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={disabled || isLoading} >
        {isLoading && <Loader className="animate-spin mr-2" />}
        Sign in with Google
      </Button>
    </>
  );
}
