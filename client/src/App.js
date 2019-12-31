import React, { useState, useEffect } from 'react';
import PieChart from './components/PieChart';
import ReactBubbleChart from 'react-d3-bubbles';

import axios from 'axios';


function App() {
  const [playlist, setPlaylist] = useState(null);

  const getPlaylist = async () => {
    try {
      console.log('Getting playlist data...')
      const response = await axios.get('/api');
      setPlaylist(response.data)
      
    } catch (err) {
      console.log(err.response.data)
    }
  };

   // Get playlist data
   useEffect(() => {
      getPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
  
  return (
    <div className="App">
      {
        playlist &&
        <ReactBubbleChart 
          width={800}
          height={800}
          data={Object.values(playlist)}
          center={{ x: 400, y: 400}}
          forceStrength={0.03}
        />
        // <PieChart 
        //   width={800}
        //   height={800}
        //   innerRadius={0}
        //   outerRadius={300}
        //   data={Object.values(playlist)}
        // />
      }
      {
        playlist &&
        playlist.map(artistCount => (
          <div>
            <span>{artistCount.artist}</span>
            <span> : </span>
            <span>{artistCount.value}</span>
          </div>
        ))
      }
    </div>
  );
}

export default App;
