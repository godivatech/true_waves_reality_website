import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import MobileCta from "@/components/MobileCta";
import ConsultationModal from "@/components/ConsultationModal";
import heroImg from "@/assets/images/hero-aerial.png";
import prop2 from "@/assets/images/property-2.png";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    body: "A private 30-minute session with a senior advisor. We understand your capital horizon, liquidity timeline, and risk profile before presenting anything.",
  },
  {
    num: "02",
    title: "Curated Shortlist",
    body: "Based on your brief, we surface two to four pre-vetted properties — including off-market inventory — matched precisely to your investment thesis.",
  },
  {
    num: "03",
    title: "Due Diligence Review",
    body: "Our legal team walks you through every document: title deeds, patta, DTCP sanction, encumbrance certificate, and survey maps. No jargon, no shortcuts.",
  },
  {
    num: "04",
    title: "Seamless Acquisition",
    body: "Registration, stamp duty guidance, and loan facilitation handled entirely by us. You sign, we coordinate. The deed is yours within the agreed timeline.",
  },
  {
    num: "05",
    title: "Wealth Monitoring",
    body: "Post-registration, we track surrounding infrastructure development, appreciation signals, and resale opportunities on your behalf — indefinitely.",
  },
];

const categories = [
  {
    title: "Safe investment",
    range: "Plots & Flats",
    desc: "Perfect for first-time buyers & conservative investors. Buy verified plots or apartments at direct builder pricing.",
    tags: ["Verified Plots", "Direct Pricing", "Safe Assets"],
  },
  {
    title: "High-return investment",
    range: "ROI Focused",
    desc: "For HNI investors seeking maximum ROI. Joint development projects with higher appreciation potential.",
    tags: ["HNI Options", "Max ROI", "Joint Development"],
  },
  {
    title: "Earn while you refer",
    range: "Channel Partner",
    desc: "Our channel partner program. Refer investors to True Waves Realty and earn attractive commissions on every deal.",
    tags: ["Referral Program", "Commissions", "Partner Growth"],
  },
];

const faqs = [
  {
    q: "Is my investment legally safe?",
    a: "Every property we offer has cleared a 40-point legal verification including title scrutiny, encumbrance certification, DTCP plan sanction, and patta confirmation. We only present what we would invest in ourselves.",
  },
  {
    q: "Can NRIs invest in Tamil Nadu land?",
    a: "Yes. NRIs and PIOs can purchase residential and commercial plots in India under FEMA regulations. Our team handles the full RBI compliance documentation and power of attorney setup remotely.",
  },
  {
    q: "How do I get a bank loan for a plot purchase?",
    a: "All our featured plots are pre-approved with SBI, HDFC, and Axis Bank. We facilitate loan processing directly and can often secure approvals within 7 to 10 working days.",
  },
  {
    q: "What is the typical appreciation timeline?",
    a: "Most of our plots have seen 15–25% annual appreciation over a 3-year horizon. Properties on infrastructure corridors (NH, metro extension zones) have achieved 35–40% in accelerated cycles.",
  },
  {
    q: "Do you offer any post-purchase support?",
    a: "Absolutely. We monitor your asset, alert you to appreciation triggers, and assist with resale or further development when you choose to exit.",
  },
];

export default function Invest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState(-1);
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
            delay: i * 0.08,
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
          <img src={heroImg} alt="Invest" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/55 to-transparent" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-end gap-10">
          <div>
            <motion.span
              className="text-accent text-sm tracking-[0.3em] uppercase font-medium block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Investment Gateway
            </motion.span>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.88]"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Choose how you<br />
              <span className="font-light text-white/40">want to grow</span>
            </motion.h1>
          </div>
          <motion.div
            className="flex flex-col gap-4 md:items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <p className="text-white/60 font-light max-w-sm md:text-right leading-relaxed">
              Whether you're a first-time buyer, a seasoned investor, or looking to earn by referring — we have a path for you.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              data-testid="button-invest-hero-cta"
              className="px-8 py-3 bg-white text-[#0A1128] font-medium tracking-wide rounded-sm hover:bg-accent hover:text-white transition-colors duration-300 text-sm self-start md:self-auto"
            >
              Book Discovery Call
            </button>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter reveal-text leading-tight">
              How it <span className="text-muted-foreground/30 font-light">Works</span>
            </h2>
            <span className="text-muted-foreground text-sm tracking-widest uppercase hidden md:block">5 Steps</span>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50 hidden md:block" />
            {steps.map((s) => (
              <div
                key={s.num}
                className="reveal-card md:pl-16 py-14 border-b border-border/40 grid grid-cols-1 md:grid-cols-12 gap-6 group relative"
              >
                <div className="absolute left-0 top-14 w-3 h-3 rounded-full bg-border group-hover:bg-accent transition-colors duration-500 hidden md:block -translate-x-1" />
                <div className="md:col-span-2">
                  <span className="text-muted-foreground/30 text-5xl font-semibold tracking-tighter">{s.num}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">
                    {s.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-foreground/80 leading-relaxed text-lg font-light">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="py-32 px-6 bg-[#F5F5F0]">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-24 reveal-text">
            What We <span className="text-muted-foreground/30 font-light">Offer</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {categories.map((c, i) => (
              <div
                key={c.title}
                className={`reveal-card p-10 md:p-14 border border-border/50 group hover:bg-white transition-colors duration-500 ${i === 0 ? "md:border-r-0 md:border-b-0" :
                  i === 1 ? "md:border-b-0" :
                    i === 2 ? "md:border-r-0" : ""
                  }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">
                    {c.title}
                  </h3>
                  <span className="text-lg font-light text-muted-foreground">{c.range}</span>
                </div>
                <p className="text-foreground/70 leading-relaxed font-light mb-8">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs tracking-widest uppercase border border-border/60 text-muted-foreground group-hover:border-accent/40 group-hover:text-foreground transition-colors duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Image + CTA */}
      <section className="bg-background grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden h-80 lg:h-auto">
          <img src={prop2} alt="Investment" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A1128]/10" />
        </div>
        <div className="flex flex-col justify-center px-12 md:px-20 py-24 gap-8">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight reveal-text text-foreground/80">
            Begin with a<br />private conversation
          </h2>
          <p className="text-foreground/70 font-light text-lg leading-relaxed max-w-sm reveal-text">
            No sales pitch. No pressure. A 30-minute call to understand your goals and present what's genuinely right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 reveal-text">
            <button
              onClick={() => setIsModalOpen(true)}
              data-testid="button-invest-whatsapp"
              className="px-8 py-4 bg-[#0A1128] text-white font-medium tracking-wide rounded-sm hover:bg-accent transition-colors duration-300 text-center"
            >
              WhatsApp Us
            </button>
            <a
              href="tel:+919876543210"
              data-testid="button-invest-call"
              className="px-8 py-4 border border-border text-foreground font-medium tracking-wide rounded-sm hover:border-foreground transition-colors duration-300 text-center"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-24 reveal-text">
            Common <span className="text-muted-foreground/30 font-light">Questions</span>
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="reveal-card border-t border-border/60">
                <button
                  className="w-full py-8 flex justify-between items-start gap-8 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 mt-1 transition-transform duration-500 ${openFaq === i ? "rotate-45" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${openFaq === i ? "max-h-64 pb-8" : "max-h-0"}`}
                >
                  <p className="text-foreground/80 font-light leading-relaxed text-lg">{faq.a}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-border/60" />
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
