import { Project } from '../data/projects';

interface FeaturedProjectProps {
  project: Project;
  onClick: () => void;
}

const FeaturedProject = ({ project, onClick }: FeaturedProjectProps) => (
  <button
    type="button"
    className="relative w-full h-[70vh] overflow-hidden cursor-pointer block group"
    onClick={onClick}
    aria-label={`View featured project: ${project.title}`}
  >
    {project.video !== undefined ? (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`/assets/videos/${project.video}.mp4`} type="video/mp4" />
      </video>
    ) : (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/images/shots/${project.images[0]}.jpg)` }}
      />
    )}

    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-500" />

    <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
        Featured — {project.category.replace('-', ' ')}
      </span>
      <h3 className="text-5xl sm:text-7xl font-extrabold text-white mb-4">
        {project.title}
      </h3>
      <p className="text-lg text-gray-300 max-w-xl">
        {project.description}
      </p>
      <span className="mt-6 text-sm uppercase tracking-widest text-gray-400 group-hover:text-white transition">
        View Project &rarr;
      </span>
    </div>
  </button>
);

export default FeaturedProject;
