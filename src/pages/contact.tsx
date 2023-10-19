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
          title={`Contact | ${config.title}: ${config.tagline}`}
          description={config.description}
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
          />
        </div>
        <div className="sm:table-cell w-full p-12 text-white font-bold mb-9">
          <h2 className="text-2xl mb-4">Contact us for more info</h2>
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
