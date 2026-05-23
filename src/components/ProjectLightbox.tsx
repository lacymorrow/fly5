import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Project } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ProjectLightboxProps {
  project: Project;
  onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: ProjectLightboxProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const reducedMotion = useReducedMotion();
  const touchStartX = useRef(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setActiveImage(0);
  }, [project.id]);

  useEffect(() => {
    openerRef.current = document.activeElement;
    requestAnimationFrame(() => setIsOpen(true));
    document.body.style.overflow = 'hidden';

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      document.body.style.overflow = '';
      if (openerRef.current instanceof HTMLElement) {
        openerRef.current.focus();
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    closeTimerRef.current = setTimeout(
      () => closeRef.current(),
      reducedMotion ? 0 : 300,
    );
  }, [reducedMotion]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
      if (e.key === 'ArrowRight')
        setActiveImage((i) => Math.min(i + 1, project.images.length - 1));
      if (e.key === 'ArrowLeft')
        setActiveImage((i) => Math.max(i - 1, 0));

      if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [project.images.length, handleClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0]?.clientX ?? 0;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 60) {
      if (delta < 0)
        setActiveImage((i) => Math.min(i + 1, project.images.length - 1));
      else setActiveImage((i) => Math.max(i - 1, 0));
    }
  };

  const safeIndex = Math.min(activeImage, project.images.length - 1);
  const currentImageId = project.images[safeIndex];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label={project.title}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        opacity: isOpen ? 1 : 0,
        transition: reducedMotion ? 'none' : 'opacity 0.3s ease-out',
      }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-95 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={handleClose}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 w-11 h-11 flex items-center justify-center text-white text-opacity-50 hover:text-opacity-100 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded-full bg-black bg-opacity-50 sm:bg-transparent"
        aria-label="Close lightbox"
        autoFocus
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {project.images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setActiveImage((i) => Math.max(i - 1, 0))}
            disabled={safeIndex === 0}
            className="absolute left-2 sm:left-4 top-1/2 z-50 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white text-opacity-40 hover:text-opacity-100 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded-full disabled:opacity-20 disabled:cursor-default bg-black bg-opacity-50 sm:bg-transparent"
            aria-label="Previous image"
            style={{ transform: 'translateY(-50%)' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveImage((i) =>
                Math.min(i + 1, project.images.length - 1),
              )
            }
            disabled={safeIndex === project.images.length - 1}
            className="absolute right-2 sm:right-4 top-1/2 z-50 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white text-opacity-40 hover:text-opacity-100 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded-full disabled:opacity-20 disabled:cursor-default bg-black bg-opacity-50 sm:bg-transparent"
            aria-label="Next image"
            style={{ transform: 'translateY(-50%)' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      <div
        className="relative z-10 max-w-5xl w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(24px)',
          transition: reducedMotion
            ? 'none'
            : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-[40vh] sm:h-[65vh] overflow-hidden">
          {project.video !== undefined && safeIndex === 0 ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src={`/assets/videos/${project.video}.mp4`}
                type="video/mp4"
              />
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

          {project.images.length > 1 && (
            <div className="absolute bottom-4 right-4 text-xs text-white text-opacity-50 bg-black bg-opacity-50 px-3 py-1 rounded-full">
              {safeIndex + 1} / {project.images.length}
            </div>
          )}
        </div>

        <div className="py-6 sm:py-8 px-3 sm:px-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs uppercase tracking-widest text-gray-500">
              {project.category.replace(/-/g, ' ')}
            </span>
            <span
              className="w-1 h-1 rounded-full bg-gray-600"
              aria-hidden="true"
            />
            <span className="text-xs text-gray-500">{project.location}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {project.title}
          </h2>
          <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {project.images.length > 1 && (
          <div
            className="flex gap-2 pb-8 px-3 sm:px-4 overflow-x-auto"
            role="tablist"
            aria-label="Project images"
          >
            {project.images.map((imgIdx, i) => (
              <button
                key={imgIdx}
                type="button"
                role="tab"
                onClick={() => setActiveImage(i)}
                className={[
                  'relative flex-shrink-0 w-20 h-14 overflow-hidden cursor-pointer transition-all duration-200',
                  'focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none',
                  safeIndex === i
                    ? 'ring-1 ring-white opacity-100'
                    : 'opacity-40 hover:opacity-70',
                ].join(' ')}
                aria-label={`View shot ${i + 1}`}
                aria-selected={safeIndex === i}
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
