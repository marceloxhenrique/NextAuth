"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface IUser {
  email: string;
  password: string;
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [data, setData] = useState<IUser>({
    email: "",
    password: "",
  });

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.error) {
      toast.error("Unable to log in");
    } else {
      router.push("/dashboard");
    }
    setData({ email: "", password: "" });
    setIsLoading(false);
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log in
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            variant="outline"
            type="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </Button>
        </div>
      </form>
    </div>
  );
}
