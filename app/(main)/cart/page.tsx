
import CartContent from "@/components/CartContent";
import CartSkeleton from "@/components/CartSkeleton";
import { Suspense } from "react";

export default function CartPage() {
    return (
        <Suspense fallback={<CartSkeleton />}>
            <CartContent />
        </Suspense>
    );
}

