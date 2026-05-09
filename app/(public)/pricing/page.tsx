import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageWrapper>
          {/* Hero Section */}
          <section className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Plans for Every Business</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you're a small boutique or a global fashion house, we have a plan that scales with you.
              </p>
            </div>
          </section>

          <PricingPreview />

          {/* Comparison Table Section (Simplified for Premium feel) */}
          <section className="py-24">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl font-heading font-bold text-center mb-12">Feature Comparison</h2>
              <div className="glass-premium rounded-3xl overflow-hidden border">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50">
                      <th className="p-6 font-heading font-bold border-b">Feature</th>
                      <th className="p-6 font-heading font-bold border-b text-center">Basic</th>
                      <th className="p-6 font-heading font-bold border-b text-center">Pro</th>
                      <th className="p-6 font-heading font-bold border-b text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Inventory Management", basic: true, pro: true, enterprise: true },
                      { name: "Rental Tracking", basic: true, pro: true, enterprise: true },
                      { name: "Sales Reports", basic: true, pro: true, enterprise: true },
                      { name: "Bulk Actions", basic: false, pro: true, enterprise: true },
                      { name: "API Access", basic: false, pro: false, enterprise: true },
                      { name: "Custom Domain", basic: false, pro: true, enterprise: true },
                      { name: "24/7 Support", basic: false, pro: false, enterprise: true },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                        <td className="p-6 border-b text-sm font-medium">{row.name}</td>
                        <td className="p-6 border-b text-center">
                          {row.basic ? <Check className="h-5 w-5 text-primary mx-auto" /> : <div className="h-0.5 w-3 bg-slate-200 mx-auto" />}
                        </td>
                        <td className="p-6 border-b text-center">
                          {row.pro ? <Check className="h-5 w-5 text-primary mx-auto" /> : <div className="h-0.5 w-3 bg-slate-200 mx-auto" />}
                        </td>
                        <td className="p-6 border-b text-center">
                          {row.enterprise ? <Check className="h-5 w-5 text-primary mx-auto" /> : <div className="h-0.5 w-3 bg-slate-200 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl font-heading font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade your plan at any time from your dashboard." },
                  { q: "Is there a free trial?", a: "We offer a 14-day free trial for all plans. No credit card required." },
                  { q: "Do you offer discounts for non-profits?", a: "Yes, we have special pricing for registered non-profit organizations." },
                ].map((faq, i) => (
                  <div key={i} className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border">
                    <h4 className="font-bold mb-2 flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                      {faq.q}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}
