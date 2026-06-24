import { useEffect, useRef, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Check, 
  MapPin, 
  Maximize2, 
  Tag, 
  ShieldAlert, 
  HelpCircle,
  Building,
  DollarSign,
  Grid
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";
import MobileCta from "@/components/MobileCta";
import ConsultationModal from "@/components/ConsultationModal";
import { projects, Project } from "@/data/projects";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:slug");
  const [, navigate] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<{ title: string; images: string[] } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slug = params?.slug;
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium tracking-tight mb-4">Project Not Found</h1>
        <button onClick={() => navigate("/projects")} className="px-6 py-3 bg-[#0A1128] text-white rounded-sm">
          Back to Projects
        </button>
      </div>
    );
  }

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappNumber = "919876543210";
    const messageBody = `*Enquiry for ${project.title}*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Message:* ${formData.message || `I am interested in learning more about ${project.title}.`}`;

    const text = encodeURIComponent(messageBody);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setFormData({ name: "", phone: "", message: "" });
    }, 800);
  };

  const openLightbox = (index: number) => {
    if (project.gallery && project.gallery.length > 0) {
      setSelectedGallery({ title: project.title, images: project.gallery });
      setCurrentImageIndex(index);
    }
  };

  return (
    <div ref={containerRef} className="relative bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Project Hero */}
      <section className="relative h-[65vh] flex items-end pb-20 overflow-hidden bg-[#0A1128]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/50 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-6">
          <button 
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 text-xs tracking-widest uppercase font-semibold mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Projects
          </button>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-accent/20 border border-accent/30 text-accent text-[10px] tracking-widest uppercase font-medium rounded-full">
              {project.category}
            </span>
            {project.tag && (
              <span className="px-3 py-1 bg-white/10 text-white/80 text-[10px] tracking-widest uppercase font-medium rounded-full">
                {project.tag}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-7xl font-semibold text-white tracking-tighter leading-none mb-4">
            {project.title}
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light tracking-wide flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            {project.location}
          </p>
        </div>
      </section>

      {/* Project Overview Content */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Detailed Description */}
              <div className="space-y-6">
                <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Overview</h2>
                <div className="text-lg md:text-xl font-light leading-relaxed text-foreground/80 whitespace-pre-line">
                  {project.detailedDesc || project.desc}
                </div>
              </div>

              {/* Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Project Showcase</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery.map((media, idx) => (
                      <div 
                        key={idx}
                        onClick={() => openLightbox(idx)}
                        className="relative overflow-hidden aspect-[4/3] rounded-sm group cursor-pointer border border-border/40"
                      >
                        {media.endsWith('.mp4') ? (
                          <div className="relative w-full h-full">
                            <video src={media} muted className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <span className="text-white font-medium text-xs tracking-widest uppercase bg-primary/80 px-3 py-1 rounded-sm">Play Video</span>
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={media} 
                            alt={`${project.title} Gallery ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                          />
                        )}
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Differentiators (Why Choose) */}
              {project.whyChoose && project.whyChoose.length > 0 && (
                <div className="space-y-8 pt-4">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Why Choose This Project</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.whyChoose.map((item, idx) => (
                      <div key={idx} className="reveal-card border border-border/60 p-6 rounded-sm bg-slate-50/50 hover:bg-white hover:border-accent transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <h3 className="text-xl font-medium tracking-tight mb-2">{item.title}</h3>
                        <p className="text-foreground/70 font-light leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-8 pt-4">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Key Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-sm bg-slate-50/30 border border-border/40">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                        <span className="text-base text-foreground/80 font-light">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phases Specification (If Available) */}
              {project.phases && project.phases.length > 0 && (
                <div className="space-y-8 pt-4">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Project Layout & Phases</h2>
                  <div className="overflow-x-auto border border-border/60 rounded-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-xs tracking-widest uppercase text-muted-foreground border-b border-border/60">
                          <th className="p-4 font-semibold">Phase</th>
                          <th className="p-4 font-semibold">Total Plots</th>
                          <th className="p-4 font-semibold">Available Plots</th>
                          <th className="p-4 font-semibold">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {project.phases.map((phase, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/30 transition-colors text-sm">
                            <td className="p-4 font-medium">{phase.name}</td>
                            <td className="p-4 text-foreground/80 font-light">{phase.total}</td>
                            <td className="p-4 text-foreground/80 font-light">
                              {phase.available === 0 ? (
                                <span className="text-red-500 font-medium">Sold Out</span>
                              ) : (
                                <span className="text-emerald-700 font-semibold">{phase.available}</span>
                              )}
                            </td>
                            <td className="p-4 text-muted-foreground font-light text-xs">{phase.detail || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Pricing Grid (If Available) */}
              {project.pricing && (
                <div className="space-y-8 pt-4">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Pricing & Sizes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.pricing.rate && (
                      <div className="border border-border/60 p-6 rounded-sm bg-slate-50/50">
                        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Square Feet Rate</p>
                        <h4 className="text-2xl font-semibold text-[#0A1128]">{project.pricing.rate}</h4>
                      </div>
                    )}
                    {project.pricing.centPrice && (
                      <div className="border border-border/60 p-6 rounded-sm bg-slate-50/50">
                        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Cent Pricing</p>
                        <h4 className="text-2xl font-semibold text-[#0A1128]">{project.pricing.centPrice}</h4>
                      </div>
                    )}
                    {project.pricing.advance && (
                      <div className="border border-border/60 p-6 rounded-sm bg-slate-50/50">
                        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Booking Advance</p>
                        <h4 className="text-2xl font-semibold text-accent">{project.pricing.advance}</h4>
                      </div>
                    )}
                  </div>
                  {project.pricing.startingSize && (
                    <div className="p-5 border border-border/60 bg-slate-50/30 rounded-sm">
                      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">Starting Plot Size & Dimension</p>
                      <p className="text-base text-foreground/80 font-light">{project.pricing.startingSize}</p>
                    </div>
                  )}
                  {project.pricing.details && project.pricing.details.length > 0 && (
                    <div className="p-5 border border-red-100/30 bg-red-50/10 rounded-sm">
                      <p className="text-xs text-red-700/70 tracking-widest uppercase mb-2 font-medium">Important payment conditions</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/70 font-light">
                        {project.pricing.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Plan (If Available) */}
              {project.paymentPlan && (
                <div className="space-y-6 pt-4">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Payment & Bank Loan Plans</h2>
                  <div className="p-6 border border-border/60 rounded-sm bg-slate-50/30 leading-relaxed font-light text-foreground/80">
                    {project.paymentPlan}
                  </div>
                </div>
              )}

              {/* Location Advantages */}
              {project.locationAdvantages && project.locationAdvantages.length > 0 && (
                <div className="space-y-8 pt-4">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Location Advantages</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.locationAdvantages.map((adv, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 rounded-sm border border-border/40 bg-white">
                        <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium tracking-tight">{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Accordion */}
              {project.faqs && project.faqs.length > 0 && (
                <div className="space-y-8 pt-4">
                  <h2 className="text-2xl tracking-[0.1em] uppercase font-semibold text-foreground/50">Frequently Asked Questions</h2>
                  <div className="border border-border/60 rounded-sm divide-y divide-border/60">
                    {project.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full p-6 flex justify-between items-center text-left hover:bg-slate-50/30 transition-colors"
                        >
                          <span className="font-semibold tracking-tight text-base md:text-lg">{faq.q}</span>
                          <span className="text-accent text-xl font-light shrink-0 ml-4">
                            {activeFaq === idx ? "−" : "+"}
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 border-t border-border/40 text-foreground/70 font-light text-sm md:text-base leading-relaxed bg-slate-50/30">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Enquiry Form & Info */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quick Info Box */}
              <div className="border border-border/60 rounded-sm p-6 bg-slate-50/50 space-y-4">
                <h3 className="text-lg font-semibold tracking-tight pb-3 border-b border-border/60">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">Project Type</span>
                    <span className="font-semibold flex items-center gap-2">
                      {project.type.includes("(Upcoming)") ? (
                        <>
                          <span>{project.type.replace("(Upcoming)", "").trim()}</span>
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-white rounded-sm select-none shadow-sm">
                            Upcoming
                          </span>
                        </>
                      ) : project.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">Total Area</span>
                    <span className="font-semibold">{project.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">Status</span>
                    <span className="font-semibold text-accent">{project.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">Location</span>
                    <span className="font-semibold">{project.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Enquiry Form */}
              <div className="lg:sticky lg:top-44 border border-border/60 rounded-sm p-6 bg-white shadow-sm space-y-6 lg:max-h-[calc(100vh-210px)] lg:overflow-y-auto custom-scrollbar">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Submit Enquiry</h3>
                  <p className="text-xs text-muted-foreground mt-1">Get in touch directly with our representative via WhatsApp.</p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name" 
                      className="w-full p-3 text-sm bg-slate-50 border border-border/60 rounded-sm focus:outline-none focus:border-accent transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="Enter your mobile number" 
                      className="w-full p-3 text-sm bg-slate-50 border border-border/60 rounded-sm focus:outline-none focus:border-accent transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                    <textarea 
                      rows={4}
                      placeholder={`I am interested in ${project.title}. Please share layout plans and details.`}
                      className="w-full p-3 text-sm bg-slate-50 border border-border/60 rounded-sm focus:outline-none focus:border-accent transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative px-6 py-4 bg-[#0A1128] text-white font-semibold overflow-hidden rounded-sm transition-all hover:scale-[1.02] duration-500 text-center cursor-pointer text-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? "Sending..." : "Enquire on WhatsApp"}
                      {!isSubmitting && <Send size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                    </span>
                    <div className="absolute inset-0 h-full w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-0" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Lightbox / Cinematic Gallery Modal */}
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
                  Item {currentImageIndex + 1} of {selectedGallery.images.length}
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
                    src={selectedGallery.images[currentImageIndex]}
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
                      <img src={img} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppBtn />
      <MobileCta onContactClick={() => setIsModalOpen(true)} />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
