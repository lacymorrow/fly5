import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Meta } from '../components/Meta';
import VideoText from '../components/VideoText';
import { BigTitle, TextWrapper } from '../styles';
import config from '../utils/config';
import { generateRandom } from '../utils/utils';

const Index = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Runs on mount only
    setImageIndex(generateRandom(config.totalImages));

    // Fade in clipped image
    if (!active) {
      setTimeout(() => {
        setActive(true);
      }, 2500);
    }
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FLY5',
    url: config.siteUrl,
    logo: `${config.siteUrl}/apple-touch-icon.png`,
    description: config.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Charlotte',
      addressRegion: 'NC',
      addressCountry: 'US',
    },
    sameAs: [],
  };

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'FLY5 Aerial Cinematography Showreel',
    description:
      'Professional aerial drone cinematography showreel featuring stunning footage from FLY5, a Charlotte, NC-based aerial cinematography studio.',
    thumbnailUrl: `${config.siteUrl}/assets/images/shots/4.jpg`,
    uploadDate: '2024-01-01',
    contentUrl: `${config.siteUrl}/assets/videos/3.mp4`,
  };

  return (
    <div className="antialiased w-full min-h-screen px-1 py-16 text-center flex items-center flex-col">
      <Meta
        title="FLY5 — Aerial Cinematography Studio | Charlotte, NC"
        description="FLY5 is an aerial cinematography studio in Charlotte, NC. Professional drone footage for film, real estate, events, and commercial productions."
        ogImage={config.ogImage}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      </Head>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-2">
        Skip to main content
      </a>

      <main id="main-content" role="main">
        <TextWrapper className="hidden md:block">
          <VideoText
            text={config.title}
            poster="/assets/images/shots/4.jpg"
            src={[
              '/assets/videos/3.mp4',
              '/assets/videos/0.mp4',
              '/assets/videos/1.mp4',
              '/assets/videos/2.mp4',
              '/assets/videos/4.mp4',
            ]}
          />
        </TextWrapper>

        <BigTitle
          className="text-8xl sm:text-12xl md:hidden"
          active={active}
          src={`/assets/images/shots/${imageIndex}.jpg`}
          content={config.title}
        >
          {config.title}
        </BigTitle>

        <p className="font-bold text-2xl mb-8 lowercase">
          Aerial cinematography{' '}
          <span className="lowercase">with</span>{' '}
          <span className="font-extrabold text-white bg-gray-900 p-1 uppercase">
            Impact
          </span>
        </p>

        <p className="max-w-xl mx-auto text-lg text-gray-700 mb-8 px-4">
          We specialize in cinematic drone footage for film, real estate, events, and commercial projects across the Charlotte, NC area. From breathtaking aerials to precision close-ups, FLY5 delivers footage that elevates your story.
        </p>

        <Link href="/contact/">
          <a className="font-bold text-4xl border-4 border-gray-900 transition text-gray-900 hover:text-white hover:bg-gray-900 p-6">
            Interested?
          </a>
        </Link>

        <section className="max-w-2xl mx-auto mt-16 px-4 text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Aerial Cinematography Services</h2>
          <p className="text-lg text-gray-700 mb-4">
            FLY5 brings a cinematic eye to every aerial production. Our team of licensed drone pilots and cinematographers work with the latest equipment to capture footage that transforms how your audience sees your project.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Whether you are producing a film, showcasing a property, documenting a construction site, or capturing a special event, our aerial perspectives add a dimension that ground-based cameras simply cannot achieve.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Based in Charlotte, North Carolina, we serve clients throughout the Southeast and beyond. Every project receives our full creative attention, from pre-production planning through final delivery.
          </p>
        </section>
      </main>

      <footer className="mt-16 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} {config.title}. All rights reserved.</p>
        <nav aria-label="Footer navigation" className="mt-2">
          <Link href="/about/">
            <a className="text-gray-500 hover:text-gray-900 mx-2">About</a>
          </Link>
          <Link href="/contact/">
            <a className="text-gray-500 hover:text-gray-900 mx-2">Contact</a>
          </Link>
          <Link href="/privacy/">
            <a className="text-gray-500 hover:text-gray-900 mx-2">Privacy Policy</a>
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Index;
