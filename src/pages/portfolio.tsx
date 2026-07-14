import { useCallback, useEffect, useRef, useState } from "react";

import Head from "next/head";
import Link from "next/link";

import CategoryFilter from "../components/CategoryFilter";
import FeaturedProject from "../components/FeaturedProject";
import { Meta } from "../components/Meta";
import ProjectCard from "../components/ProjectCard";
import ProjectLightbox from "../components/ProjectLightbox";
import { Project, ProjectCategory, projects } from "../data/projects";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import config from "../utils/config";

const getCardClasses = (cardIndex: number): string => {
  const pairIndex = Math.floor(cardIndex / 2);
  const isFirst = cardIndex % 2 === 0;
  if (isFirst) {
    return pairIndex % 2 === 0
      ? "col-span-12 sm:col-span-7"
      : "col-span-12 sm:col-span-5";
  }
  return pairIndex % 2 === 0
    ? "col-span-12 sm:col-span-5"
    : "col-span-12 sm:col-span-7";
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
    "all"
  );
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const { ref: ctaRef, isInView: ctaInView } = useInView(0.2);

  const handleCloseLightbox = useCallback(() => setLightboxProject(null), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroVideoRef.current) {
            heroVideoRef.current.style.transform = `translateY(${
              window.scrollY * 0.3
            }px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featured = filtered.filter((p) => p.featured);
  const standard = filtered.filter((p) => !p.featured);

  type LayoutItem =
    | { type: "card"; project: Project; cardIndex: number }
    | {
        type: "featured";
        project: Project;
        number: number;
        reverse: boolean;
      };

  const layoutItems: LayoutItem[] = [];
  let featuredIdx = 0;
  let cardCount = 0;

  standard.forEach((project, i) => {
    layoutItems.push({ type: "card", project, cardIndex: cardCount });
    cardCount += 1;

    if ((i + 1) % 2 === 0 && featuredIdx < featured.length) {
      const feat = featured[featuredIdx];
      if (feat) {
        layoutItems.push({
          type: "featured",
          project: feat,
          number: featuredIdx + 1,
          reverse: featuredIdx % 2 !== 0,
        });
      }
      featuredIdx += 1;
    }
  });

  while (featuredIdx < featured.length) {
    const feat = featured[featuredIdx];
    if (feat) {
      layoutItems.push({
        type: "featured",
        project: feat,
        number: featuredIdx + 1,
        reverse: featuredIdx % 2 !== 0,
      });
    }
    featuredIdx += 1;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "FLY5 Aerial Cinematography Portfolio",
    description:
      "Professional aerial drone cinematography projects by FLY5 in Charlotte, NC.",
    url: `${config.siteUrl}/portfolio`,
    provider: {
      "@type": "Organization",
      name: "FLY5",
      url: config.siteUrl,
    },
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Meta
        title="Portfolio — FLY5 Aerial Cinematography | Charlotte, NC"
        description="View aerial cinematography projects by FLY5. Professional drone footage for film, real estate, events, and commercial productions in Charlotte, NC."
        ogImage={config.ogImage}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <a
        href="#portfolio-grid"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-2 focus:rounded"
      >
        Skip to portfolio
      </a>
      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute top-0 left-0 w-full h-[130%] object-cover"
            poster="/assets/images/shots/4.jpg"
          >
            <source src="/assets/videos/3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
        </div>

        <div className="relative z-10 text-center px-4">
          <p
            className={`text-xs sm:text-sm uppercase tracking-widest text-gray-400 mb-6 reveal ${
              mounted ? "visible" : ""
            } reveal-delay-1`}
          >
            Aerial Cinematography
          </p>
          <h1
            className={`text-6xl sm:text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-none reveal ${
              mounted ? "visible" : ""
            } reveal-delay-2`}
          >
            OUR
            <br />
            WORK
          </h1>
          <div
            className={`w-16 h-px bg-white bg-opacity-30 mx-auto mb-6 line-reveal ${
              mounted ? "visible" : ""
            }`}
            style={reducedMotion ? undefined : { animationDelay: "0.4s" }}
            aria-hidden="true"
          />
          <p
            className={`text-sm text-gray-500 uppercase tracking-widest reveal ${
              mounted ? "visible" : ""
            } reveal-delay-4`}
          >
            Charlotte, NC
          </p>
        </div>

        <div className="absolute bottom-12 z-10" aria-hidden="true">
          <div className="scroll-indicator" />
        </div>
      </section>
      {/* Filter */}
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      {/* Grid */}
      <main id="portfolio-grid" className="pb-16">
        <div className="grid grid-cols-12 gap-0 sm:gap-1">
          {layoutItems.map((item) => {
            if (item.type === "featured") {
              return (
                <div
                  key={`featured-${item.project.id}`}
                  className="col-span-12"
                >
                  <FeaturedProject
                    project={item.project}
                    onClick={() => setLightboxProject(item.project)}
                    number={item.number}
                    reverse={item.reverse}
                  />
                </div>
              );
            }

            return (
              <div
                key={item.project.id}
                className={getCardClasses(item.cardIndex)}
              >
                <ProjectCard
                  project={item.project}
                  onClick={() => setLightboxProject(item.project)}
                  index={item.cardIndex}
                />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-600 py-24 text-lg">
            No projects in this category yet.
          </p>
        )}
      </main>
      {/* CTA */}
      <section
        ref={ctaRef}
        className={`py-24 sm:py-32 text-center border-t border-gray-800 border-opacity-50 reveal ${
          ctaInView ? "visible" : ""
        }`}
      >
        <p className="text-xl sm:text-3xl md:text-4xl text-gray-600 italic mb-10 px-6 sm:px-8 max-w-2xl mx-auto font-light leading-relaxed">
          &ldquo;Every story looks different from above.&rdquo;
        </p>
        <Link
          href="/contact/"
          className="inline-block font-bold text-base sm:text-xl border border-white border-opacity-30 text-white px-8 py-4 sm:px-10 sm:py-5 uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black hover:border-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
        >
          Start Your Project
        </Link>
      </section>
      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-600 border-t border-gray-800 border-opacity-50">
        <p>
          &copy; {new Date().getFullYear()} {config.title}. All rights reserved.
        </p>
        <nav
          aria-label="Footer navigation"
          className="mt-3 flex justify-center gap-6"
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/about/"
            className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact/"
            className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            href="/privacy/"
            className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
          >
            Privacy
          </Link>
        </nav>
      </footer>
      {/* Lightbox */}
      {lightboxProject && (
        <ProjectLightbox
          project={lightboxProject}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  );
};

export default Portfolio;
