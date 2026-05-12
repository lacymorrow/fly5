import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Project } from '../data/projects';

interface ProjectLightboxProps {
  project: Project;
  onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: ProjectLightboxProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<Element | null>(null);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setActiveImage(0);
  }, [project.id]);

  useEffect(() => {
    openerRef.current = document.activeElement;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
      }
      if (e.key === 'ArrowRight') setActiveImage((i) => Math.min(i + 1, project.images.length - 1));
      if (e.key === 'ArrowLeft') setActiveImage((i) => Math.max(i - 1, 0));
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      if (openerRef.current instanceof HTMLElement) {
        openerRef.current.focus();
      }
    };
  }, [project.images.length]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === dialogRef.current) onCloseRef.current();
  }, []);

  const safeIndex = Math.min(activeImage, project.images.length - 1);
  const currentImageId = project.images[safeIndex];

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-0 border-none"
      onClick={handleBackdropClick}
      aria-label={project.title}
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
    >
      <button
        type="button"
        onClick={() => onCloseRef.current()}
        className="absolute top-6 right-6 text-white text-4xl hover:text-gray-400 transition z-50 leading-none bg-transparent border-none cursor-pointer"
        aria-label="Close lightbox"
        autoFocus
      >
        &times;
      </button>

      <div className="max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-[50vh] sm:h-[60vh]">
          {project.video !== undefined && safeIndex === 0 ? (
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
            currentImageId !== undefined && (
              <Image
                src={`/assets/images/shots/${currentImageId}.jpg`}
                alt={`${project.title} — shot ${safeIndex + 1}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            )
          )}
        </div>

        <div className="py-8 px-2">
          <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
            {project.category.replace(/-/g, ' ')} &mdash; {project.location}
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
                className={[
                  'relative flex-shrink-0 w-24 h-16 overflow-hidden transition bg-transparent border-none cursor-pointer',
                  safeIndex === i ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80',
                ].join(' ')}
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
    </dialog>
  );
};

export default ProjectLightbox;
