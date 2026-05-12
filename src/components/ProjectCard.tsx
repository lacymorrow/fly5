import { useRef, useState } from 'react';

import Image from 'next/image';

import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  tall?: boolean;
}

const ProjectCard = ({ project, onClick, tall = false }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const primaryImage = project.images[0] ?? 0;
  const heightClass = tall ? 'h-[500px] sm:h-[600px]' : 'h-[300px] sm:h-[400px]';

  return (
    <button
      type="button"
      className={`group relative ${heightClass} w-full overflow-hidden cursor-pointer block`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`View project: ${project.title}`}
    >
      <div className={`absolute inset-0 transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}>
        <Image
          src={`/assets/images/shots/${primaryImage}.jpg`}
          alt={`${project.title} — aerial cinematography by FLY5`}
          layout="fill"
          objectFit="cover"
          priority={false}
        />
      </div>

      {project.video !== undefined && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={`/assets/videos/${project.video}.mp4`} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-xs uppercase tracking-widest text-gray-400 mb-1 block opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.category.replace(/-/g, ' ')}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-gray-300 mt-1 opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.location}
        </p>
      </div>

      {project.video !== undefined && !hovered && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default ProjectCard;
