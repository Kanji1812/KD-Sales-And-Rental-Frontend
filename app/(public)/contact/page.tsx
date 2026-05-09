"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageWrapper>
          <section className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Get in Touch</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions about our platform? Our team is here to help you scale your business.
              </p>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Information */}
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-heading font-bold">Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Reach out to us via any of these channels or fill out the form. We typically respond within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { icon: Mail, title: "Email", content: "support@ai-voria.com", sub: "For general inquiries" },
                      { icon: Phone, title: "Phone", content: "+1 (555) 123-4567", sub: "Mon-Fri from 9am to 6pm" },
                      { icon: MapPin, title: "Office", content: "123 Fashion Ave, NY 10001", sub: "Visit our showroom" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{item.title}</h4>
                          <p className="text-slate-900 dark:text-slate-100 font-medium">{item.content}</p>
                          <p className="text-sm text-muted-foreground">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div className="glass-premium p-8 md:p-12 rounded-[2.5rem] border shadow-2xl">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">First Name</label>
                        <Input placeholder="Jane" className="h-12 rounded-xl bg-white/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Last Name</label>
                        <Input placeholder="Doe" className="h-12 rounded-xl bg-white/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Email Address</label>
                      <Input placeholder="jane@company.com" className="h-12 rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Subject</label>
                      <Input placeholder="Inquiry about Enterprise plan" className="h-12 rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Message</label>
                      <textarea 
                        className="w-full min-h-[150px] p-4 rounded-2xl bg-white/50 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/20">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}
