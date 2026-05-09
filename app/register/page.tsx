"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowLeft, User, Mail, Lock, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 py-12">
      <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to website
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="glass-premium p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-white/40">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 mb-4">
              <Sparkles className="w-3 h-3" />
              <span>14-Day Free Trial</span>
            </div>
            <h1 className="text-3xl font-heading font-bold">Create Your Account</h1>
            <p className="text-muted-foreground">Start scaling your fashion business today.</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="John Doe" className="pl-10 h-12 rounded-xl bg-white/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="john@company.com" className="pl-10 h-12 rounded-xl bg-white/50" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold ml-1">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Ai-Voria Boutique" className="pl-10 h-12 rounded-xl bg-white/50" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold ml-1">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-white/50" />
              </div>
            </div>

            <div className="md:col-span-2 pt-2">
              <Link 
                href="/admin" 
                className={cn(buttonVariants({ className: "w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/20" }))}
              >
                Create Account
              </Link>
            </div>
          </form>

          <p className="mt-6 text-[10px] text-center text-muted-foreground px-8 leading-relaxed uppercase tracking-tighter">
            By clicking "Create Account", you agree to our{" "}
            <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>

          <div className="mt-8 pt-8 border-t text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
