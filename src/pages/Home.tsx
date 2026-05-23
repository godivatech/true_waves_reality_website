import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";

import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import MobileCta from "@/components/MobileCta";
import ConsultationModal from "@/components/ConsultationModal";

import heroImg from "@/assets/images/hero-aerial.png";

const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL || "https://ik.imagekit.io/15s95izzpx";

const getImg = (path: string) => encodeURI(`${IMAGEKIT_URL}${path.startsWith('/') ? '' : '/'}${path}`);



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const processContainerRef = useRef<HTMLDivElement>(null);

  // Mouse reactive glow state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text reveals
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((el) => {
        gsap.fromTo(el,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // Horizontal Scroll for Process Section
      if (horizontalScrollRef.current && processContainerRef.current) {
        const sections = gsap.utils.toArray(".process-step");

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: processContainerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + horizontalScrollRef.current!.offsetWidth
          }
        });
      }

      // Stats counters
      gsap.utils.toArray<HTMLElement>(".stat-counter").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";

        gsap.fromTo(el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
            onUpdate: function () {
              const val = Math.round(Number(this.targets()[0].textContent));
              const p = prefix ? `<span class="text-[0.5em] opacity-40 mr-2 inline-block translate-y-[-0.1em]">${prefix}</span>` : "";
              const s = suffix ? `<span class="text-[0.4em] opacity-40 ml-1 inline-block translate-y-[-0.2em] font-medium tracking-normal">${suffix}</span>` : "";
              el.innerHTML = p + val + s;
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-background text-foreground min-h-screen selection:bg-accent selection:text-white">

      {/* Mouse Reactive Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(58, 190, 249, 0.05), transparent 80%)`
        }}
      />

      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-primary">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <img src={heroImg} alt="Aerial view of luxury land" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-background" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="px-5 py-2 rounded-full border border-white/20 text-white/90 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-md bg-white/5">
              Trusted by investors for 18+ years
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] max-w-6xl mb-8"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Turn Land into <span className="text-accent font-light pr-4">Wealth</span><br />
            Before Prices Rise
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-white/70 max-w-2xl mb-14 font-light tracking-wide leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Exclusive DTCP-approved plots and high-growth projects across Tamil Nadu. Verified, direct, and transparent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              data-testid="button-hero-cta"
              className="group relative px-10 py-5 bg-white text-primary font-medium overflow-hidden rounded-sm transition-all hover:scale-105 duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-3 tracking-wide text-lg">
                Get my investment plan
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 h-full w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-0" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marquee Trust Strip */}
      <div className="w-full py-10 bg-background border-b border-border/50 overflow-hidden flex items-center mix-blend-difference">
        <div className="whitespace-nowrap flex gap-20 px-4 animate-marquee opacity-40 text-sm md:text-base tracking-[0.2em] uppercase font-medium">
          <span>18+ Years of experience</span>
          <span className="text-accent">•</span>
          <span>20+ Projects delivered</span>
          <span className="text-accent">•</span>
          <span>ISO 9001:2015 certified</span>
          <span className="text-accent">•</span>
          <span>100% Legal & DTCP verified</span>
          <span className="text-accent">•</span>
          <span>18+ Years of experience</span>
          <span className="text-accent">•</span>
          <span>20+ Projects delivered</span>
          <span className="text-accent">•</span>
          <span>ISO 9001:2015 certified</span>
          <span className="text-accent">•</span>
          <span>100% Legal & DTCP verified</span>
        </div>
      </div>

      {/* Immersive Storytelling */}
      <section className="py-40 px-6 bg-background relative z-10">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-20 reveal-text leading-tight">
              No confusion <br />
              <span className="text-foreground/60">No surprises Only growth</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-32">
              <div className="space-y-10 reveal-text group">
                <div className="h-px w-full bg-border group-hover:bg-accent transition-colors duration-500" />
                <h3 className="text-3xl font-medium tracking-tight">Curated Growth</h3>
                <p className="text-foreground/80 leading-relaxed font-light text-lg">
                  Every project is meticulously vetted for geometric appreciation. We analyze infrastructure pipelines, corporate expansions, and municipal zoning to ensure your plot is positioned perfectly in the path of progress.
                </p>
              </div>
              <div className="space-y-10 reveal-text group">
                <div className="h-px w-full bg-border group-hover:bg-accent transition-colors duration-500" />
                <h3 className="text-3xl font-medium tracking-tight">Absolute Security</h3>
                <p className="text-foreground/80 leading-relaxed font-light text-lg">
                  Investment without anxiety. From rigorous title scrutiny to seamless registration, our legal framework provides an impenetrable shield for your capital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Process */}
      <section ref={processContainerRef} className="h-screen bg-secondary text-white overflow-hidden relative flex items-center">
        <div className="absolute top-12 left-10 md:left-20 z-20">
          <h2 className="text-xl md:text-2xl font-light tracking-widest uppercase text-white/40">The Process</h2>
        </div>

        <div ref={horizontalScrollRef} className="flex h-full w-[300vw] items-center">
          {/* Step 01 */}
          <div className="process-step w-screen h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-32 bg-[#0A1128] relative z-10">
              <div className="max-w-xl">
                <span className="text-accent text-8xl md:text-[10rem] font-semibold opacity-10 block mb-4 tracking-tighter">01</span>
                <h3 className="text-5xl md:text-7xl font-medium mb-10 tracking-tight leading-tight">100% Transparent Process</h3>
                <div className="w-20 h-1 bg-accent mb-10" />
                <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed">We walk you through every document, every clause, and every step of registration. No hidden clauses, no surprises. Complete clarity from day one.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              <img
                src="/assets/images/process/Transparent Process.png"
                alt="Transparent Process"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] to-transparent md:block hidden" />
            </div>
          </div>

          {/* Step 02 */}
          <div className="process-step w-screen h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-32 bg-[#0C1633] relative z-10">
              <div className="max-w-xl">
                <span className="text-accent text-8xl md:text-[10rem] font-semibold opacity-10 block mb-4 tracking-tighter">02</span>
                <h3 className="text-5xl md:text-7xl font-medium mb-10 tracking-tight leading-tight">DTCP Approved & Verified</h3>
                <div className="w-20 h-1 bg-accent mb-10" />
                <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed">Every project goes through rigorous legal checks and comes with pristine clear titles and DTCP approvals before we ever present it to you.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              <img
                src="/assets/images/process/DTCP Approved.png"
                alt="DTCP Approved & Verified"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C1633] to-transparent md:block hidden" />
            </div>
          </div>

          {/* Step 03 */}
          <div className="process-step w-screen h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-32 bg-[#0A1128] relative z-10">
              <div className="max-w-xl">
                <span className="text-accent text-8xl md:text-[10rem] font-semibold opacity-10 block mb-4 tracking-tighter">03</span>
                <h3 className="text-5xl md:text-7xl font-medium mb-10 tracking-tight leading-tight">Lifetime Relationship</h3>
                <div className="w-20 h-1 bg-accent mb-10" />
                <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed">Buy, grow, and exit with our guidance. We're with you for the full investment journey, ensuring your capital works for you across generations.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              <img
                src="/assets/images/process/Lifetime Relationship.png"
                alt="Lifetime Relationship"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] to-transparent md:block hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Properties */}
      <section className="pt-24 pb-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 reveal-text">
            <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter">
              Featured <span className="text-muted-foreground/30 font-light">Properties</span>
            </h2>
            <Link href="/projects" className="hidden md:flex items-center gap-3 text-sm tracking-widest uppercase hover:text-accent transition-colors pb-4 border-b border-border hover:border-accent">
              View All Locations
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Project 1 */}
            <div className="lg:col-span-7 group cursor-pointer reveal-text">
              <div className="relative overflow-hidden aspect-[4/3] mb-8">
                <img src={getImg("True waves/True waves Reality/fairland/1.jpeg")} alt="Residential Plot" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-accent text-sm tracking-widest uppercase mb-3 font-medium">Madurai</p>
                  <h3 className="text-4xl font-medium tracking-tight">Fairland Township</h3>
                </div>
                <p className="text-foreground/70 font-light text-lg">Integrated Township</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="lg:col-span-5 lg:mt-40 group cursor-pointer reveal-text">
              <div className="relative overflow-hidden aspect-[3/4] mb-8">
                <video src={getImg("True waves/True waves Reality/alagar homes/1.mp4")} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-accent text-sm tracking-widest uppercase mb-3 font-medium">Madurai</p>
                  <h3 className="text-3xl font-medium tracking-tight">Alagar Homes</h3>
                </div>
                <p className="text-foreground/70 font-light text-lg">Residential Apartments</p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="lg:col-span-12 lg:mt-24 group cursor-pointer reveal-text">
              <div className="relative overflow-hidden aspect-[21/9] mb-8">
                <img src={getImg("True waves/True waves Reality/vishal virinchi/1.png")} alt="Commercial Plot" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-accent text-sm tracking-widest uppercase mb-3 font-medium">Madurai</p>
                  <h3 className="text-4xl font-medium tracking-tight">Vishal's Virinchi</h3>
                </div>
                <p className="text-foreground/70 font-light text-lg">Premium Plots</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="pt-24 pb-32 bg-background border-y border-border/40 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 lg:gap-x-16">
            <div className="flex flex-col items-center text-center group">
              <span className="text-6xl md:text-8xl font-light tracking-tight text-primary mb-6 stat-counter group-hover:text-accent transition-colors duration-500" data-target="500" data-suffix="+">0</span>
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/60 font-medium">Plots Sold</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <span className="text-6xl md:text-8xl font-light tracking-tight text-primary mb-6 stat-counter group-hover:text-accent transition-colors duration-500" data-target="250" data-suffix="Cr+">0</span>
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/60 font-medium">Investment Value</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <span className="text-6xl md:text-8xl font-light tracking-tight text-primary mb-6 stat-counter group-hover:text-accent transition-colors duration-500" data-target="18" data-suffix="%">0</span>
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/60 font-medium">Avg. Appreciation</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <span className="text-6xl md:text-8xl font-light tracking-tight text-primary mb-6 stat-counter group-hover:text-accent transition-colors duration-500" data-target="12" data-suffix="+">0</span>
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/60 font-medium">Years Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-52 bg-primary text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
        <div className="container mx-auto max-w-5xl flex flex-col items-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-9xl font-semibold tracking-tighter mb-10 reveal-text whitespace-nowrap">
            Secure Your Legacy
          </h2>
          <p className="text-2xl text-white/50 font-light mb-20 max-w-3xl reveal-text leading-relaxed">
            Schedule a private consultation with our investment advisors to discover off-market opportunities before they launch.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            data-testid="button-final-cta"
            className="group relative px-12 py-6 bg-white text-primary font-medium overflow-hidden rounded-sm transition-all hover:scale-105 duration-500 reveal-text hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 tracking-wide text-xl">Book a Consultation</span>
            <div className="absolute inset-0 h-full w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-0" />
          </button>
        </div>
      </section>

      <Footer />

      <WhatsAppBtn />
      <MobileCta onContactClick={() => setIsModalOpen(true)} />

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
}