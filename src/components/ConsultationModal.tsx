import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, User, MapPin } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct WhatsApp Message
    const whatsappNumber = "919876543210";
    const text = `*New Consultation Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Project:* ${formData.project || "General Inquiry"}%0A*Message:* ${formData.message || "I'd like to book a consultation."}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    // Simulate a brief delay for "premium" feel
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A1128]/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-primary border border-white/10 rounded-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">Book a Consultation</h3>
                <p className="text-white/50 text-sm mt-1">Our advisors will contact you shortly.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-5 h-5" />
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/40"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-5 h-5" />
                  <input
                    required
                    type="tel"
                    placeholder="Enter your number"
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Project of Interest (Optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="E.g. Fairland Township"
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/40"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  />
                </div>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full group relative px-10 py-5 bg-white text-primary font-semibold overflow-hidden rounded-sm transition-all hover:scale-[1.02] duration-500 disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide">
                  {isSubmitting ? "Redirecting..." : "Send via WhatsApp"}
                  {!isSubmitting && <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                </span>
                <div className="absolute inset-0 h-full w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-0" />
              </button>
              
              <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.1em]">
                By clicking, you agree to be contacted by True Waves Realty.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
