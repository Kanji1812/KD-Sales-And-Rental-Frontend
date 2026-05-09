import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper, SectionWrapper } from "@/components/layout/PageWrapper";
import { Award, Heart, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageWrapper>
          <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-heading font-bold">Our Mission</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                At Ai-Voria, we believe that fashion management should be as elegant as the garments it tracks. Our mission is to empower fashion entrepreneurs with the world's most intuitive and powerful SaaS platform.
              </p>
            </div>
          </section>

          <SectionWrapper className="py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="glass-premium aspect-square rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/5" />
                   <Heart className="w-32 h-32 text-primary animate-pulse" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold">The Story Behind Ai-Voria</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Founded in 2024 by a team of fashion industry veterans and software engineers, Ai-Voria was born out of a simple frustration: why are retail management systems so clunky and outdated?
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We set out to build a platform that actually understands the nuances of cloth rental and high-end retail. Today, we're proud to serve over 1,000 brands globally.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-heading font-bold text-center mb-16">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { icon: Users, title: "Community First", desc: "We build for and with our users." },
                  { icon: Award, title: "Excellence", desc: "No compromises on quality or design." },
                  { icon: Shield, title: "Trust", desc: "Your data security is our top priority." },
                  { icon: Heart, title: "Passion", desc: "We love what we do, and it shows." },
                ].map((v, i) => (
                  <div key={i} className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center text-primary mx-auto shadow-sm">
                      <v.icon className="h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-xl">{v.title}</h4>
                    <p className="text-muted-foreground text-sm">{v.desc}</p>
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
