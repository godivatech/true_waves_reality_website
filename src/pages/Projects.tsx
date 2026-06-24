import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import MobileCta from "@/components/MobileCta";
import ConsultationModal from "@/components/ConsultationModal";
import heroImg from "@/assets/images/hero-aerial.png";
import { useLocation } from "wouter";
import { projects } from "@/data/projects";

function useUrlLocation() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }));

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
      });
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushState", handleLocationChange);
    window.addEventListener("replaceState", handleLocationChange);

    const interval = setInterval(() => {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      setLocation((prev) => {
        if (prev.pathname !== currentPath || prev.search !== currentSearch) {
          return { pathname: currentPath, search: currentSearch };
        }
        return prev;
      });
    }, 100);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushState", handleLocationChange);
      window.removeEventListener("replaceState", handleLocationChange);
      clearInterval(interval);
    };
  }, []);

  return location;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [, navigate] = useLocation();
  const { search } = useUrlLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const filterParam = params.get("filter");
    if (filterParam) {
      const decodedFilter = decodeURIComponent(filterParam);
      const matched = ["All", "Plots", "Residential", "Premium"].find(
        (f) => f.toLowerCase() === decodedFilter.toLowerCase()
      );
      if (matched) {
        setActiveFilter(matched);
      }
    } else {
      setActiveFilter("All");
    }
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.has("filter")) {
      const timer = setTimeout(() => {
        const element = document.getElementById("projects-feed");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [search]);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: (i % 3) * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Page Hero */}
      <section className="relative h-[70vh] flex items-end pb-24 overflow-hidden bg-[#0A1128]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={heroImg} alt="Portfolio" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.span
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Portfolio
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Every Project,<br />
            <span className="text-white/30 font-light">a Future</span>
          </motion.h1>
        </div>
      </section>

      {/* Filter Bar */}
      <div id="projects-feed" className="sticky top-[64px] md:top-[88px] scroll-mt-[64px] md:scroll-mt-[88px] z-30 bg-background/90 backdrop-blur-md border-b border-border/50 py-4 px-6 overflow-hidden">
        <div className="container mx-auto relative">
          <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
            {["All", "Plots", "Residential", "Premium"].map((f) => (
              <button
                key={f}
                onClick={() => navigate(`/projects?filter=${encodeURIComponent(f)}`)}
                data-testid={`button-filter-${f.toLowerCase().replace(" ", "-")}`}
                className={`text-xs md:text-sm tracking-[0.2em] uppercase whitespace-nowrap pb-2 border-b-2 transition-all duration-300 font-medium snap-start ${activeFilter === f
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Subtle fade indicator for mobile overflow */}
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
        </div>
      </div>

      {/* Featured Projects Grid */}
      <section className="pt-24 pb-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter reveal-text">
              Featured <span className="text-muted-foreground/30 font-light">Projects</span>
            </h2>
            <p className="text-muted-foreground font-light text-sm tracking-widest uppercase hidden md:block reveal-text pb-2">
              {filteredProjects.length} Properties
            </p>
          </div>

          <div className={filteredProjects.length === 1 
            ? "grid grid-cols-1 max-w-2xl mx-auto" 
            : "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
          }>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => {
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    key={p.id} 
                    className="group cursor-pointer"
                    onClick={() => navigate(`/projects/${p.slug}`)}
                  >
                    <div className="relative overflow-hidden aspect-[4/3] mb-6">
                      {p.img.endsWith('.mp4') ? (
                        <video
                          src={p.img}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={p.img}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-[#0A1128]/5 group-hover:bg-transparent transition-colors duration-700" />
                      
                      <span className="absolute top-5 left-5 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs tracking-widest uppercase border border-white/20">
                        {p.tag}
                      </span>
                      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-10 h-10 bg-white flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#0A1128]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-accent text-xs tracking-widest uppercase font-medium">{p.location}</p>
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{p.title}</h3>
                        <p className="text-foreground/70 font-light text-sm text-right">{p.type}</p>
                      </div>
                      <p className="text-foreground/70 font-light text-sm mt-1 leading-relaxed">{p.desc}</p>
                      <div className="flex gap-6 mt-2 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Area</p>
                          <p className="text-sm font-medium">{p.area}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Price</p>
                          <p className="text-sm font-medium">{p.price}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-32 bg-slate-50 text-[#0A1128] text-center px-6 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-10 reveal-text leading-tight text-[#0A1128]">
            Don't See Your<br />Ideal Project?
          </h2>
          <p className="text-[#0A1128]/70 font-light text-xl mb-16 max-w-xl mx-auto reveal-text">
            We hold off-market inventory that never reaches the public. Speak with an advisor today.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            data-testid="button-projects-cta"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-[#0A1128] text-white font-medium rounded-sm hover:scale-105 transition-transform duration-500 text-lg tracking-wide hover:bg-accent transition-colors duration-300"
          >
            Enquire Privately
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppBtn />
      <MobileCta onContactClick={() => setIsModalOpen(true)} />

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}