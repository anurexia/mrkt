import prisma from "@/app/lib/db";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard, { ProductCardLoading } from "./ProductCard";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

interface ProductRowCategoryProps {
  category: "newest" | "templates" | "uikits" | "icons";
}

const getData = async ({ category }: ProductRowCategoryProps) => {
  switch (category) {
    case "icons": {
      const data = await prisma.product.findMany({
        where: {
          category: "icons",
        },
        select: {
          name: true,
          price: true,
          short_description: true,
          images: true,
          id: true,
        },
        take: 3,
      });

      return {
        data,
        title: "Icons",
        link: "/products/icons",
      };
    }

    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          price: true,
          short_description: true,
          images: true,
          id: true,
        },
        take: 3,
        orderBy: {
          created_at: "desc",
        },
      });

      return {
        data,
        title: "Newest Products",
        link: "/products/all",
      };
    }

    case "templates": {
      const data = await prisma.product.findMany({
        where: {
          category: "templates",
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          short_description: true,
        },
        take: 3,
      });

      return {
        data,
        title: "Templates",
        link: "/products/templates",
      };
    }

    case "uikits": {
      const data = await prisma.product.findMany({
        where: {
          category: "uiKits",
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          short_description: true,
        },
        take: 3,
      });

      return {
        data,
        title: "UI Kits",
        link: "/products/uiKits",
      };
    }

    default:
      return notFound();
  }
};

const ProductRow = ({ category }: ProductRowCategoryProps) => {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
};
export default ProductRow;

export const LoadRows = async ({ category }: ProductRowCategoryProps) => {
  const data = await getData({ category });

  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="flex items-center gap-1 text-lg font-semibold uppercase text-primary"
        >
          All Products
          <ArrowRight />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {data.data.map((product) => (
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
    </>
  );
};

export const LoadingState = () => {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-4">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </div>
    </div>
  );
};
