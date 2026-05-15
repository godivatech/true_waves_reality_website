import { Link } from "wouter";

interface MobileCtaProps {
  onContactClick?: () => void;
}

export default function MobileCta({ onContactClick }: MobileCtaProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0A1128] border-t border-white/10 p-4 z-40 flex gap-4">
      <Link href="/projects" className="flex-1">
        <button className="w-full bg-white text-[#0A1128] font-medium py-3 text-sm tracking-wide rounded-sm transition-transform active:scale-95">
          Explore Projects
        </button>
      </Link>
      <button 
        onClick={onContactClick}
        className="flex-1 bg-transparent border border-white/20 text-white font-medium py-3 text-sm tracking-wide rounded-sm transition-transform active:scale-95"
      >
        Contact Us
      </button>
    </div>
  );
}
