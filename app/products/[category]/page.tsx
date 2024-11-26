import prisma from "@/app/lib/db";
import ProductCard from "@/components/ProductCard";
import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";

const getData = async (category: string) => {
  let input;
  switch (category) {
    case "templates": {
      input = "templates";
      break;
    }
    case "uiKits": {
      input = "uiKits";
      break;
    }
    case "icons": {
      input = "icons";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },

    select: {
      id: true,
      images: true,
      short_description: true,
      name: true,
      price: true,
    },
  });

  return data;
};

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const products = await getData(params.category);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
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
export default CategoryPage;
