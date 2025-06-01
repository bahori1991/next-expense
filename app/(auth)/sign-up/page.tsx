"use client";

import { GithubSignIn } from "@/components/github-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth/actions";
import { signUpSchema } from "@/lib/schemas";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpPage() {
  const [lastResult, action, isPending] = useActionState(signUp, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <GithubSignIn />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              or continue with email
            </span>
          </div>
        </div>

        {/* email and password sign up */}
        <form {...getFormProps(form)} action={action} className="space-y-4">
          <Input {...getInputProps(fields.email, { type: "email" })} />
          <Input {...getInputProps(fields.password, { type: "password" })} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-up">Already have an account? Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
