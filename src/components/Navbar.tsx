import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ConsultationModal from "./ConsultationModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/why-us", label: "Why Us" },
    { href: "/invest", label: "Invest" },
    { href: "/about", label: "About" },
  ];

  const transparent = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${transparent
          ? "bg-transparent py-10"
          : "bg-[#0A1128]/95 backdrop-blur-lg py-7 border-b border-white/10"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 z-10 relative"
            data-testid="link-logo"
          >
            <div className="z-10 relative">
              <img
                src="/assets/Logo.png"
                alt="True Waves Realty"
                className="w-24 md:w-32 h-auto object-contain scale-125 origin-left"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${location === href
                  ? "text-accent"
                  : "text-white/80 hover:text-white"
                  }`}
                data-testid={`link-nav-${label.toLowerCase().replace(" ", "-")}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:block px-6 py-2 bg-white/10 hover:bg-white text-white hover:text-[#0A1128] backdrop-blur-sm border border-white/20 transition-all duration-300 text-sm font-medium tracking-wide rounded-sm"
            data-testid="button-nav-cta"
          >
            Book Consultation
          </button>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A1128] flex flex-col justify-center items-center gap-10 transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-white text-5xl font-light tracking-tight hover:text-accent transition-colors"
            data-testid={`link-mobile-nav-${label.toLowerCase().replace(" ", "-")}`}
          >
            {label}
          </Link>
        ))}
        <button
          onClick={() => {
            setMenuOpen(false);
            setIsModalOpen(true);
          }}
          className="mt-8 px-10 py-4 border border-white/30 text-white text-lg tracking-wide hover:bg-white hover:text-[#0A1128] transition-all duration-300 rounded-sm"
        >
          Book Consultation
        </button>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
