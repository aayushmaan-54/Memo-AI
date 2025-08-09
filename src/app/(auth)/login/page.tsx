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



export default function LoginPage() {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: SigninFormValues) {
    // TODO: Implement your sign-in logic here
    console.log("Sign In submitted with:", values);
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Button asChild variant={'link'} className="p-0 h-auto font-normal">
                        <Link href="/forgot-password" >
                          Forgot Password?
                        </Link>
                      </Button>
                    </div>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
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
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <GoogleButton />
          </Form>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
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
