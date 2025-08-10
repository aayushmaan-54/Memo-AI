"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninFormValues, signinSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "@/components/global/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleButton from "../_components/google-button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function LoginPage() {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();


  async function onSubmit(values: SigninFormValues) {
    setIsLoading(true);
    try {
      await signIn("password", {
        email: values.email,
        password: values.password,
        flow: "signIn"
      });

      toast.success("Logged in successfully!");
      router.push("/notes");
    } catch (error) {
      console.error("Login Error: ", error);
      if (
        error instanceof Error &&
        (error.message.includes("InvalidAccountId") ||
          error.message.includes("InvalidSecret"))
      ) {
        form.setError("root", {
          type: "manual",
          message: "Invalid email or password. Please try again.",
        })
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-5">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-card-foreground">
              Login
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        type="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <div className="text-sm text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}
              <input name="flow" type="hidden" value="signIn" />
              <Button type="submit" className="w-full" disabled={isLoading} >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            <GoogleButton disabled={isLoading} />
          </Form>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button asChild variant={'link'} className="p-0">
              <Link href="/signup">
                Sign Up
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </>
  );
}
