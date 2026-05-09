import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper, SectionWrapper } from "@/components/layout/PageWrapper";
import { 
  Box, 
  RefreshCw, 
  BarChart3, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Smartphone 
} from "lucide-react";

export default function FeaturesPage() {
  const detailedFeatures = [
    {
      title: "Inventory Management",
      description: "Comprehensive tracking of every garment. Record sizes, colors, fabric types, and condition notes. Automated low-stock alerts and QR code integration for fast scanning.",
      icon: Box,
    },
    {
      title: "Smart Rental Tracking",
      description: "Automated booking calendar. Manage pickup dates, return deadlines, and security deposits. Integrated SMS and email reminders for customers.",
      icon: RefreshCw,
    },
    {
      title: "Sales & Revenue Analytics",
      description: "Visual data dashboards for revenue tracking, profit margins, and inventory ROI. Exportable reports for accounting and tax purposes.",
      icon: BarChart3,
    },
    {
      title: "Customer Management",
      description: "Build lasting relationships with customer profiles, purchase history, and loyalty programs. Segment your audience for targeted marketing.",
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageWrapper>
          <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Built for High-Growth Fashion</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the tools that give you an edge in the competitive fashion rental and retail market.
              </p>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold">Unmatched Control Over Your Inventory</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Stop losing track of your assets. Our system provides a 360-degree view of your inventory, whether it's on a shelf, in transit, or with a customer.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Real-time stock synchronization",
                      "Automated condition tracking",
                      "Multi-location support",
                      "Batch processing for wholesale",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center space-x-3 font-medium text-slate-800 dark:text-slate-200">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-premium aspect-square rounded-[3rem] flex items-center justify-center p-12 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <Box className="w-48 h-48 text-primary/20 absolute -top-12 -left-12 rotate-12" />
                  <Zap className="w-32 h-32 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </section>

          <SectionWrapper className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-heading font-bold text-center mb-16">The Benefits of Ai-Voria</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {detailedFeatures.map((f, i) => (
                  <div key={i} className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors">
                    <f.icon className="h-10 w-10 text-primary mb-6" />
                    <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}
