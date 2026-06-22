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
    { href: "/about", label: "About Us" },
    {
      href: "/projects",
      label: "Projects",
      dropdownItems: [
        { href: "/projects?filter=All", label: "All Projects" },
        { href: "/projects?filter=Residential", label: "Residential" },
        { href: "/projects?filter=Commercial", label: "Commercial" },
        { href: "/projects?filter=Premium Villas", label: "Premium Villas" },
      ]
    },
    { href: "/why-us", label: "Why Us" },
    { href: "/invest", label: "Invest" },
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
            {navLinks.map((link) => {
              if (link.dropdownItems) {
                return (
                  <div key={link.href} className="relative group py-2">
                    <Link
                      href={link.href}
                      className={`text-sm font-medium tracking-wide transition-colors duration-300 flex items-center gap-1.5 ${location.startsWith(link.href)
                        ? "text-accent"
                        : "text-white/80 hover:text-white"
                        }`}
                      data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                      <div className="bg-[#0A1128]/95 backdrop-blur-lg border border-white/10 rounded-sm p-3 shadow-2xl flex flex-col gap-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-[11px] font-medium tracking-widest uppercase text-white/70 hover:text-accent hover:bg-white/5 px-4 py-3 rounded-sm transition-all duration-300 flex items-center justify-between group/item"
                          >
                            <span>{item.label}</span>
                            <svg
                              className="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${location === link.href
                    ? "text-accent"
                    : "text-white/80 hover:text-white"
                    }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Link>
              );
            })}
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
        className={`fixed inset-0 z-40 bg-[#0A1128] flex flex-col justify-center items-center gap-6 overflow-y-auto py-24 transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {navLinks.map((link) => {
          if (link.dropdownItems) {
            return (
              <div key={link.href} className="flex flex-col items-center gap-3">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-4xl font-light tracking-tight hover:text-accent transition-colors"
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Link>
                <div className="flex flex-col items-center gap-2.5">
                  {link.dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-white/50 hover:text-accent text-sm tracking-widest uppercase transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-4xl font-light tracking-tight hover:text-accent transition-colors"
              data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              {link.label}
            </Link>
          );
        })}
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
