import SelectCategory from "@/components/SelectCategory";
import MenuBar from "@/components/tiptap/MenuBar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SellRoute = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <form>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Describe your product in detail, so it can be sold
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-10">
            <ContentWrapper>
              <Label>Name</Label>
              <Input type="text" placeholder="Enter the name of your product" />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Category</Label>
              <SelectCategory />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Price</Label>
              <Input min={0} type="number" placeholder="Enter your price" />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Description</Label>
              <Textarea placeholder="Describe your product.." />
            </ContentWrapper>

            <MenuBar />
          </CardContent>
        </form>
      </Card>
    </section>
  );
};
export default SellRoute;

const ContentWrapper = ({ children }) => {
  return <div className="flex flex-col gap-y-2">{children}</div>;
};
