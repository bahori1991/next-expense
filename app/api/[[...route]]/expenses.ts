import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string({ invalid_type_error: "Title must be a string" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters long" }),
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number" })
    .int({ message: "Amount must be a number" })
    .positive({ message: "Amount must be positive" }),
});

type Expense = z.infer<typeof expenseSchema>;

export const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 100 },
  { id: 2, title: "Rent", amount: 1000 },
  { id: 3, title: "Utilities", amount: 100 },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .get("/total-spent", (c) => {
    const totalSpent = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );
    return c.json({ total: totalSpent });
  })
  .post("/", zValidator("json", createPostSchema), (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense });
    c.status(201);
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const deleteIndex = fakeExpenses.findIndex((expense) => expense.id === id);
    if (deleteIndex === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(deleteIndex, 1)[0];
    return c.json({ expense: deletedExpense });
  });
