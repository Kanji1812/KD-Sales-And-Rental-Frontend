"use client";

import { SectionWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <SectionWrapper className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-premium p-12 md:p-20 rounded-[3rem] text-center space-y-8 relative overflow-hidden group">
          {/* Animated background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-primary/20 transition-colors" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -ml-32 -mb-32 group-hover:bg-indigo-500/20 transition-colors" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/50 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            <Sparkles className="w-3 h-3" />
            <span>Join 1000+ fashion brands</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold max-w-3xl mx-auto leading-tight">
            Ready to <span className="text-gradient">Elevate</span> Your Fashion Business?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of cloth management today. Start your 14-day free trial. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="h-14 px-10 rounded-full text-lg">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
