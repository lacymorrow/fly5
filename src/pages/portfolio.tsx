import { useCallback, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import CategoryFilter from '../components/CategoryFilter';
import FeaturedProject from '../components/FeaturedProject';
import { Meta } from '../components/Meta';
import ProjectCard from '../components/ProjectCard';
import ProjectLightbox from '../components/ProjectLightbox';
import { Project, ProjectCategory, projects } from '../data/projects';
import config from '../utils/config';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  const handleCloseLightbox = useCallback(() => setLightboxProject(null), []);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const nonFeatured = filtered.filter((p) => !p.featured);
  const featured = filtered.filter((p) => p.featured);

  const gridItems: (Project | { type: 'featured'; project: Project })[] = [];
  let featuredIdx = 0;
  nonFeatured.forEach((project, i) => {
    gridItems.push(project);
    const feat = featured[featuredIdx];
    if ((i + 1) % 4 === 0 && feat) {
      gridItems.push({ type: 'featured', project: feat });
      featuredIdx += 1;
    }
  });
  while (featuredIdx < featured.length) {
    const feat = featured[featuredIdx];
    if (feat) {
      gridItems.push({ type: 'featured', project: feat });
    }
    featuredIdx += 1;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'FLY5 Aerial Cinematography Portfolio',
    description: 'Professional aerial drone cinematography projects by FLY5 in Charlotte, NC.',
    url: `${config.siteUrl}/portfolio`,
    provider: {
      '@type': 'Organization',
      name: 'FLY5',
      url: config.siteUrl,
    },
  };

  return (
    <div className="bg-black min-h-screen">
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

      <a href="#portfolio-grid" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-2">
        Skip to portfolio
      </a>

      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster="/assets/images/shots/4.jpg"
          >
            <source src="/assets/videos/3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-white mb-4 tracking-tight">
            OUR WORK
          </h1>
          <p className="text-lg text-gray-400 uppercase tracking-widest">
            Aerial Cinematography Portfolio
          </p>
        </div>

        <div className="absolute bottom-8 z-10 animate-bounce" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Filter */}
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {/* Grid */}
      <main id="portfolio-grid" className="pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {gridItems.map((item) => {
            if ('type' in item && item.type === 'featured') {
              return (
                <div key={`featured-${item.project.id}`} className="col-span-1 sm:col-span-2">
                  <FeaturedProject
                    project={item.project}
                    onClick={() => setLightboxProject(item.project)}
                  />
                </div>
              );
            }

            const project = item as Project;
            const idx = nonFeatured.indexOf(project);
            const tall = idx % 3 === 0;

            return (
              <div key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={() => setLightboxProject(project)}
                  tall={tall}
                />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-24 text-lg">
            No projects in this category yet.
          </p>
        )}
      </main>

      {/* CTA */}
      <section className="py-24 text-center border-t border-gray-800">
        <p className="text-2xl sm:text-3xl text-gray-500 italic mb-8 px-4">
          &ldquo;Every story looks different from above.&rdquo;
        </p>
        <Link href="/contact/">
          <a className="font-bold text-3xl border-4 border-white text-white hover:bg-white hover:text-black transition p-6 inline-block">
            Start Your Project
          </a>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-600 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} {config.title}. All rights reserved.</p>
        <nav aria-label="Footer navigation" className="mt-2">
          <Link href="/">
            <a className="text-gray-600 hover:text-gray-400 mx-2">Home</a>
          </Link>
          <Link href="/about/">
            <a className="text-gray-600 hover:text-gray-400 mx-2">About</a>
          </Link>
          <Link href="/contact/">
            <a className="text-gray-600 hover:text-gray-400 mx-2">Contact</a>
          </Link>
          <Link href="/privacy/">
            <a className="text-gray-600 hover:text-gray-400 mx-2">Privacy</a>
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
