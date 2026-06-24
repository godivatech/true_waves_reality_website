import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Scale, ShieldCheck, TrendingUp, HeartHandshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import MobileCta from "@/components/MobileCta";
import ConsultationModal from "@/components/ConsultationModal";
import heroImg from "@/assets/images/hero-aerial.png";

const milestones = [
  { year: "2006", title: "Legacy Begins", desc: "Our leadership begins providing direct investor support across Tamil Nadu, laying the foundation for market intelligence." },
  { year: "2012", title: "True Waves Founded", desc: "Officially establishing our presence in Chennai with a focus on high-growth land corridors." },
  { year: "2018", title: "18 Years Excellence", desc: "Crossing 18 years of direct experience in the real estate market with over 20 successful projects delivered." },
  { year: "2020", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification, standardizing our processes for quality and trust." },
  { year: "2024", title: "Madurai Expansion", desc: "Launching landmark townships and high-return investment options in the heart of Madurai." },
];

const values = [
  {
    title: "Transparency",
    body: "We disclose our fee structure upfront. You will never encounter a hidden charge, a misleading commission, or an inflated quote from us.",
    icon: Scale,
  },
  {
    title: "Legal Integrity",
    body: "Not one plot has left our portfolio without complete documentation. This is not a differentiator — it is the baseline.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Thinking",
    body: "We study infrastructure pipelines and urban expansion over 7-year horizons. Our recommendations are built for your future self, not this quarter.",
    icon: TrendingUp,
  },
  {
    title: "Client First",
    body: "Our advisors are measured on client satisfaction and return on investment — never on units sold or revenue targets.",
    icon: HeartHandshake,
  },
];

const team = [
  {
    name: "S. Sanjay",
    role: "Founder",
    bio: "\"Real estate is not about selling property — it's about helping people invest at the right time.\" With 18+ years of direct investor support across Tamil Nadu, he ensures personal involvement in every client's investment journey.",
    img: "/assets/Sanjay.jpeg",
  },
  {
    name: "Narasimhan",
    role: "Director • Civil Engineer",
    bio: "\"Building with Experience. Leading with Vision.\" A seasoned civil engineer with B.E. Civil Engineering and 30+ years of experience contributing to landmark projects across TVS Group, DLF, RWD, and Chettinad Group.",
    img: "/assets/narashimhan.png",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-end pb-28 overflow-hidden bg-[#0A1128]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={heroImg} alt="About Us" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.span
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Story
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.88]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Built on trust,<br />
            <span className="font-light text-white/40">since 2012</span>
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 px-6 bg-background overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0A1128_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="container mx-auto max-w-5xl">
          {/* Main Statement */}
          <div className="max-w-4xl">
            <p className="text-3xl md:text-5xl font-light leading-tight tracking-tight reveal-text text-foreground/90">
              We started True Waves because we watched good people make bad land investments —
              not from greed, but from a lack of{" "}
              <span className="text-foreground font-medium">proper guidance</span>
            </p>
          </div>

          {/* Large Cinematic Image Showcase */}
          <div className="mt-16 reveal-card">
            <div className="relative overflow-hidden aspect-[16/10] md:aspect-[16/9] rounded-sm border border-border/40 shadow-sm">
              <img 
                src="/assets/images/other images/about-manifesto.png" 
                alt="Boardroom advisory session" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Detail Paragraphs */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <p className="text-lg text-foreground/80 font-light leading-relaxed reveal-text">
              Tamil Nadu is one of India's most dynamic real estate markets. Infrastructure investment is accelerating: metro extensions, highway corridors, SEZs, IT parks. The opportunity is real. But so are the risks for those who buy without the right partner.
            </p>
            <p className="text-lg text-foreground/80 font-light leading-relaxed reveal-text">
              True Waves was built to eliminate those risks entirely — through legal rigor, honest pricing, and the kind of market intelligence that only comes from 12 years of on-the-ground relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-0 pb-32 px-6 bg-[#F5F5F0]">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter py-24 reveal-text">
            What We <span className="text-muted-foreground/30 font-light">Stand For</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border/40">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className={`reveal-card p-12 md:p-16 group hover:bg-white transition-colors duration-500 ${i % 2 === 0 ? "md:border-r border-border/40" : ""
                    } ${i < 2 ? "border-b border-border/40" : ""}`}
                >
                  <Icon className="w-10 h-10 text-accent mb-6 stroke-[1.5]" />
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 group-hover:text-accent transition-colors duration-500">
                    {v.title}
                  </h3>
                  <p className="text-foreground/80 font-light leading-relaxed text-lg">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 px-6 bg-background border-t border-border/40">
        <div className="container mx-auto max-w-6xl">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium block mb-6 reveal-text">
            The True Waves Difference
          </span>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-20 reveal-text text-foreground">
            We solve every problem<br className="hidden md:block" /> you've faced in real estate
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* The Old Way */}
            <div className="space-y-8 reveal-card">
              <div className="flex items-center gap-3 text-2xl font-semibold text-red-600 mb-6">
                <span>❌</span>
                <h3>The old way</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Confusing property deals",
                    desc: "complicated paperwork, unclear terms, hidden clauses you find out about too late."
                  },
                  {
                    title: "Unverified documents",
                    desc: "titles you can't trust, legal disputes that emerge after purchase."
                  },
                  {
                    title: "No guidance after purchase",
                    desc: "agents disappear the moment the deal is closed."
                  },
                  {
                    title: "Low returns due to wrong location",
                    desc: "investing in areas with no growth potential or poor connectivity."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-sm bg-[#FFF5F5] border border-red-100/30">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold mt-0.5">✕</span>
                    <p className="text-base text-foreground/80 font-light leading-relaxed">
                      <strong className="font-semibold text-foreground">{item.title}</strong> — {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The True Waves Way */}
            <div className="space-y-8 reveal-card">
              <div className="flex items-center gap-3 text-2xl font-semibold text-emerald-700 mb-6">
                <span>✅</span>
                <h3>The True Waves way</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "100% transparent process",
                    desc: "we walk you through every document, every clause, every step of registration."
                  },
                  {
                    title: "DTCP-approved & legally verified",
                    desc: "every project goes through rigorous legal checks before we present it to you."
                  },
                  {
                    title: "Lifetime relationship",
                    desc: "buy, grow, and exit with our guidance. We're with you for the full investment journey."
                  },
                  {
                    title: "Location intelligence",
                    desc: "we identify high-growth corridors early, so your investment appreciates ahead of the crowd."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-sm bg-[#F3FAF5] border border-emerald-100/20">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                    <p className="text-base text-foreground/80 font-light leading-relaxed">
                      <strong className="font-semibold text-foreground">{item.title}</strong> — {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-24 reveal-text">
            12 Years of <span className="text-muted-foreground/30 font-light">Milestones</span>
          </h2>
          <div className="relative">
            <div className="absolute left-16 md:left-24 top-0 bottom-0 w-px bg-border/50" />
            {milestones.map((m) => (
              <div key={m.year} className="reveal-card flex gap-10 md:gap-16 mb-16 relative group">
                <div className="w-16 md:w-24 flex-shrink-0 text-right relative pr-5 md:pr-8">
                  <span className="text-muted-foreground/40 font-medium text-sm tracking-widest block pt-1">{m.year}</span>
                  <div className="absolute right-0 top-2 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-accent transition-colors duration-500 translate-x-[calc(50%+0.5px)]" />
                </div>
                <div className="pl-10 md:pl-16 pb-2">
                  <h3 className="text-2xl font-medium tracking-tight mb-3 group-hover:text-accent transition-colors duration-500">{m.title}</h3>
                  <p className="text-foreground/70 font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-6 bg-[#F5F5F0]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-24 reveal-text">
            The People <span className="text-muted-foreground/30 font-light">Behind It</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {team.map((member, i) => (
              <div key={member.name} className="reveal-card group">
                <div className="relative overflow-hidden aspect-[3/4] mb-8">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-1 group-hover:text-accent transition-colors duration-500">{member.name}</h3>
                <p className="text-accent text-xs tracking-widest uppercase mb-4 font-medium">{member.role}</p>
                <p className="text-foreground/80 font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 bg-slate-50 text-[#0A1128] px-6 border-t border-border/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-10 reveal-text leading-tight text-[#0A1128]">
                Let's talk<br />about your<br />future.
              </h2>
              <p className="text-[#0A1128]/70 font-light text-xl leading-relaxed max-w-sm reveal-text">
                Reach us directly. No queues, no call centres — a real conversation with a real advisor.
              </p>
            </div>
            <div className="flex flex-col gap-8 reveal-card">
              <div className="border-b border-[#0A1128]/10 pb-8">
                <p className="text-[#0A1128]/40 text-xs tracking-widest uppercase mb-3">Phone</p>
                <a href="tel:+919876543210" className="text-3xl font-light tracking-tight hover:text-accent transition-colors duration-300 text-[#0A1128]">
                  +91 98765 43210
                </a>
              </div>
              <div className="border-b border-[#0A1128]/10 pb-8">
                <p className="text-[#0A1128]/40 text-xs tracking-widest uppercase mb-3">Email</p>
                <a href="mailto:invest@truewaves.in" className="text-3xl font-light tracking-tight hover:text-accent transition-colors duration-300 text-[#0A1128]">
                  invest@truewaves.in
                </a>
              </div>
              <div className="border-b border-[#0A1128]/10 pb-8">
                <p className="text-[#0A1128]/40 text-xs tracking-widest uppercase mb-3">Office</p>
                <p className="text-xl font-light text-[#0A1128]/70 leading-relaxed">
                  17/13, Easwaran Koil Street,<br />
                  Vellai thottam, West Mambalam,<br />
                  Chennai - 600033
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-about-whatsapp"
                  className="flex-1 py-4 bg-[#25D366] text-white font-medium text-center rounded-sm hover:opacity-90 transition-opacity tracking-wide"
                >
                  WhatsApp
                </a>
                <a
                  href="/invest"
                  data-testid="button-about-invest"
                  className="flex-1 py-4 bg-[#0A1128] text-white font-medium text-center rounded-sm hover:bg-accent transition-colors duration-300 tracking-wide"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppBtn />
      <MobileCta onContactClick={() => setIsModalOpen(true)} />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
