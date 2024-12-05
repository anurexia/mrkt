// - useFormState was renamed to useActionState
import SellForm from "@/components/form/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const SellRoute = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error("You are not authorized to view this page!");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <SellForm />
    </section>
  );
};
export default SellRoute;
