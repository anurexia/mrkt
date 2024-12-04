import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoading = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <CardHeader className="h-[500px]">
          <Skeleton className="h-1/2 w-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
export default SettingsLoading;
