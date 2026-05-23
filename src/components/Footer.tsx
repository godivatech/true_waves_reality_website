import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#0A1128] pt-24 pb-12 px-6 border-t border-white/5 text-white/50 text-sm font-light relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="col-span-1 md:col-span-5">
            <Link href="/">
              <div className="flex flex-col items-start mb-8 cursor-pointer group">
                <div className="mb-4 -mt-12">
                  <img
                    src="/assets/Logo.png"
                    alt="True Waves Realty Logo"
                    className="w-64 h-auto object-contain object-left-top origin-top-left scale-110"
                  />
                </div>
              </div>
            </Link>
            <p className="max-w-sm leading-relaxed text-base">
              Invest • Grow • Prosper.<br /><br />
              Curating high-growth land properties across Tamil Nadu for the sophisticated investor. Excellence in spatial wealth.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white font-medium tracking-widest uppercase text-xs mb-8">Navigate</h4>
            <ul className="space-y-5 text-base">
              <li><Link href="/about" className="hover:text-accent transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors cursor-pointer">Projects</Link></li>
              <li><Link href="/why-us" className="hover:text-accent transition-colors cursor-pointer">Why Us</Link></li>
              <li><Link href="/invest" className="hover:text-accent transition-colors cursor-pointer">Invest</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white font-medium tracking-widest uppercase text-xs mb-8">Legal</h4>
            <ul className="space-y-5 text-base">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">RERA Disclosures</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-white font-medium tracking-widest uppercase text-xs mb-8">Chennai Office</h4>
            <address className="not-italic text-base leading-relaxed text-white/50">
              17-13, Easwaran Koil Street,<br />
              Vellai thottam, West Mambalam,<br />
              Chennai - 600033
            </address>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="tracking-wide">© {new Date().getFullYear()} True Waves Realty. All rights reserved.</p>
            <p className="mt-2 tracking-wide text-xs">
              <span className="font-bold text-white/70">Designed and developed by </span>
              <a href="https://godivatech.com" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-accent transition-colors">godivatech</a>
            </p>
          </div>
          <div className="flex gap-8 tracking-wide">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
