import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import WhyUs from "@/pages/WhyUs";
import Invest from "@/pages/Invest";
import About from "@/pages/About";

const queryClient = new QueryClient();

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop({ lenis }: { lenis: Lenis | null }) {
  const [location] = useLocation();

  useEffect(() => {
    const performScroll = () => {
      if (lenis) {
        lenis.stop();
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      ScrollTrigger.refresh();
    };

    // Immediate attempt
    performScroll();

    // Secondary attempt to catch post-render layout shifts
    const timer = setTimeout(performScroll, 50);

    return () => clearTimeout(timer);
  }, [location, lenis]);

  return null;
}

function Router() {
  const [location] = useLocation();
  return (
    <Switch key={location}>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/why-us" component={WhyUs} />
      <Route path="/invest" component={Invest} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      instance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop lenis={lenis} />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
