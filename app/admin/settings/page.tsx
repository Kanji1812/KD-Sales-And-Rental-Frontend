"use client";

import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  Store,
  ShieldCheck,
  ChevronRight,
  Save
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your platform preferences and account security.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl h-12 inline-flex">
          <TabsTrigger value="general" className="rounded-lg px-6 h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
            General
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg px-6 h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
            Account
          </TabsTrigger>
          <TabsTrigger value="billing" className="rounded-lg px-6 h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
            Billing
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg px-6 h-10 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Store className="mr-2 h-5 w-5 text-primary" />
                  Store Configuration
                </CardTitle>
                <CardDescription>Basic information about your business.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Store Name</label>
                  <Input placeholder="Ai-Voria Boutique" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Store Email</label>
                  <Input placeholder="hello@ai-voria.com" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Store Address</label>
                  <textarea 
                    className="w-full min-h-[100px] p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="123 Fashion Ave, NY 10001"
                  />
                </div>
                <Button className="w-full rounded-xl h-11 shadow-lg shadow-primary/20 mt-2">
                   <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Globe className="mr-2 h-5 w-5 text-primary" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Configure currency, timezone, and language.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                 {[
                   { label: "Currency", value: "USD ($)", desc: "Main currency for transactions" },
                   { label: "Timezone", value: "UTC-5 (EST)", desc: "System time for reports" },
                   { label: "Date Format", value: "MM/DD/YYYY", desc: "Display format for dates" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all cursor-pointer">
                      <div>
                        <p className="font-bold text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <div className="flex items-center text-primary font-bold text-sm">
                        {item.value}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </div>
                   </div>
                 ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile">
           <Card className="border-none shadow-md max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal details and avatar.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4 text-center">
                 <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-white dark:border-slate-900 shadow-xl mx-auto flex items-center justify-center text-primary font-bold text-3xl mb-6">
                    AD
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">First Name</label>
                      <Input defaultValue="Admin" className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Last Name</label>
                      <Input defaultValue="User" className="rounded-xl h-11" />
                    </div>
                 </div>
                 <Button variant="outline" className="rounded-xl h-11 px-8">Update Profile</Button>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="billing">
           <Card className="border-none shadow-md max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Subscription Plan
                </CardTitle>
                <CardDescription>You are currently on the Enterprise Plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                 <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Current Plan</p>
                      <h3 className="text-2xl font-bold">Enterprise</h3>
                      <p className="text-sm text-muted-foreground mt-1">Next billing date: June 07, 2026</p>
                    </div>
                    <Button className="rounded-xl h-11 shadow-lg shadow-primary/20">Manage Billing</Button>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
