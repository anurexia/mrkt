import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex h-screen w-full items-center justify-center bg-neutral-50">
      <LoaderCircle className="h-24 w-24 animate-spin ease-in-out" />
    </div>
  );
};
export default Loader;
