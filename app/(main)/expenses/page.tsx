import { Suspense } from "react";
import { ExpensesTableContent, ExpensesTableSkeleton } from "./expenses-table";

export default async function ExpensesPage() {
  return (
    <div className="p-2">
      <Suspense fallback={<ExpensesTableSkeleton />}>
        <ExpensesTableContent />
      </Suspense>
    </div>
  );
}
