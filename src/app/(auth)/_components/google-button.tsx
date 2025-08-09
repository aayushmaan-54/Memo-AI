import { Button } from "@/components/ui/button";



export default function GoogleButton() {
  async function handleGoogleSignIn() {
    // TODO: Add signIn("google") later
    console.log("Sign in with Google");
  }

  return (
    <>
      <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
        Sign in with Google
      </Button>
    </>
  );
}
