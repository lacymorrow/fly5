import styled from '@emotion/styled';

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  position: relative;
  color: black;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding-top: 1rem;

  input,
  textarea {
    padding: 5px 0;
    font-size: 18px;
    font-weight: 600;
    color: #ddd;
    background: transparent;
    outline: none;
    margin: 0;
    border: none;
    box-shadow: none;
    width: 100%;
    font-family: inherit;
  }

  label {
    color: white;
    position: absolute;
  }

  button {
  }
`;

export const Status = styled.p<any>`
  height: 60px;
  transition: transform 1s ease-in-out;
  ${(props) => (props.error
    ? { background: '#ff2400', color: 'white' }
    : { background: 'white' })};

  transform: translateY(${(props) => (props.active ? '0' : '-60px')});
`;
