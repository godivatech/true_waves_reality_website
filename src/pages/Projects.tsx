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

const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL || "https://ik.imagekit.io/15s95izzpx";

const getImg = (path: string) => encodeURI(`${IMAGEKIT_URL}${path.startsWith('/') ? '' : '/'}${path}`);


const projects = [
  {
    id: 1,
    title: "Fairland Township",
    location: "NH-44, Ayyankottai",
    type: "Plotted Township",
    area: "40 Acres",
    price: "DTCP Approved",
    tag: "Featured",
    category: "Residential",
    img: getImg("True waves/True waves Reality/fairland/1.jpeg"),
    featured: true,
    wide: true,
    desc: "A masterplanned gated community with full infrastructure, maze garden, and 40-ft grand entrance.",
  },
  {
    id: 2,
    title: "Alagar Homes",
    location: "Nethaji Main Road",
    type: "Residential Apartments",
    area: "1, 2 & 2.5 BHK",
    price: "Premium Living",
    tag: "Bibi Kulam",
    category: "Residential",
    img: getImg("True waves/True waves Reality/alagar homes/1.mp4"),
    featured: false,
    wide: false,
    desc: "RCC framed structure with full-body vitrified tile flooring and premium teak wood main door.",
  },
  {
    id: 3,
    title: "Vishal's Virinchi",
    location: "Iyer Bungalow",
    type: "Luxury Apartments",
    area: "3 BHK",
    price: "Serene Living",
    tag: "Naganakulam",
    category: "Premium Villas",
    img: getImg("True waves/True waves Reality/vishal virinchi/1.png"),
    featured: true,
    wide: false,
    desc: "Signature curved contemporary facade design with rooftop access and premium finishes throughout.",
  },
  {
    id: 4,
    title: "Parivakkam",
    location: "Chennai Corridor",
    type: "Approved Plot",
    area: "1 Acre",
    price: "Upcoming",
    tag: "Pre-launch",
    category: "Commercial",
    img: getImg("True waves/True waves Reality/fairland/2.jpeg"),
    featured: false,
    wide: true,
    desc: "Chennai's next high-growth corridor. DTCP-approved, limited early-access slots. Infrastructure is expanding fast — early investors win maximum ROI.",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

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
    <div ref={containerRef} className="relative bg-background text-foreground min-h-screen overflow-x-hidden">
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
      <div className="sticky top-[64px] md:top-[88px] z-30 bg-background/90 backdrop-blur-md border-b border-border/50 py-4 px-6 overflow-hidden">
        <div className="container mx-auto relative">
          <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
            {["All", "Residential", "Commercial", "Agricultural", "Premium Villas"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
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

      {/* Featured Banner */}
      <section className="pt-24 pb-12 px-6 bg-background">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-24 reveal-text">
              Featured <span className="text-muted-foreground/30 font-light">Projects</span>
            </h2>
            <p className="text-muted-foreground font-light text-sm tracking-widest uppercase hidden md:block reveal-text">
              {filteredProjects.length} Properties
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetric Grid */}
      <section className="py-12 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {filteredProjects.map((p, i) => {
              const colSpan =
                i === 0 ? "lg:col-span-8" :
                  i === 1 ? "lg:col-span-4" :
                    i === 2 ? "lg:col-span-5" :
                      i === 3 ? "lg:col-span-7" :
                        i === 4 ? "lg:col-span-4" :
                          "lg:col-span-8";
              const mt = i === 1 ? "lg:mt-24" : i === 3 ? "lg:mt-16" : i === 5 ? "lg:-mt-16" : "";
              const aspect = i === 0 || i === 3 ? "aspect-[4/3]" : i === 1 || i === 4 ? "aspect-[3/4]" : "aspect-[3/2]";

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  key={p.id} 
                  className={`${colSpan} ${mt} group cursor-pointer reveal-card`}
                >
                  <div className={`relative overflow-hidden ${aspect} mb-6`}>
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
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-32 bg-[#0A1128] text-white text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter mb-10 reveal-text leading-tight">
            Don't See Your<br />Ideal Project?
          </h2>
          <p className="text-white/50 font-light text-xl mb-16 max-w-xl mx-auto reveal-text">
            We hold off-market inventory that never reaches the public. Speak with an advisor today.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            data-testid="button-projects-cta"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-[#0A1128] font-medium rounded-sm hover:scale-105 transition-transform duration-500 text-lg tracking-wide"
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