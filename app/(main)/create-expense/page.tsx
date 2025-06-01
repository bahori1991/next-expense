"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { createPostSchema } from "../../api/[[...route]]/expenses";
import { createNewExpense } from "./action";

export default function CreateExpensePage() {
  const [lastResult, action, isPending] = useActionState(
    createNewExpense,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createPostSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form {...getFormProps(form)} action={action} className="max-w-md mt-4">
        <div className="grid gap-2">
          <Label htmlFor={fields.title.id}>Title</Label>
          <Input {...getInputProps(fields.title, { type: "text" })} />
          <div className="text-red-500">{fields.title.errors}</div>
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor={fields.amount.id}>Amount</Label>
          <Input {...getInputProps(fields.amount, { type: "number" })} />
          <div className="text-red-500">{fields.amount.errors}</div>
        </div>
        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending ? "Creating..." : "Create Expense"}
        </Button>
        {form.errors && (
          <div>
            <h2>Error:</h2>
            <ul className="text-red-500">
              {form.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
