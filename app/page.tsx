import ProductRow from "@/components/ProductRow";

export default function Home() {
  return (
    <section className="max-w-8xl mx-auto mt-12 px-4 md:px-8">
      <div className="mx-auto max-w-4xl space-y-4 text-center">
        <h1 className="text-3xl font-bold uppercase text-neutral-700 lg:text-5xl">
          Find the best Tailwind
        </h1>
        <h1 className="text-6xl font-extrabold uppercase tracking-wide text-primary lg:text-8xl">
          Templates & Icons
        </h1>
        <p className="mx-auto w-3/4 text-sm font-medium tracking-wide text-muted-foreground lg:text-lg">
          Explore a curated selection of the best Tailwind templates and icons
          for your next project. Whether you’re building a website or enhancing
          a design, find resources tailored to your needs.
        </p>
      </div>

      {/* <NewestProducts /> */}
      <ProductRow category="newest" />
      <ProductRow category="icons" />
      <ProductRow category="templates" />
      <ProductRow category="uikits" />
    </section>
  );
}
