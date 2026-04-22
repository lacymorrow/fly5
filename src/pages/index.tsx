import { useEffect, useState } from 'react';

import Link from 'next/link';
import Script from 'next/script';

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
        title="FLY5 — Professional Aerial Cinematography Studio in Charlotte, NC"
        description="FLY5 is a professional aerial cinematography studio based in Charlotte, NC. We capture stunning drone footage for film, real estate, events, and commercial productions."
        ogImage={config.ogImage}
      />
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-2">
        Skip to main content
      </a>

      <main id="main-content" role="main">
        <h1 className="sr-only">FLY5 — Aerial Cinematography with Impact</h1>

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

        <p className="max-w-xl mx-auto text-lg text-gray-700 mb-12 px-4">
          We specialize in cinematic drone footage for film, real estate, events, and commercial projects across the Charlotte, NC area. From breathtaking aerials to precision close-ups, FLY5 delivers footage that elevates your story.
        </p>

        <Link href="/contact/">
          <a className="font-bold text-4xl border-4 border-gray-900 transition text-gray-900 hover:text-white hover:bg-gray-900 p-6">
            Interested?
          </a>
        </Link>
      </main>
    </div>
  );
};

export default Index;
