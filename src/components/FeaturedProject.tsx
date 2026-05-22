import { useEffect, useRef } from 'react';

import { Project } from '../data/projects';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface FeaturedProjectProps {
  project: Project;
  onClick: () => void;
  number: number;
  reverse?: boolean;
}

const FeaturedProject = ({
  project,
  onClick,
  number,
  reverse = false,
}: FeaturedProjectProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: inViewRef, isInView } = useInView(0.2);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={inViewRef} className={`reveal ${isInView ? 'visible' : ''}`}>
      <div
        className="relative w-full overflow-hidden cursor-pointer group"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View featured project: ${project.title}`}
      >
        <div
          className={`flex flex-col ${
            reverse ? 'md:flex-row-reverse' : 'md:flex-row'
          } min-h-[50vh] md:min-h-[70vh]`}
        >
          <div className="relative w-full md:w-3/5 h-[40vh] md:h-auto overflow-hidden">
            {project.video !== undefined ? (
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                poster={`/assets/images/shots/${project.images[0]}.jpg`}
              >
                <source
                  src={`/assets/videos/${project.video}.mp4`}
                  type="video/mp4"
                />
              </video>
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(/assets/images/shots/${project.images[0]}.jpg)`,
                }}
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-500" />
          </div>

          <div className="w-full md:w-2/5 bg-black flex items-center p-8 sm:p-12 md:p-16">
            <div className="max-w-md">
              <span
                className="text-7xl sm:text-8xl font-thin text-white text-opacity-10 block leading-none mb-6"
                aria-hidden="true"
              >
                {String(number).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-widest text-gray-500 block mb-4">
                Featured &mdash; {project.category.replace(/-/g, ' ')}
              </span>
              <div
                className={`h-px bg-white bg-opacity-20 mb-6 line-reveal ${
                  isInView ? 'visible' : ''
                }`}
                style={
                  reducedMotion ? undefined : { animationDelay: '0.3s' }
                }
                aria-hidden="true"
              />
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                {project.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300">
                View Project
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
