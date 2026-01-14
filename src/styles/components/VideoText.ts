import styled from '@emotion/styled';

export const StyledWrapper = styled.div<{ height: number; isFullscreen: boolean }>`
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.height}px;
  overflow: hidden;
  position: relative;

  /* Fullscreen backdrop */
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background: #000;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-out;
  }

  ${(props) => props.isFullscreen && `
    z-index: 9999;

    &::before {
      opacity: 1;
      z-index: 9998;
    }
  `}

  & > svg {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
    user-select: none;
    transition: opacity 0.3s ease-out;
    ${(props) => props.isFullscreen && 'opacity: 0; pointer-events: none;'}
  }

  text {
    color: rgb(26, 32, 44);
    font-size: 18rem;
    font-weight: 900;
    font-family: inherit;
    dominant-baseline: middle;
    text-anchor: middle;
  }

  .text-shadow {
    text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledBackgroundText = styled.div`
  color: rgb(26, 32, 44);
  font-weight: 900;
  font-size: 18rem;
  text-align: center;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
`;

export const StyledVideoText = styled.div<{ active: boolean; transitionDuration: number; isFullscreen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  height: 100%;
  margin: 0 auto;
  cursor: pointer;

  opacity: 0;
  ${(props) => props.active && { opacity: '1' }}
  transition: opacity ${(props) => props.transitionDuration}s ease-in-out;

  ${(props) => props.isFullscreen && `
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  video {
    display: block;
    margin: 0 auto;
    user-select: none;
    transform-origin: center center;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    ${(props) => props.isFullscreen && `
      max-width: 100vw;
      max-height: 100vh;
      width: auto;
      height: auto;
      object-fit: contain;
    `}
  }

  .svg-clipped-text {
    clip-path: url(#svgTextPath);
    transition: clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const FullscreenButton = styled.button<{ isFullscreen: boolean }>`
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;

  /* Show on hover of parent wrapper */
  div:hover > & {
    opacity: 0.8;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    opacity: 1;
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
  }

  svg {
    transition: transform 0.2s ease;
  }

  ${(props) => props.isFullscreen && `
    position: fixed;
    bottom: 24px;
    right: 24px;
    opacity: 0.8;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    &:hover {
      background: rgba(0, 0, 0, 0.8);
      opacity: 1;
    }
  `}
`;
