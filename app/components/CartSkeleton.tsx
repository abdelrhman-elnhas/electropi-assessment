import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function CartSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-56 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 border rounded-xl bg-white dark:bg-slate-900"
            >
              <Skeleton className="h-24 w-24 rounded-md shrink-0" />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-5 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-20 mt-2" />
                </div>

                <div className="flex justify-between items-end mt-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl h-fit space-y-6">
          <Skeleton className="h-6 w-36" />
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-16" />
          </div>

          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
