import prisma from "@/app/lib/db";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const getData = async () => {
  const data = await prisma.product.findMany({
    select: {
      // - will only select these fields
      id: true,
      name: true,
      short_description: true,
      images: true,
      price: true,
      category: true,
    },
    // - only take 4 results
    take: 4,
    orderBy: {
      created_at: "desc",
    },
  });

  return data;
};

const NewestProducts = async () => {
  const data = await getData();

  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-xl font-bold uppercase">Newest Products</h2>
        <Link
          href=""
          className="flex items-center gap-1 text-lg font-semibold uppercase text-primary"
        >
          All Products
          <ArrowRight />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((product) => (
          <ProductCard
            id={product.id}
            images={product.images}
            name={product.name}
            short_description={product.short_description}
            price={product.price}
            key={product.id}
          />
        ))}
      </div>
    </section>
  );
};
export default NewestProducts;
