"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiArrowRightLine,
  RiShieldUserLine,
} from "@remixicon/react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleAdminLogin = () => {
    router.push("/admin");
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="font-display text-3xl font-bold text-primary">
            Vizit Africa
          </span>
        </Link>
        <p className="text-muted-foreground mt-2">
          Welcome back! Sign in to continue.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-11 h-12 bg-white"
                defaultValue="sarah@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-11 h-12 bg-white"
                defaultValue="password123"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 gap-2 text-base">
            Sign In
            <RiArrowRightLine className="size-5" />
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleAdminLogin}
          className="w-full h-12 gap-2 text-base"
        >
          <RiShieldUserLine className="size-5" />
          Admin Portal
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="#" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
