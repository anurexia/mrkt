import { ProductCardLoading } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const MyProductsLoadingPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <Skeleton className="h-10 w-36" />
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </div>
    </div>
  );
};
export default MyProductsLoadingPage;
