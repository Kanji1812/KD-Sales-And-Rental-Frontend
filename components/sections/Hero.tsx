"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, PlayCircle, Sparkles, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20"
          >
            <Sparkles className="w-3 h-3" />
            <span>Next-Generation Fashion Management</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1]"
          >
            Manage Your <span className="text-gradient">Cloth Rental</span> & Retail Business with Ease
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            The premium SaaS platform for modern fashion enterprises. Inventory, bookings, sales, and subscriptions - all in one powerful dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
          >
            <Link 
              href="/register"
              className={cn(buttonVariants({ size: "lg", className: "h-12 px-8 rounded-full text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95" }))}
            >
              Start Your Free Trial
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="/features"
              className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-8 rounded-full text-base bg-white/50 backdrop-blur-sm border-slate-200" }))}
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              View Demo
            </Link>
          </motion.div>

          {/* Hero Image/UI Mockup Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full mt-16 relative"
          >
            <div className="glass-premium rounded-2xl overflow-hidden shadow-2xl border-white/40 aspect-[16/9] md:aspect-[21/9] flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-indigo-500/5 group-hover:opacity-100 transition-opacity" />
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                   <LayoutDashboard className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Interactive Dashboard</h3>
                <p className="text-muted-foreground max-w-md mx-auto">Experience the most intuitive management interface designed for fashion professionals.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
