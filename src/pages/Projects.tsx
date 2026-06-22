import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import MobileCta from "@/components/MobileCta";
import ConsultationModal from "@/components/ConsultationModal";
import heroImg from "@/assets/images/hero-aerial.png";

import { useLocation } from "wouter";

const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL || "https://ik.imagekit.io/15s95izzpx";

const getImg = (path: string, transform?: string) => {
  const baseUrl = `${IMAGEKIT_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const encodedUrl = encodeURI(baseUrl);
  return transform ? `${encodedUrl}?tr=${transform}` : encodedUrl;
};


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
    gallery: [
      getImg("True waves/True waves Reality/fairland/1.jpeg"),
      getImg("True waves/True waves Reality/fairland/2.jpeg"),
      getImg("True waves/True waves Reality/fairland/3.jpeg"),
      getImg("True waves/True waves Reality/fairland/4.jpeg"),
      getImg("True waves/True waves Reality/fairland/5.jpeg"),
      getImg("True waves/True waves Reality/fairland/6.JPG"),
      getImg("True waves/True waves Reality/fairland/7.JPG"),
      getImg("True waves/True waves Reality/fairland/8.JPG"),
      getImg("True waves/True waves Reality/fairland/9.JPG"),
      getImg("True waves/True waves Reality/fairland/10.JPG"),
    ]
  },
  {
    id: 2,
    title: "Alagar Homes",
    location: "Nethaji Main Road",
    type: "Residential Apartments",
    area: "1, 2 & 2.5 BHK",
    price: "Premium Living",
    tag: "BB Kulam",
    category: "Residential",
    img: "/assets/images/other images/Alagar Homes.png",
    featured: false,
    wide: false,
    desc: "RCC framed structure with full-body vitrified tile flooring and premium teak wood main door.",
    gallery: [
      getImg("True waves/True waves Reality/alagar homes/1.mp4"),
    ]
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
    img: "/assets/images/other images/vishal virinchi main.png",
    featured: true,
    wide: false,
    desc: "Signature curved contemporary facade design with rooftop access and premium finishes throughout.",
    gallery: [
      "/assets/images/other images/vishal virinchi main.png",
      getImg("True waves/True waves Reality/vishal virinchi/2.png"),
      getImg("True waves/True waves Reality/vishal virinchi/3.png"),
      getImg("True waves/True waves Reality/vishal virinchi/4.png"),
      getImg("True waves/True waves Reality/vishal virinchi/5.png"),
      getImg("True waves/True waves Reality/vishal virinchi/6.png"),
      getImg("True waves/True waves Reality/vishal virinchi/7.png"),
    ]
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
  const [selectedGallery, setSelectedGallery] = useState<{title: string, images: string[]} | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get("filter");
    if (filterParam) {
      const decodedFilter = decodeURIComponent(filterParam);
      if (["All", "Residential", "Commercial", "Agricultural", "Premium Villas"].includes(decodedFilter)) {
        setActiveFilter(decodedFilter);
      }
    } else {
      setActiveFilter("All");
    }
  }, [location]);

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

      {/* Grid */}
      <section className="py-12 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredProjects.map((p) => {
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  key={p.id} 
                  className="group cursor-pointer reveal-card"
                  onClick={() => {
                    if (p.gallery) {
                      setSelectedGallery({ title: p.title, images: p.gallery });
                      setCurrentImageIndex(0);
                    }
                  }}
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
                    
                    {p.gallery && (
                      <div className="absolute bottom-5 right-5 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <Maximize2 size={20} />
                      </div>
                    )}

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

      {/* Cinematic Gallery Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-2xl"
          >
            {/* Gallery Header */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-10">
              <div>
                <h4 className="text-white text-xl md:text-2xl font-medium tracking-tight">{selectedGallery.title}</h4>
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2">
                  Image {currentImageIndex + 1} of {selectedGallery.images.length}
                </p>
              </div>
              <button 
                onClick={() => setSelectedGallery(null)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {selectedGallery.images[currentImageIndex].endsWith('.mp4') ? (
                  <motion.video
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    src={selectedGallery.images[currentImageIndex]}
                    autoPlay
                    controls
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    src={selectedGallery.images[currentImageIndex].startsWith('/') 
                      ? selectedGallery.images[currentImageIndex] 
                      : `${selectedGallery.images[currentImageIndex]}?tr=w-1600`}
                    className="w-full h-full object-contain"
                  />
                )}
              </AnimatePresence>

              {/* Navigation Arrows */}
              {selectedGallery.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? selectedGallery.images.length - 1 : prev - 1))}
                    className="absolute left-4 md:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === selectedGallery.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 md:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip */}
            {selectedGallery.images.length > 1 && (
              <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3 px-6 overflow-x-auto no-scrollbar">
                {selectedGallery.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 aspect-video overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                      idx === currentImageIndex ? 'border-white scale-110' : 'border-transparent bg-white/10 backdrop-blur-sm opacity-40 hover:opacity-100'
                    }`}
                  >
                    {img.endsWith('.mp4') ? (
                      <video src={img} muted className="w-full h-full object-cover" />
                    ) : (
                      <img src={img.startsWith('/') ? img : `${img}?tr=w-200,h-150,fo-auto`} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}