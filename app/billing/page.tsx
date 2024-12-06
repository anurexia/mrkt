import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { CreateStripeAccountLink } from "../actions";
import SubmitButton from "@/components/SubmitButton";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  return data;
};

const BillingPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized Access");

  const data = await getData(user.id);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Information regarding your payments</CardDescription>
        </CardHeader>

        <CardContent>
          {!data?.stripeConnectedLinked && (
            <form action={CreateStripeAccountLink}>
              <SubmitButton title="Connect your account to Stripe" />
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
export default BillingPage;
