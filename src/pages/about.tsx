/* eslint-disable max-len */
import { Meta } from '../components/Meta';
import { Main } from '../templates/Main';
import config from '../utils/config';

const About = () => (
  <Main
    meta={
      <Meta
        title={`Contact | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <p>Impactful Drone Productions</p>
    <div>
    {/* Professional Drone Videography Services in Charlotte, NC by Lacy Morrow

Description:

Hello, I'm Lacy Morrow, a Part 107 Certified drone pilot with 8 years of flying experience.
With a background as a professional FPV drone pilot, I've earned recognition and made multiple appearances at national finals.
I even ran a drone camp and build and fly all the drones used in production to ensure the highest quality shots.

Services Offered:

🚀 Specialization: My focus is on action footage, capturing the thrill of sports, cars, and races.

🏡 Real Estate: I provide stunning aerial views and immersive videos to help you showcase properties in the best light.

🎉 Social Events: From concerts to outdoor gatherings, I capture the essence of your event, creating memorable visuals.

🏁 Action Events: Whether it's drag races or extreme sports, I'm skilled at capturing the adrenaline-pumping moments.

State-of-the-Art Equipment:

🚁 I use a range of equipment, including 2.5" cinewhoop drones, 5" and 7" long-range race follow drones, a 10" cinelifter for exceptional stability, and a DJI Mavic Mini for versatility.

Why Choose Me:

With a strong background in drone racing and a deep passion for capturing the excitement of action, I bring a unique perspective to every project. My dedication to quality and innovation means you'll receive stunning visuals that set your project apart.

Contact Information:

Ready to elevate your visual content? Contact me for quotes, inquiries, or to discuss your project:

📞 Phone: [Your Phone Number]
📧 Email: [Your Email Address]
🌐 Website: [Your Website, if applicable]

Let's collaborate to turn your vision into breathtaking reality. */}
</div>

`
  </Main>
);

export default About;
