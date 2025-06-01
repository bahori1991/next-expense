import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";

function ExpensesTableHeader() {
  return (
    <>
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}

export async function ExpensesTableContent() {
  const res = await api.expenses.$get();

  if (!res.ok) {
    return (
      <div className="text-red-500">
        An error has occurred while fetching expenses
      </div>
    );
  }

  const { expenses } = await res.json();

  return (
    <Table className="max-w-lg mx-auto">
      <ExpensesTableHeader />
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{expense.id}</TableCell>
            <TableCell>{expense.title}</TableCell>
            <TableCell>{expense.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function ExpensesTableSkeleton() {
  return (
    <Table className="max-w-lg mx-auto">
      <ExpensesTableHeader />
      <TableBody>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
