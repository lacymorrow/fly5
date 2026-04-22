import { getPlaiceholder } from 'plaiceholder';
import { IGetBlurhashReturn } from 'plaiceholder/dist/blurhash';

import ContactForm from '../components/ContactForm';
import ImageRotate from '../components/ImageRotate';
import { Meta } from '../components/Meta';
import { Alt } from '../templates/Alternative';
import config from '../utils/config';
import { generateRandom, strFormat } from '../utils/utils';

const About = (props: {
  imagePath: string;
  imageIndex: number;
  blurData: IGetBlurhashReturn;
}) => (
    <Alt
      meta={
        <Meta
          title="Contact FLY5 — Get a Quote for Aerial Drone Cinematography"
          description="Contact FLY5 for professional aerial drone cinematography in Charlotte, NC. Request a quote for film, real estate, events, or commercial drone footage production."
          ogImage={config.ogImage}
        />
      }
    >
      <div className="sm:table w-full">
        <div className="sm:table-cell sm:w-1/2 min-h-[400px] relative">
          <ImageRotate
            path={props.imagePath}
            total={config.totalImages}
            staticBlurData={props.blurData}
            staticInitialIndex={props.imageIndex}
            alt="Aerial drone cinematography by FLY5 in Charlotte, NC"
          />
        </div>
        <div className="sm:table-cell w-full p-12 text-white font-bold mb-9">
          <h1 className="text-3xl mb-2">Contact FLY5</h1>
          <p className="text-base font-normal mb-4 opacity-80">Tell us about your project and we will get back to you with a quote.</p>
          <ContactForm />
        </div>
      </div>
    </Alt>
);

// cannot do this within a component
export const getStaticProps = async () => {
  const imageIndex = generateRandom(config.totalImages);
  const imagePath = '/assets/images/shots/%s.jpg';
  const image = strFormat(imagePath, imageIndex);
  const { blurhash } = await getPlaiceholder(image);

  return {
    props: {
      imagePath,
      imageIndex,
      blurData: blurhash,
    },
  };
};

export default About;
