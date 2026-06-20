import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, User, MapPin, IndianRupee } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatBudget = (value: number) => {
  if (value >= 100) {
    const cr = value / 100;
    return `₹${cr.toFixed(1)} Cr${value === 300 ? '+' : ''}`;
  }
  return `₹${value} Lakhs`;
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: "",
    preferredLocation: "",
    budget: 50,
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
    const budgetText = formatBudget(formData.budget);
    
    const messageBody = `*New Consultation Request*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Preferred Location:* ${formData.preferredLocation || "Not specified"}
*Budget:* ${budgetText}
*Project:* ${formData.project || "General Inquiry"}
*Message:* ${formData.message || "I'd like to book a consultation."}`;

    const text = encodeURIComponent(messageBody);
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
            className="relative w-full max-w-lg bg-primary border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 sm:p-8 border-b border-white/5 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">Book a Consultation</h3>
                <p className="text-white/50 text-xs sm:text-sm mt-1">Our advisors will contact you shortly.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/60">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/40"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/60">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    required
                    type="tel"
                    placeholder="Enter your number"
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/60">Preferred Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-3 sm:py-4 pl-12 pr-10 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                  >
                    <option value="" disabled className="bg-primary text-white/40">Select location</option>
                    <option value="Chennai" className="bg-primary text-white">Chennai</option>
                    <option value="Madurai" className="bg-primary text-white">Madurai</option>
                    <option value="Trichy" className="bg-primary text-white">Trichy</option>
                    <option value="Coimbatore" className="bg-primary text-white">Coimbatore</option>
                    <option value="Other" className="bg-primary text-white">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/60">Budget Range</label>
                  <span className="text-xs sm:text-sm font-semibold text-accent">{formatBudget(formData.budget)}</span>
                </div>
                <div className="relative flex items-center mt-1 sm:mt-2 bg-white/5 border border-white/10 rounded-sm py-3 sm:py-4 pl-12 pr-4">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  />
                </div>
                <div className="flex justify-between text-[9px] sm:text-[10px] text-white/40 px-1 mt-1">
                  <span>₹10 Lakhs</span>
                  <span>₹3 Cr+</span>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/60">Project of Interest (Optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="E.g. Fairland Township"
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/40"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  />
                </div>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full group relative px-10 py-4 sm:py-5 bg-white text-primary font-semibold overflow-hidden rounded-sm transition-all hover:scale-[1.02] duration-500 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide">
                  {isSubmitting ? "Redirecting..." : "Send via WhatsApp"}
                  {!isSubmitting && <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                </span>
                <div className="absolute inset-0 h-full w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-0" />
              </button>
              
              <p className="text-center text-[9px] sm:text-[10px] text-white/30 uppercase tracking-[0.1em]">
                By clicking, you agree to be contacted by True Waves Realty.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
