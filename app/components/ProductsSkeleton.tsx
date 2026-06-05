import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="h-[450px] overflow-hidden relative border-none shadow-sm mb-1">
      <CardContent className="p-0 relative bg-muted aspect-square">
        <Skeleton className="w-full h-[280px] rounded-none" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 p-3 pt-0 mt-3 w-full">
        <Skeleton className="h-4 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <div className="flex items-center gap-2 mt-1 w-full">
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="w-full h-9 mt-4 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="w-full md:w-64 space-y-6 shrink-0">
      <div>
        <Skeleton className="h-5 w-24 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function ProductsPageSkeleton() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <SidebarSkeleton />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-36" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
