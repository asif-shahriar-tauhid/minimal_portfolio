"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginAdmin } from "@/lib/api";
import { setAdminToken } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginAdmin({ email, password });
      if (res.token) {
        setAdminToken(res.token);
        toast.success("Welcome back, Tauhid!");
        router.push("/dashboard");
      } else {
        toast.error(res.error || "Invalid credentials");
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="pb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            <span>Dashboard Authentication</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Enter your administrative credentials to manage portfolio sections.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <CardContent className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-mono">
                Password
              </Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 text-xs"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2 border-none bg-transparent">
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-xs font-medium py-2.5 shadow-sm"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
