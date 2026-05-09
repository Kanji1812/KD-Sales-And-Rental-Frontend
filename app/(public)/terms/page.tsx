import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageWrapper>
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h1 className="text-4xl font-heading font-bold mb-8">Terms & Conditions</h1>
              <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                <p>Last updated: May 07, 2026</p>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">1. Introduction</h2>
                <p>Welcome to Ai-Voria. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services.</p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">2. Use of Service</h2>
                <p>You must be at least 18 years old to use this service. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">3. Subscription and Fees</h2>
                <p>Our services are provided on a subscription basis. You agree to pay all fees associated with your chosen plan. All fees are non-refundable unless otherwise stated.</p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">4. Intellectual Property</h2>
                <p>The platform and its original content, features, and functionality are and will remain the exclusive property of Ai-Voria and its licensors.</p>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">5. Limitation of Liability</h2>
                <p>In no event shall Ai-Voria, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
              </div>
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}
