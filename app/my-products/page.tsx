import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import ProductCard from "@/components/ProductCard";

const getData = async (userId: string) => {
  const data = await prisma.product.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      short_description: true,
      description: true,
      price: true,
      images: true,
      category: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return data;
};

const MyProductsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);

  if (!user) {
    throw new Error("You are not authorized to view this page!");
  }

  // get the products
  const data = await getData(user.id);

  return (
    <section className="mx-auto mt-10 max-w-7xl px-4">
      <h1 className="text-2xl font-extrabold uppercase tracking-tighter text-neutral-700">
        My Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.category}
            images={product.images}
            name={product.name}
            price={product.price}
            short_description={product.short_description}
          />
        ))}
      </div>
    </section>
  );
};

export default MyProductsPage;
