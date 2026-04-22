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
          title="Contact FLY5 — Get a Quote for Drone Cinematography"
          description="Contact FLY5 for aerial drone cinematography in Charlotte, NC. Request a quote for film, real estate, events, or commercial drone footage."
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
          <p className="text-base font-normal mb-4 opacity-80">
            Ready to elevate your project with professional aerial cinematography? Tell us about your vision and we will get back to you with a custom quote. Whether you need drone footage for a film production, real estate listing, wedding, corporate event, or construction documentation, our team in Charlotte, NC is ready to help bring your project to life from a stunning new perspective.
          </p>
          <p className="text-base font-normal mb-4 opacity-80">
            Fill out the form below with details about your project, timeline, and location. We typically respond within one business day. For urgent inquiries, include your phone number and we will call you directly.
          </p>
          <p className="text-base font-normal mb-4 opacity-80">
            We serve the greater Charlotte metropolitan area and are available for travel to locations across North Carolina, South Carolina, and the wider Southeast region. All of our drone pilots are FAA Part 107 certified and fully insured for commercial operations. We look forward to hearing about your next project and showing you what aerial cinematography can do for your story.
          </p>
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
