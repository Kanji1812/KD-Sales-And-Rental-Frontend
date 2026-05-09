"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { publicNavLinks } from "@/constants/nav";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="font-heading font-bold text-2xl tracking-tighter">
            Ai-Voria
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors">
            Log in
          </Link>
          <Link 
            href="/register"
            className={cn(buttonVariants({ className: "rounded-full px-6 shadow-lg shadow-primary/20" }))}
          >
            Get Started
          </Link>
          <Link href="/admin" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Portal
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center space-x-4">
          <Sheet>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-10 w-10")}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full bg-background">
                <div className="p-6 border-b flex items-center justify-between">
                  <span className="font-heading font-bold text-xl">Menu</span>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
                  {publicNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t flex flex-col space-y-4">
                    <Link 
                      href="/login" 
                      className={cn(buttonVariants({ variant: "outline", className: "w-full" }))}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/register" 
                      className={cn(buttonVariants({ className: "w-full" }))}
                    >
                      Get Started
                    </Link>
                    <Link 
                      href="/admin" 
                      className={cn(buttonVariants({ variant: "secondary", className: "w-full" }))}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Portal
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
