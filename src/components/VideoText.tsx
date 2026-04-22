import React, {
  ReactNode,
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { CornersInIcon, CornersOutIcon } from '@phosphor-icons/react';

import { StyledVideoText, StyledWrapper, FullscreenButton, ShimmerLayer, FullscreenLoader } from '../styles/components/VideoText';
import { incrementNumber, prefersReducedMotion } from '../utils/utils';

interface StateType {
  active: boolean;
  interactive: boolean;
  index: number;
  isFullscreen: boolean;
}

const TRANSITION_DURATION = 1; // seconds

// 515/960
const VideoText = (props: {
  children?: ReactNode;
  className?: string;
  text?: string;
  src: string | Array<string>;
  poster?: string;
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
      isFullscreen: false,
    },
  );

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState({ isFullscreen: !state.isFullscreen });
  };

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

  // Handle Escape key to exit fullscreen
  useEffect(() => {
    if (!state.isFullscreen) {
      return undefined;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setState({ isFullscreen: false });
      }
    };

    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isFullscreen]);

  return (
    <StyledWrapper {...rest} height={height} aria-label={'Fly5'} isFullscreen={state.isFullscreen}>
      <svg width={width} height={height}>
        <text x="50%" y="50%" className="text-shadow">
          {text || children}
        </text>
      </svg>
      <ShimmerLayer isFullscreen={state.isFullscreen} />
      <StyledVideoText
        active={state.active}
        transitionDuration={TRANSITION_DURATION}
        onClick={nextVideo}
        isFullscreen={state.isFullscreen}
      >
        <video
          ref={videoEl}
          muted
          preload="auto"
          poster={props.poster}
          width={state.isFullscreen ? undefined : width}
          height={state.isFullscreen ? undefined : height}
          className={state.isFullscreen ? '' : 'svg-clipped-text'}
          key={state.index}
          onTimeUpdate={handleUpdate}
          onCanPlay={handleCanPlay}
          onCanPlayThrough={handleCanPlayThrough}
        >
          <source src={`${sources[state.index]}`} type="video/mp4" />
          <track kind="captions" label="English" srcLang="en" default />
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
      {state.isFullscreen && <FullscreenLoader visible={!state.active} />}
      <FullscreenButton
        onClick={toggleFullscreen}
        isFullscreen={state.isFullscreen}
        title={state.isFullscreen ? 'Exit fullscreen' : 'View full video'}
      >
        {state.isFullscreen ? (
          <>
            <span>Exit Fullscreen</span>
            <CornersInIcon size={24} />
          </>
        ) : (
          <>
            <span>Fullscreen</span>
            <CornersOutIcon size={24} />
          </>
        )}
      </FullscreenButton>
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
