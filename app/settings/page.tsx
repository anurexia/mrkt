import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Card } from "@/components/ui/card";
import SettingsForm from "@/components/SettingsForm";

import { unstable_noStore as noStore } from "next/cache";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      // - only select these fields
      first_name: true,
      last_name: true,
      email: true,
    },
  });

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

const SettingsPage = async () => {
  noStore();

  // - settings page is only accessible for authenticated users
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You are not authorized to view this page!");
  }

  const data = await getData(user.id);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <SettingsForm
          email={data?.email as string}
          firstName={data?.first_name as string}
          lastName={data?.last_name as string}
        />
      </Card>
    </section>
  );
};

export default SettingsPage;
