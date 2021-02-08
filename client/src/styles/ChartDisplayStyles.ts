import styled from 'styled-components';

const ChartDisplayStyles = styled.article`
  h2 {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    text-align: center;

    .playlistName {
      margin-top: .5rem;
      font-size: 2rem;
      font-weight: 700;
    }
  }

  .chart {
    display: flex;
    justify-content: center;
  }

  section {
    max-width: 400px;
    margin: 1rem auto;
    padding: 1rem 1rem 0;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px;
    border-radius: 10px;
    h3 {
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
    }
    nav {
      padding: 1rem 0;
      display: flex;
      justify-content: space-evenly;

      button {
        min-width: 80px;
        padding: .5rem;

        font-size: .8rem;
        font-weight: 700;
        text-transform: uppercase;
        color: ${props => props.theme.white};
        background-color: ${props => props.theme.blue};
        border: 1px solid transparent;
        border-radius: 500px;
        cursor: pointer;

        &:hover {
          background-color: ${props => props.theme.darkBlue};
        }

        &.highlight {
          color: ${props => props.theme.green};
        }
      }
    }
  }

  @media (min-width: 600px) {
    .chart {
      margin: 0 auto;
      &#barChart,
      &#pieChart {
        max-width: 700px;
      }
    }
  }

  @media (max-width: 700px) {
    .chart {
      .bubbleArtistText {
        font-size: 20px;
      }
    }
  }
  
`;

export default ChartDisplayStyles;