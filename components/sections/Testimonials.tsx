"use client";

import { SectionWrapper } from "@/components/layout/PageWrapper";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, FashionFlow",
    content: "Ai-Voria transformed our rental business. We saw a 40% increase in efficiency within the first two months.",
    avatar: "S",
  },
  {
    name: "Michael Chen",
    role: "Operations Manager, UrbanThreads",
    content: "The analytics provided by Ai-Voria are unparalleled. We can now predict seasonal trends with incredible accuracy.",
    avatar: "M",
  },
  {
    name: "Elena Rodriguez",
    role: "Owner, BridalGems",
    content: "Inventory tracking was our biggest headache. Now, it's our favorite part of the platform. So intuitive!",
    avatar: "E",
  },
];

export function Testimonials() {
  return (
    <SectionWrapper className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of businesses that are scaling with Ai-Voria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-premium p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
