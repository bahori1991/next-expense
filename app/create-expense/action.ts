"use server";

import { api } from "@/lib/api";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { createPostSchema } from "../api/[[...route]]/expenses";

export async function createNewExpense(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: createPostSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const res = await api.expenses.$post({
    json: submission.value,
  });

  if (!res.ok) {
    return submission.reply({
      formErrors: ["An error has occurred while creating new expense"],
    });
  }

  redirect("/expenses");
}
