import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Project } from '../data/projects';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const ProjectCard = ({ project, onClick, index }: ProjectCardProps) => {
  const { ref: inViewRef, isInView } = useInView(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || project.video === undefined) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, project.video]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const primaryImage = project.images[0] ?? 0;

  return (
    <div
      ref={inViewRef}
      className={`reveal ${isInView ? 'visible' : ''}`}
      style={{
        transitionDelay: reducedMotion ? '0s' : `${(index % 4) * 0.1}s`,
      }}
    >
      <button
        ref={cardRef}
        type="button"
        className="group relative w-full h-[350px] sm:h-[500px] overflow-hidden cursor-pointer block focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={`View project: ${project.title}`}
        style={{
          transform: reducedMotion
            ? 'none'
            : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-out ${
            hovered ? 'scale-105' : 'scale-100'
          }`}
        >
          <Image
            src={`/assets/images/shots/${primaryImage}.jpg`}
            alt={`${project.title} — aerial cinematography by FLY5`}
            layout="fill"
            objectFit="cover"
            priority={index < 2}
          />
        </div>

        {project.video !== undefined && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src={`/assets/videos/${project.video}.mp4`}
              type="video/mp4"
            />
          </video>
        )}

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            hovered
              ? 'bg-gradient-to-t from-black via-black to-transparent opacity-80'
              : 'bg-gradient-to-t from-black via-transparent to-transparent opacity-50'
          }`}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <span
            className={`text-xs uppercase tracking-widest text-gray-400 mb-2 block transition-all duration-300 ${
              hovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            {project.category.replace(/-/g, ' ')}
          </span>
          <h3
            className={`text-xl sm:text-2xl font-bold text-white transition-all duration-300 ${
              hovered ? 'translate-y-0' : 'translate-y-1'
            }`}
          >
            {project.title}
          </h3>
          <div
            className={`flex items-center gap-4 mt-3 transition-all duration-300 ${
              hovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="text-sm text-gray-300">{project.location}</span>
            <span className="text-xs text-white font-medium tracking-widest uppercase">
              View &rarr;
            </span>
          </div>
        </div>

        {project.video !== undefined && (
          <div
            className={`absolute top-5 right-5 transition-opacity duration-300 ${
              hovered ? 'opacity-0' : 'opacity-50'
            }`}
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default ProjectCard;
