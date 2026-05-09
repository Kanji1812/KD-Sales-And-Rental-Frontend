import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageWrapper>
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
              <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                <p>Last updated: May 07, 2026</p>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, company name, and payment information.</p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">2. How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you about updates and offers.</p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">3. Data Security</h2>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">4. Third-Party Services</h2>
                <p>We may share your information with third-party vendors and service providers who perform services on our behalf, such as payment processing and data analytics.</p>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">5. Your Choices</h2>
                <p>You may update or correct your account information at any time by logging into your account settings. You may also opt out of receiving promotional emails from us.</p>
              </div>
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}
