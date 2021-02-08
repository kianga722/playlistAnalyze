import React, { useState, useContext } from 'react';
import { PlaylistContext } from '../contexts/PlaylistContext';
import BarChart from './BarChart';
import PieChart from './PieChart';
import BubbleChart from './BubbleChart';
import ChartDisplayStyles from '../styles/ChartDisplayStyles';

const ChartDisplay = () => {
  const [chart, setChart] = useState('bubble');
  const { playlistName, playlist } = useContext(PlaylistContext);

  const handleChart = (type: string) => {
    setChart(type)
  }

  return (
    <ChartDisplayStyles>

      <h2>
        <div>
          Top Artists (by Song Count) for Playlist:
        </div>
        <div className='playlistName'>
          {playlistName}
        </div>
      </h2>

      {
        playlist &&
        chart === 'bubble' &&
        <BubbleChart
          data={playlist.slice(0, 20)}
        />
      }

      {
        playlist &&
        chart === 'bar' &&
        <BarChart
          data={playlist.slice(0,10)}
        />
      }

      {
        playlist &&
        chart === 'pie' &&
        <PieChart
          data={playlist.slice(0,5)}
        />
      }

      <section>
        <h3>
          Chart Type
        </h3>

        <nav>
          <button
            onClick={(event) => handleChart('bubble')}
            className={chart === 'bubble' ? 'highlight' : ''}
          >
            Bubble
          </button>
          <button
            onClick={(event) => handleChart('bar')}
            className={chart === 'bar' ? 'highlight' : ''}
          >
            Bar
          </button>
          <button
            onClick={(event) => handleChart('pie')}
            className={chart === 'pie' ? 'highlight' : ''}
          >
            Pie
          </button>
        </nav>
      </section>
      
     
    </ChartDisplayStyles>
  )

}

export default ChartDisplay;