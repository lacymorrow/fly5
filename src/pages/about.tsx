import { Meta } from '../components/Meta';
import { Main } from '../templates/Main';
import config from '../utils/config';

const About = () => (
  <Main
    meta={
      <Meta
        title={`About | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <p>Impactful Drone Productions</p>
  </Main>
);

export default About;
