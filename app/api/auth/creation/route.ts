import prisma from "@/app/lib/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something wen't wrong...");
  }

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // - create the accountId first before adding it into the database
    const account = await stripe.accounts.create({
      email: user.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        // - for fees, it will be paid by the application
        fees: {
          payer: "application",
        },

        stripe_dashboard: {
          // - same as we chose in the stripe connect configuration
          type: "express",
        },
      },
    });

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        first_name: user.given_name ?? "",
        last_name: user.family_name ?? "",
        profile_image:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        connectedAccountId: account.id,
      },
    });
  }

  return NextResponse.redirect("http://localhost:3000");
};
