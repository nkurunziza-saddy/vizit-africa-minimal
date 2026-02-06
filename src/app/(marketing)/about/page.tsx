import { Navbar } from "@/components/shared";
import { teamMembers } from "@/lib/dummy-data";
import {
  RiShieldCheckLine,
  RiHeart3Line,
  RiMapPin2Line,
  RiStarLine,
} from "@remixicon/react";
import Image from "next/image";

// Real images for team members
const avatars = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-50 pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2600&auto=format&fit=crop"
              alt="Community in Rwanda"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <span className="text-white/80 font-mono uppercase tracking-widest text-sm mb-4 block">
              Since 2018
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
              Founded from a passion for sharing Rwanda's breathtaking beauty
              and resilience with the world. We believe in travel that connects,
              inspires, and transforms.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-24 px-5 md:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Our Mission & Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              We are dedicated to providing authentic, seamless, and
              unforgettable travel experiences while supporting local
              communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="size-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <RiShieldCheckLine className="size-10" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Trust & Safety
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your safety is our priority. We partner with verified operators
                and provide 24/7 support throughout your journey, ensuring peace
                of mind.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <RiHeart3Line className="size-32 text-accent-warm" />
              </div>
              <div className="size-20 rounded-2xl bg-accent-warm/10 text-accent-warm flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform relative z-10">
                <RiHeart3Line className="size-10" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground relative z-10">
                Local Impact
              </h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">
                We believe in tourism that gives back. A portion of every
                booking supports local conservation and community projects
                across Rwanda.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="size-20 rounded-2xl bg-accent-success/10 text-accent-success flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <RiMapPin2Line className="size-10" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Authentic Experiences
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Go beyond the guidebooks. Our local experts connect you with the
                real people, culture, and hidden gems of Rwanda that others
                miss.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white py-24 border-t border-border">
          <div className="px-5 md:px-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Meet the Team
                </h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  The passionate experts working behind the scenes to make your
                  dream trip a reality. We are locals, travelers, and planners
                  at heart.
                </p>
              </div>
              <div className="flex items-center gap-3 text-primary font-bold bg-primary/5 px-6 py-3 rounded-full border border-primary/10">
                <RiStarLine className="size-6 fill-current" />
                <span>40+ Years Combined Experience</span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {teamMembers.map((member, i) => (
                <div key={member.id} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-muted shadow-md group-hover:shadow-xl transition-all duration-500">
                    <img
                      src={avatars[i % avatars.length]}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 py-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs font-bold uppercase tracking-widest">
                        Connect
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-3 uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-5 md:px-10 bg-neutral-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse" />
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Ready to meet us in Kigali?
            </h2>
            <p className="text-xl opacity-80 mb-10 font-light max-w-2xl mx-auto">
              Let's plan a trip that exceeds your expectations. Coffee is on us.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-16 px-10 rounded-full bg-white text-neutral-900 font-bold text-lg hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10"
            >
              Start Planning
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
