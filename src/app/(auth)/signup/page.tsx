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
import { SignupFormValues, signupSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "@/components/global/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleButton from "../_components/google-button";



export default function SignupPage() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  async function onSubmit(values: SignupFormValues) {
    // TODO: Implement your sign-up logic here
    console.log("Sign Up submitted with:", values);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-5">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-card-foreground">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Enter your details to create a new account.
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
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
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
              <input name="flow" type="hidden" value="signUp" />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            <GoogleButton />
          </Form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button asChild variant={'link'} className="p-0">
              <Link href="/login">
                Login
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </>
  );
}
