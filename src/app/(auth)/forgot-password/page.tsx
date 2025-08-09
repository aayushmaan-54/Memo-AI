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
import { requestSchema, resetSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";



export default function ForgotPassword() {
  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");

  const requestForm = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { code: "", newPassword: "" },
  });


  async function onRequestSubmit(values: { email: string }) {
    // TODO: Implement sending reset code later
    console.log("Request reset for:", values.email);
    setEmail(values.email);
    setStep("reset");
  }


  async function onResetSubmit(values: { code: string; newPassword: string }) {
    // TODO: Implement password reset later
    console.log("Reset password with:", values);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-5">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          {step === "request" ? (
            <Form {...requestForm}>
              <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-card-foreground">Forgot Password</h1>
                  <p className="text-muted-foreground">Enter your email to receive a reset code.</p>
                </div>
                <FormField
                  control={requestForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <input name="flow" type="hidden" value="reset" />
                <Button type="submit" className="w-full">Send Reset Code</Button>
              </form>
            </Form>
          ) : (
            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-card-foreground">Reset Password</h1>
                  <p className="text-muted-foreground">Enter the code and your new password.</p>
                </div>
                <FormField
                  control={resetForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reset Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="New password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <input name="email" type="hidden" value={email} />
                <input name="flow" type="hidden" value="reset-verification" />
                <Button type="submit" className="w-full">Reset Password</Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full p-0"
                  onClick={() => setStep("request")}
                >
                  Back to Request
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
