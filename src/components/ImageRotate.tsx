// <ImageRotate path="/path/to/image/prefix-%s.jpg" total={numberOfImages} /> where %s is a number

import { useState } from 'react';

import Image from 'next/image';
import { IGetBlurhashReturn } from 'plaiceholder/dist/blurhash';
import { BlurhashCanvas } from 'react-blurhash';

import { StyledImageRotate } from '../styles/components/ImageRotate';
import { incrementNumber, strFormat } from '../utils/utils';

interface ImageRotateProps {
  path: string;
  total: number;
  staticInitialIndex: number;
  staticBlurData: IGetBlurhashReturn;
  alt?: string;
}

const ImageRotate = (props: ImageRotateProps) => {
  const initialImage = strFormat(props.path, props.staticInitialIndex);
  const [imageState, setImageState] = useState({
    image: initialImage,
    imageIndex: props.staticInitialIndex,
    imageLoaded: false,
    nextBlurData: {},
  });
  // useEffect(() => {

  // });
  return (
    <StyledImageRotate
      className="w-full h-full absolute"
      active={imageState.imageLoaded}
      onClick={() => {
        // prevent multiple clicks
        if (imageState.imageLoaded) {
          const newIndex = incrementNumber(imageState.imageIndex, props.total);
          setImageState((prevState) => ({
            ...prevState,
            image: strFormat(props.path, newIndex),
            imageIndex: newIndex,
            imageLoaded: false,
          }));
        }
      }}
    >
      {/* Only for fist load  */}
      {props.staticInitialIndex === imageState.imageIndex && (
        <BlurhashCanvas
          {...props.staticBlurData}
          punch={1}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <Image
        alt={props.alt || 'Aerial drone photography by FLY5'}
        src={imageState.image}
        priority={true}
        sizes="50vw"
        objectFit="cover"
        height="100%"
        width="100%"
        className="w-full h-full absolute transition duration-1000"
        layout="responsive"
        onLoad={() => {
          setImageState((prevState) => ({
            ...prevState,
            imageLoaded: true,
          }));
        }}
      />
    </StyledImageRotate>
  );
};

export default ImageRotate;
