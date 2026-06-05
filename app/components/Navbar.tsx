


"use client"
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "../store/cart";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function NavbarContent() {
    const { cart } = useCartStore();
    const session = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "");

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", value);
        params.set("page", "1");
        router.push(`/?${params.toString()}`);
    };

    return (
        <header className="w-full border-b bg-background sticky top-0 z-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-2xl text-primary tracking-tight">AE Store</span>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
                    <div className="flex w-full items-center space-x-2">
                        <div className="relative w-full">
                            <Input type="search" placeholder="Search product or brand..." className="w-full rounded" onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Mobile Search */}
                    <Button variant="ghost" size="icon" className="md:hidden hover:cursor-pointer">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative hover:cursor-pointer">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cart.length}</span>
                        </Button>
                    </Link>

                    <Link href="/wishlist">
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex hover:cursor-pointer">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </Link>

                    <span className="h-6 w-px bg-border hidden sm:block"></span>

                    <div className="flex items-center gap-2">
                        {
                            session.status !== "authenticated" && (
                                <>
                                    <Link href="/auth/login" className="text-sm font-medium hover:text-primary hidden sm:block">Login</Link>
                                    <Link href="/auth/register">
                                        <Button size="sm" variant="outline" className="hidden sm:inline-flex hover:cursor-pointer">Sign Up</Button>
                                    </Link>
                                </>
                            )
                        }

                        {/* Mobile Menu */}
                        <div className="sm:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:cursor-pointer">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                    <SheetHeader>
                                        <SheetTitle>Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-4 mt-6 px-4">
                                        {
                                            session.status !== "authenticated" && (
                                                <>
                                                    <div className="flex flex-col gap-2">
                                                        <Link href="/auth/login">
                                                            <Button className="w-full ahmed">Login</Button>
                                                        </Link>
                                                        <Link href="/auth/register">
                                                            <Button variant="outline" className="w-full">Sign Up</Button>
                                                        </Link>
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className="h-px bg-border my-2" />
                                        <Link href="/wishlist" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                                            <Heart className="h-5 w-5" /> Wishlist
                                        </Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                        {
                            session?.status === "authenticated" && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/auth/login' })}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }


                    </div>
                </div>
            </div>
        </header>
    );
}

export function Navbar() {
    return (
        <Suspense fallback={null}>
            <NavbarContent />
        </Suspense>
    );
}