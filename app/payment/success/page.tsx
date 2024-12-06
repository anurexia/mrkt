import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const CancelPage = () => {
  return (
    <section className="flex min-h-[80vh] w-full items-center justify-center">
      <Card className="w-3/4 p-4 md:w-1/3 lg:w-1/4">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-green-100 p-2">
            <Check className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-lg font-semibold">Payment Successful</h1>
          <p className="text-md text-center font-medium text-neutral-600">
            Congratulations on your purchase, check your email for further
            instructions.
          </p>
          <Button className="mt-4 w-full" asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
};
export default CancelPage;
