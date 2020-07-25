import styled from 'styled-components';

const InputLinkStyles = styled.section`
  margin-top: 2rem;
  h2 {
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-align: center;
  }
  .btnWrapper {
    margin: 0 auto;
    max-width: 500px;
    display: flex;
    justify-content: flex-end;
    .clearInput {
      margin-top: 1rem;

      color: ${props => props.theme.black};
      background-color: transparent;
      font-weight: 700;
      border: 2px solid ${props => props.theme.black};
      border-radius: 500px;
      cursor: pointer;

      &:hover {
        transform: scale(1.04);
        background-color: transparent;
      }
    }
  }
  
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem 2rem 0;
    textarea {
      margin: 0 auto;
      max-width: 500px;
      width: 100%;
      height: 169px;
    }
    input[type=submit] {
      margin: 1rem auto;
      padding: 16px 50px;

      font-size: 1.2rem;
      font-weight: 700;
      text-transform: uppercase;
      color: ${props => props.theme.white};
      background-color: ${props => props.theme.green};
      border: 0;
      border-radius: 500px;
      cursor: pointer;

      &:disabled {
        background-image: linear-gradient(-180deg,gray 0, black);
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        transform: scale(1.04);
        background-color: ${props => props.theme.lightGreen};
      }
    }
  }
`;

export default InputLinkStyles;