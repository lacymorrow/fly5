import React, {
  ReactNode,
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { StyledVideoText, StyledWrapper, FullscreenButton } from '../styles/components/VideoText';
import { incrementNumber, prefersReducedMotion } from '../utils/utils';

interface StateType {
  active: boolean;
  interactive: boolean;
  index: number;
  isFullscreen: boolean;
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.isFullscreen) {
        setState({ isFullscreen: false });
      }
    };

    if (state.isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when fullscreen
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [state.isFullscreen]);

  return (
    <StyledWrapper {...rest} width={width} height={height} aria-label={'Fly5'} isFullscreen={state.isFullscreen}>
      <svg width={width} height={height}>
        <text x="50%" y="50%" className="text-shadow">
          {text || children}
        </text>
      </svg>
      <StyledVideoText
        active={state.active}
        transitionDuration={TRANSITION_DURATION}
        onClick={nextVideo}
        isFullscreen={state.isFullscreen}
      >
        <video
          ref={videoEl}
          muted
          // crossOrigin=''
          preload="auto"
          width={state.isFullscreen ? undefined : width}
          height={state.isFullscreen ? undefined : height}
          className={state.isFullscreen ? '' : 'svg-clipped-text'}
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
      <FullscreenButton
        onClick={toggleFullscreen}
        isFullscreen={state.isFullscreen}
        title={state.isFullscreen ? 'Exit fullscreen' : 'View full video'}
      >
        {state.isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 14 10 14 10 20"></polyline>
            <polyline points="20 10 14 10 14 4"></polyline>
            <line x1="14" y1="10" x2="21" y2="3"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
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
