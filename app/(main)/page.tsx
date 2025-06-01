import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth/auth";
import { Suspense } from "react";

async function TotalSpentContent() {
  const session = await auth();

  if (!session?.user) {
    return <div>Please sign in</div>;
  }

  const res = await api.expenses["total-spent"].$get();

  if (!res.ok) {
    return <div className="text-red-500">failed to fetch total spent</div>;
  }

  const { total } = await res.json();
  return <>{total}</>;
}

export default function Home() {
  return (
    <Card className="w-[350px] m-auto mt-4">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you&apos;ve spent</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<>...</>}>
          <TotalSpentContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}
