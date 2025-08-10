import { Eye, EyeClosed } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;



const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);


    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0.5 hover:bg-transparent! cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeClosed className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    );
  }
)


PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
