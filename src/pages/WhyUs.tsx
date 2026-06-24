import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import MobileCta from "@/components/MobileCta";
import ConsultationModal from "@/components/ConsultationModal";
import prop1 from "@/assets/images/property-1.png";
// Using public asset for the stats section
const STATS_IMAGE = "/assets/images/other images/1.png";


const differentiators = [
  {
    num: "01",
    title: "100% transparent process",
    body: "We walk you through every document, every clause, and every step of registration. You will never encounter a hidden clause or an unclear term with us.",
  },
  {
    num: "02",
    title: "DTCP-approved & legally verified",
    body: "Every project goes through rigorous legal checks and comes with pristine clear titles and full approvals before we ever present it to you.",
  },
  {
    num: "03",
    title: "Lifetime relationship",
    body: "Buy, grow, and exit with our guidance. We're with you for the full investment journey, monitoring appreciation and alerting you to exit windows.",
  },
  {
    num: "04",
    title: "Location intelligence",
    body: "We identify high-growth corridors early using infrastructure and zoning data, ensuring your investment appreciates ahead of the general crowd.",
  },
];

const testimonials = [
  {
    quote: "True Waves didn't just sell me land. They showed me the infrastructure map of Chennai's next decade and positioned my capital exactly in front of it.",
    name: "Karthik Subramaniam",
    role: "Business Owner, Coimbatore",
  },
  {
    quote: "In 18 months my ECR plot appreciated by 34%. The team's due diligence gave me confidence to invest beyond my comfort zone — it paid off.",
    name: "Priya Nair",
    role: "NRI Investor, Dubai",
  },
  {
    quote: "Every document was in order before I even asked. The professionalism here is at a completely different level from every other real estate firm I've dealt with.",
    name: "Ramesh Krishnamurthy",
    role: "Retired IAS Officer",
  },
];

export default function WhyUs() {
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
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // Stat counters
      gsap.utils.toArray<HTMLElement>(".stat-counter").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 80%" },
            onUpdate: function () {
              el.innerHTML = Math.round(Number(this.targets()[0].textContent)) + suffix;
            },
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
      <section className="relative h-[75vh] flex items-end pb-28 overflow-hidden bg-[#0A1128]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={prop1} alt="Why Us" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/50 to-transparent" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.span
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            The True Waves Difference
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.88]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            We engineer<br />
            <span className="font-light text-white/40">your advantage</span>
          </motion.h1>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight reveal-text text-foreground/80">
            <span className="md:whitespace-nowrap">Most real estate firms sell you what exists</span><br />
            <span className="text-foreground font-medium">We position you for what's coming</span>
          </h2>
        </div>
      </section>

      {/* Differentiators — editorial vertical list */}
      <section className="py-0 pb-40 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          {differentiators.map((d) => (
            <div
              key={d.num}
              className="reveal-card border-t border-border/60 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 group"
            >
              <div className="md:col-span-1">
                <span className="text-muted-foreground/40 text-sm font-medium tracking-widest">{d.num}</span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">
                  {d.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-foreground/80 leading-relaxed text-lg font-light">
                  {d.body}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-border/60" />
        </div>
      </section>

      {/* Split Image + Stats */}
      <section className="py-0 bg-[#F5F5F0] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[700px]">
          <div className="relative overflow-hidden h-80 lg:h-full">
            <img src={STATS_IMAGE} alt="Investment" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0A1128]/20" />
          </div>
          <div className="flex flex-col justify-center px-12 md:px-20 py-16 gap-16">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-tight reveal-text">
              Twelve years<br />One standard
            </h2>
            <div className="grid grid-cols-2 gap-12">
              {[
                { val: "500", suffix: "+", label: "Plots Delivered" },
                { val: "250", suffix: "Cr+", label: "Capital Deployed" },
                { val: "18", suffix: "%", label: "Avg Appreciation" },
                { val: "98", suffix: "%", label: "Client Retention" },
              ].map((s) => (
                <div key={s.label} className="group">
                  <span
                    className="text-5xl md:text-7xl font-light tracking-tighter text-[#0A1128] mb-3 block stat-counter group-hover:text-accent transition-colors duration-500"
                    data-target={s.val}
                    data-suffix={s.suffix}
                  >
                    0
                  </span>
                  <span className="text-xs tracking-widest uppercase text-muted-foreground font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — cinematic */}
      <section className="py-32 px-6 bg-background relative overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-24 reveal-text">
            Investor <span className="text-muted-foreground/30 font-light">Voices</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="reveal-card border-l border-border/60 px-10 py-12 hover:border-accent transition-colors duration-500 group"
              >
                <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/80 mb-10 group-hover:text-foreground transition-colors duration-500">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-medium tracking-tight text-lg md:text-xl">{t.name}</p>
                  <p className="text-foreground/60 text-sm md:text-base mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-slate-50 text-[#0A1128] text-center px-6 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-10 reveal-text text-[#0A1128]">
            Ready to Invest<br className="md:hidden" /> With Confidence?
          </h2>
          <p className="text-[#0A1128]/70 font-light text-xl mb-16 max-w-xl mx-auto reveal-text">
            Join 500+ investors who trusted True Waves to grow their wealth through land.
          </p>
          <a
            href="/invest"
            data-testid="button-whyus-cta"
            className="group relative overflow-hidden inline-flex items-center gap-4 px-10 py-5 bg-[#0A1128] text-white font-medium rounded-sm transition-all hover:scale-105 duration-500 text-lg tracking-wide hover:shadow-[0_10px_30px_rgba(10,17,40,0.15)]"
          >
            <span className="relative z-10 flex items-center gap-4">
              Begin Your Journey
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 h-full w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-0" />
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppBtn />
      <MobileCta onContactClick={() => setIsModalOpen(true)} />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
