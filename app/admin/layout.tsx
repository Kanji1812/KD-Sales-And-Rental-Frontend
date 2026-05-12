"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  Search, 
  Bell, 
  ChevronLeft, 
  LogOut,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { adminNavLinks } from "@/constants/nav";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Calendar,
  Users,
  BarChart3,
  Settings,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r bg-white dark:bg-slate-900 transition-all duration-300",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/admin" className="flex items-center space-x-2 overflow-hidden">
            <div className="min-w-[32px] h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shrink-0">
              KD
            </div>
            {!isSidebarCollapsed && (
              <span className="font-heading font-bold text-xl tracking-tighter whitespace-nowrap">
                KD ERP
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {adminNavLinks.map((link) => {
            const Icon = iconMap[link.icon];
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                {!isSidebarCollapsed && <span className="font-medium">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
           <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
           >
            <LogOut className="mr-2 h-5 w-5" />
            {!isSidebarCollapsed && <span>Logout</span>}
           </Button>
           <Button 
            variant="ghost" 
            size="icon" 
            className="w-full"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
           >
            <ChevronLeft className={cn("h-5 w-5 transition-transform", isSidebarCollapsed && "rotate-180")} />
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
             {/* Mobile Sidebar Trigger */}
            <Sheet>
              <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="h-16 flex items-center px-6 border-b">
                  <span className="font-heading font-bold text-xl">KD ERP</span>
                </div>
                <nav className="py-6 px-3 space-y-1">
                  {adminNavLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all",
                          isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-transparent focus-within:border-primary/50 transition-all w-64">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input 
                placeholder="Search everything..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-slate-900" />
            </Button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
            <div className="flex items-center space-x-3 pl-2">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold leading-none">KD Admin</p>
                <p className="text-xs text-muted-foreground mt-1">Shop Owner</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
