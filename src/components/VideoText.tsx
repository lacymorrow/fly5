import React, {
  ReactNode,
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { StyledVideoText, StyledWrapper } from '../styles/components/VideoText';
import { incrementNumber, prefersReducedMotion } from '../utils/utils';

interface StateType {
  active: boolean;
  interactive: boolean;
  index: number;
}

const TRANSITION_DURATION = 2; // seconds

// 515/960
const VideoText = (props: {
  children?: ReactNode;
  className?: string;
  text?: string;
  src: string | Array<string>;
}) => {
  const [width, height] = [720, 385];
  const {
    children, text, src, ...rest
  } = props;
  const sources = useMemo(() => (typeof src === 'string' ? [src] : src), [src]);

  const videoEl: any = useRef(null);
  const [state, setState] = useReducer<Reducer<StateType, Partial<StateType>>>(
    (currentState, newState) => ({ ...currentState, ...newState }),
    {
      active: false,
      interactive: false,
      index: 0,
    },
  );

  const nextVideoIndex = () => incrementNumber(state.index, sources.length);

  const nextVideo = () => {
    if (state.interactive || videoEl.current.paused) {
      setState({ active: false, interactive: false });

      setTimeout(() => {
        setState({
          index: nextVideoIndex(),
        });
      }, TRANSITION_DURATION * 1000);
    }
  };

  const handleCanPlay = (event: any) => {
    setState({ active: true });

    if (prefersReducedMotion()) {
      setTimeout(() => {
        nextVideo();
      }, 10000);
    } else {
      event?.target.play();
    }

    setTimeout(() => {
      setState({
        interactive: true,
      });
    }, TRANSITION_DURATION * 1000);
  };
  const handleCanPlayThrough = () => {};

  const handleUpdate = (event: any) => {
    const {
      currentTime, duration, ended, error,
    } = event.target;

    if (error) {
      console.log('Video error: ', error);
    }

    if (state.active && currentTime + TRANSITION_DURATION >= duration) {
      // Fade out
      setState({ active: false, interactive: false });
    }

    if (ended) {
      nextVideo();
    }
  };

  useEffect(() => {
    const currentVideo = videoEl.current;
    if (currentVideo) {
      currentVideo.load(sources[state.index]);
    }
    return () => {
      if (currentVideo) {
        // Cleanup video https://stackoverflow.com/a/28060352
        currentVideo.pause();
        currentVideo.removeAttribute('src'); // empty source
        currentVideo.load();
      }
    };
  }, [sources, state.index]);

  return (
    <StyledWrapper {...rest} width={width} height={height} aria-label={'Fly5'}>
      <svg width={width} height={height}>
        <text x="50%" y="50%" className="text-shadow">
          {text || children}
        </text>
      </svg>
      <StyledVideoText
        active={state.active}
        transitionDuration={TRANSITION_DURATION}
        onClick={nextVideo}
      >
        <video
          ref={videoEl}
          muted
          // crossOrigin=''
          preload="auto"
          width={width}
          height={height}
          className="svg-clipped-text"
          key={state.index}
          onTimeUpdate={handleUpdate}
          onCanPlay={handleCanPlay}
          onCanPlayThrough={handleCanPlayThrough}
        >
          <source src={`${sources[state.index]}`} type="video/mp4" />
          Your browser does not support this video file.
        </video>

        <svg width={width} height={height}>
          <clipPath id="svgTextPath">
            <text x="50%" y="50%">
              {text || children}
            </text>
          </clipPath>
        </svg>
      </StyledVideoText>
      {prefersReducedMotion() && (
        <small className="text-xs relative z-[1]">
          <a
            rel="noopener noreferrer"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences"
            target="_blank"
          >
            Your settings indicate that you prefer reduced motion, so we have
            paused this video ↗
          </a>
        </small>
      )}
    </StyledWrapper>
  );
};

export default VideoText;
