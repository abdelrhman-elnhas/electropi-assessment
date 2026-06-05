import { Suspense } from "react";
import ProductsPageSkeleton from "@/components/ProductsSkeleton";
import ProductsContent from "../components/ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
