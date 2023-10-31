"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

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
    console.log(data);
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });
    console.log(res);
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
        </div>
      </form>
    </div>
  );
}
