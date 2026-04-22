import { Meta } from '../components/Meta';
import { Main } from '../templates/Main';
import config from '../utils/config';

const About = () => (
  <Main
    meta={
      <Meta
        title="About FLY5 — Aerial Cinematography Team | Charlotte"
        description="FLY5 is a Charlotte-based aerial cinematography team delivering professional drone footage for film, real estate, weddings, events, and commercial projects."
        ogImage={config.ogImage}
      />
    }
  >
    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About FLY5</h1>
    <p className="text-lg mb-4">
      FLY5 is a professional aerial cinematography studio based in Charlotte, North Carolina. We specialize in capturing stunning drone footage that tells your story from a perspective only possible from the sky.
    </p>
    <p className="text-lg mb-4">
      Our team combines technical precision with creative vision to deliver impactful aerial productions. Whether you need cinematic footage for a film project, real estate showcase, wedding highlight, or commercial campaign, we bring the perspective that sets your work apart.
    </p>
    <p className="text-lg mb-4">
      We use the latest drone technology and post-production techniques to ensure every frame meets the highest standards of quality. From sweeping landscape aerials to tight architectural details, FLY5 delivers footage with impact.
    </p>
    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Services</h2>
    <ul className="list-disc list-inside text-lg mb-4 space-y-2">
      <li>Film and television aerial cinematography</li>
      <li>Real estate photography and video tours</li>
      <li>Wedding and event coverage</li>
      <li>Commercial and corporate productions</li>
      <li>Construction progress and site documentation</li>
      <li>Landscape and tourism content</li>
    </ul>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Approach</h2>
    <p className="text-lg mb-4">
      Every project begins with a conversation. We work closely with our clients to understand the story they want to tell, the audience they want to reach, and the specific shots that will make the biggest impact. Our pre-production planning ensures efficient shoots and exceptional results.
    </p>
    <p className="text-lg mb-4">
      On set, our FAA-certified pilots operate with safety as the top priority while our cinematographers focus on composition, movement, and timing. We shoot in high resolution and use professional color grading and editing in post-production to deliver polished, broadcast-ready footage.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose FLY5</h2>
    <p className="text-lg mb-4">
      With years of experience in both traditional and aerial filmmaking, we understand that great cinematography is about more than just getting a camera in the air. It is about finding the perfect angle, the right movement, and the precise moment that captures the essence of your subject. That attention to craft is what sets FLY5 apart.
    </p>
    <p className="text-lg mb-4">
      We are proud to serve clients across the Charlotte metro area and beyond. From small businesses to large production companies, every client receives the same level of dedication and creative care.
    </p>
  </Main>
);

export default About;
