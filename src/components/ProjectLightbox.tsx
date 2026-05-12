import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Project } from '../data/projects';

interface ProjectLightboxProps {
  project: Project;
  onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: ProjectLightboxProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImage((i) => Math.min(i + 1, project.images.length - 1));
      if (e.key === 'ArrowLeft') setActiveImage((i) => Math.max(i - 1, 0));
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose, project.images.length]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-4xl hover:text-gray-400 transition z-50 leading-none"
        aria-label="Close lightbox"
      >
        &times;
      </button>

      <div className="max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-[50vh] sm:h-[60vh]">
          {project.video !== undefined && activeImage === 0 ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={`/assets/videos/${project.video}.mp4`} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={`/assets/images/shots/${project.images[activeImage]}.jpg`}
              alt={`${project.title} — shot ${activeImage + 1}`}
              layout="fill"
              objectFit="cover"
              priority
            />
          )}
        </div>

        <div className="py-8 px-2">
          <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
            {project.category.replace('-', ' ')} &mdash; {project.location}
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">{project.title}</h2>
          <p className="text-lg text-gray-400 max-w-2xl">{project.description}</p>
        </div>

        {project.images.length > 1 && (
          <div className="flex gap-2 pb-8 px-2 overflow-x-auto">
            {project.images.map((imgIdx, i) => (
              <button
                key={imgIdx}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition ${activeImage === i ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80'}`}
                aria-label={`View shot ${i + 1}`}
              >
                <Image
                  src={`/assets/images/shots/${imgIdx}.jpg`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectLightbox;
