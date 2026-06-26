import { useState, useEffect } from "react";
import { Link, useRouter } from "wouter";
import ConsultationModal from "./ConsultationModal";

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname: locationPath, search } = useUrlLocation();
  const router = useRouter();
  const base = router.base || "";
  const relativeLocation = locationPath.startsWith(base)
    ? locationPath.slice(base.length) || "/"
    : locationPath;

  const isItemActive = (itemHref: string) => {
    const [itemPath, itemQuery] = itemHref.split("?");
    if (relativeLocation !== itemPath) return false;
    const itemFilter = new URLSearchParams(itemQuery).get("filter") || "All";
    const currentFilter = new URLSearchParams(search).get("filter") || "All";
    return itemFilter.toLowerCase() === currentFilter.toLowerCase();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [relativeLocation]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    {
      href: "/projects",
      label: "Projects",
      dropdownItems: [
        { href: "/projects?filter=All", label: "All Projects" },
        { href: "/projects?filter=Plots", label: "Plots" },
        { href: "/projects?filter=Residential", label: "Residential" },
        { href: "/projects?filter=Premium", label: "Premium" },
      ]
    },
    { href: "/why-us", label: "Why Us" },
    { href: "/invest", label: "Invest" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm ${
          scrolled ? "py-4 shadow-md" : "py-6"
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
                src="/assets/Color Logo.png"
                alt="True Waves Realty"
                className="w-32 md:w-44 h-auto object-contain scale-125 origin-left"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              if (link.dropdownItems) {
                return (
                  <div 
                    key={link.href} 
                    className="relative py-2"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className={`text-sm font-medium tracking-wide transition-colors duration-300 flex items-center gap-1.5 ${relativeLocation.startsWith(link.href)
                        ? "text-accent"
                        : "text-[#0A1128]/70 hover:text-[#0A1128]"
                        }`}
                      data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 opacity-70 ${dropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 transition-all duration-300 ease-out z-50 ${
                        dropdownOpen 
                          ? "opacity-100 translate-y-0 pointer-events-auto" 
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-sm p-3 shadow-xl flex flex-col gap-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className={`text-[11px] font-medium tracking-widest uppercase px-4 py-3 rounded-sm transition-all duration-300 flex items-center justify-between group/item ${
                              isItemActive(item.href)
                                ? "text-accent bg-slate-50"
                                : "text-[#0A1128]/70 hover:text-accent hover:bg-slate-50"
                            }`}
                          >
                            <span>{item.label}</span>
                            <svg
                              className={`w-3 h-3 transition-all duration-300 ${
                                isItemActive(item.href)
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                              }`}
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
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${relativeLocation === link.href
                    ? "text-accent"
                    : "text-[#0A1128]/70 hover:text-[#0A1128]"
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
            className="hidden md:block px-6 py-2.5 bg-[#0A1128] hover:bg-accent text-white transition-all duration-300 text-sm font-medium tracking-wide rounded-sm shadow-sm"
            data-testid="button-nav-cta"
          >
            Book Consultation
          </button>

          <button
            className="md:hidden text-[#0A1128] p-2"
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
        className={`fixed inset-0 z-40 bg-white flex flex-col justify-center items-center gap-6 overflow-y-auto py-24 transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {navLinks.map((link) => {
          if (link.dropdownItems) {
            return (
              <div key={link.href} className="flex flex-col items-center gap-3">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#0A1128] text-4xl font-light tracking-tight hover:text-accent transition-colors"
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
                      className={`text-sm tracking-widest uppercase transition-colors ${
                        isItemActive(item.href) ? "text-accent" : "text-[#0A1128]/50 hover:text-accent"
                      }`}
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
              className="text-[#0A1128] text-4xl font-light tracking-tight hover:text-accent transition-colors"
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
          className="mt-8 px-10 py-4 border border-[#0A1128]/20 text-[#0A1128] text-lg tracking-wide hover:bg-[#0A1128] hover:text-white transition-all duration-300 rounded-sm"
        >
          Book Consultation
        </button>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
