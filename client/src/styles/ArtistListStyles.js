import styled from 'styled-components';

const ArtistListStyles = styled.article`
  margin: 3rem 0;
  .headingWrapper {
    display: flex;
    justify-content: center;
    h2 {
      margin: 0 auto 1rem;
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
      text-transform: uppercase;
      border-bottom: 1px solid ${props => props.theme.black};
    }
  }
  
  ul {
    text-align: center;
    li {
      padding-bottom: 12px;
      font-weight: 700;
      .artist {
        color: ${props => props.theme.green};
      }
      .colon {
        color: ${props => props.theme.black};
      }
      .count {
        color: ${props => props.theme.blue};
      }
    }
  }
`;

export default ArtistListStyles;