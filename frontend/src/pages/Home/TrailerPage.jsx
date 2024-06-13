import React ,{useState,useEffect} from 'react';
import { getTVorMovieVideosByID } from '@/you-2/index.js';
import ReactPlayer from 'react-player';
import { Player } from 'video-react';

const TrailerPage = ({ id }) => {
  const [videoData, setVideoData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTVorMovieVideosByID('movie', id);
        console.log('Video data:', data);
        if (data && data.results.length > 0) {
          const officialTrailer = data.results.find(video =>video.name.toLowerCase().includes('official trailer'));
          
          console.log(officialTrailer.key)
            
          if (officialTrailer) {

            console.log(`Setting videoData to: https://www.youtube.com/embed/${officialTrailer.key}`);
            setVideoData({url:`https://www.youtube.com/embed/${officialTrailer.key}`});
            console.log(setVideoDat)

          } else {
            setErrorMessage("No official trailer found.");
          }
        } 
      } catch (error) {
        console.error('Error \ video data:', error);
        setErrorMessage(error.message);
      }
    };
    fetchData();
  }, [id]);

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>
  }

  if (!videoData) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <ReactPlayer src={videoData} width={560} height={315} controls={true} />
    </div>
  );
};

export default TrailerPage;