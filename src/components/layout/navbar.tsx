"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { ModeToggle } from "../ThemMode";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Product } from "@/types/index";
import { saveSearchHistory } from "@/actions/search.action";
type NavUser = { id: string; name?: string | null; email?: string | null; role?: string } | undefined;

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/category/oversized-t-shirts", label: "Oversized T-Shirts" },
  { href: "/category/panjabi", label: "Panjabi" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];



export function Navbar({ user }: { user: NavUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { currentUser, isAuthenticated } = useAppSelector((state) => state.user);
  const isMobile = useIsMobile();
  const [searchDrowerOpen, setSearchDroweOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const router = useRouter();


  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();

      setResults(data.products);
    };

    const timer = setTimeout(fetchProducts, 300);

    return () => clearTimeout(timer);
  }, [query]);


  useEffect(() => {
    if (!user) return;

    const fetchSearchHistory = async () => {
      const res = await fetch("/api/search/search-history");
      const data = await res.json();

      setSearchHistory(data.search.searchHistory === undefined ? [] : data.search.searchHistory);
    };

    fetchSearchHistory();
  }, [user]);
  const handleSearch = async (value: string) => {
    router.push(`/product/search?p=${encodeURIComponent(value)}`);
    setSearchHistory((prev) => [
      value,
      ...prev.filter(item => item !== value),
    ].slice(0, 10));
    setSearchDroweOpen(false);
    await saveSearchHistory(value);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur dark:bg-slate-900 dark:text-white">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href={"/"}>
            <div className="hidden dark:flex ">
              <Image src={"/all-logo/logoWhite.png"} width={isMobile ? 80 : 150} height={isMobile ? 40 : 60} alt="Nexwear" />
            </div>
            <div className="flex dark:hidden ">
              <Image src={"/all-logo/logoBlack.png"} width={isMobile ? 80 : 150} height={isMobile ? 40 : 60} alt="Nexwear" />
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>

          <div className="flex items-center gap-1">
            <ModeToggle />

            {/* Search Button  */}

            <Sheet open={searchDrowerOpen} onOpenChange={setSearchDroweOpen} >
              <SheetTrigger asChild>
                <Button variant="ghost" onClick={() => setSearchDroweOpen(true)} size="icon"><Search className="h-3 w-3" /></Button>
              </SheetTrigger>
              <SheetContent
                side={"top"}
                className="max-h-[50vh] overflow-hidden"
              >
                <SheetHeader>
                  <Input
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(query);
                      }
                    }}
                  />
                  <div className="flex-1 overflow-y-auto">
                    {!query ?

                      searchHistory.map((name, i) => (
                        <div
                          onClick={() => { handleSearch(name); setQuery(name) }}
                          key={i}
                          className="p-2 hover:bg-muted cursor-pointer"
                        >
                          {name}
                        </div>
                      ))
                      :
                      results.map((product) => (
                        <div
                          onClick={() => { handleSearch(product?.name); setQuery(product?.name) }}
                          key={product?._id}
                          className="p-2 hover:bg-muted cursor-pointer"
                        >
                          {product?.name}
                        </div>
                      ))}
                  </div>

                </SheetHeader>
                <SheetFooter>
                  <Button type="submit" onClick={() => handleSearch(query)}><Search />Search</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>


            <CartDrawer trigger={<Button variant="ghost" size="icon" aria-label="Cart" className="dark:hover:bg-slate-800"><ShoppingBag className="h-5 w-5" /></Button>} />
            {user ? (
              <div className="hidden items-center gap-1 md:flex">
                <Button variant="ghost" size="icon" asChild><Link href="/account/profile" className="dark:hover:bg-slate-800" aria-label="Account"><User className="h-5 w-5" /></Link></Button>
                {currentUser?.role === "admin" && <Button variant="outline" size="sm" className="dark:hover:bg-slate-800 dark:bg-gray-900" asChild><Link href="/admin">Admin</Link></Button>}
                <Button variant="ghost" size="sm" className="dark:hover:bg-slate-800" onClick={() => setLogoutOpen(true)}>Logout</Button>
              </div>
            ) : (
              <Button size="sm" className="hidden md:inline-flex" asChild><Link href="/login">Login</Link></Button>
            )}
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></Button>
              </DialogTrigger>
              <DialogContent className="left-auto right-0 top-0 h-full w-80 max-w-[85vw] translate-x-0 translate-y-0 rounded-none">
                <DialogTitle>Menu</DialogTitle>
                <DialogDescription>Navigate Nexwear</DialogDescription>
                <nav className="mt-6 grid gap-2">
                  {navLinks.map((link) => (
                    <DialogClose key={link.href} asChild>
                      <Button variant="ghost" className="justify-start" asChild><Link href={link.href}>{link.label}</Link></Button>
                    </DialogClose>
                  ))}
                  <DialogClose asChild>
                    <Button variant="ghost" className="justify-start" asChild><Link href="/search">Search</Link></Button>
                  </DialogClose>
                </nav>
                <div className="mt-6 grid gap-2 border-t pt-6">
                  {isAuthenticated && currentUser ? (
                    <>
                      <DialogClose asChild>
                        <Button variant="outline" className="justify-start" asChild><Link href="/account/profile">Profile</Link></Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline" className="justify-start" asChild><Link href="/account/orders">My Orders</Link></Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline" className="justify-start" asChild><Link href="/account/wishlist">Wishlist</Link></Button>
                      </DialogClose>
                      {currentUser.role === "admin" && (
                        <DialogClose asChild>
                          <Button variant="outline" className="justify-start" asChild><Link href="/admin">Admin</Link></Button>
                        </DialogClose>
                      )}
                      <Button
                        variant="destructive"
                        className="justify-start"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLogoutOpen(true);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <DialogClose asChild>
                        <Button asChild><Link href="/login">Login</Link></Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline" asChild><Link href="/register">Register</Link></Button>
                      </DialogClose>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogTitle>Logout?</DialogTitle>
          <DialogDescription>Are you sure you want to logout from your Nexwear account?</DialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => signOut({ callbackUrl: "/login" })}>Yes, Logout</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
