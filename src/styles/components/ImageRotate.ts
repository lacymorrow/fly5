import styled from '@emotion/styled';

export const StyledImageRotate = styled.div<any>`
  ${(props) => props.src && {
    backgroundImage: `url("${props.src}")`,
  }}

  /* position: relative; */
	&::after {
    opacity: 0;
    transition: opacity 0.4s;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset 0px 0px 50px 5px rgba(0, 0, 0, 0.3);
    filter: blur(5px);
  }
  &:hover {
    cursor: pointer;
    &::after {
      opacity: 1;
    }
  }

  img {
    // Fade in
    opacity: 0;
    ${(props) => props.active && {
    opacity: '1',
    transition: '0.3s',
  }}
    transition: 1s;
  }

  & > span {
    height: 100% !important;
  }
`;
