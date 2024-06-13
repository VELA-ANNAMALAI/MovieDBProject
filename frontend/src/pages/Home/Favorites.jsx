import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTVorMovieDetailsByID , getTVorMovieVideosByID} from '@/you-2';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import Header from './Header';
import { Button } from '@/components/shadcn/shadcn/button';
import { languageCodes } from './id';
import { Play } from 'lucide-react';
import TrailerPage from './TrailerPage.jsx'

const getLanguageName = (code) => languageCodes[code] || code;


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState(null); // State to hold the selected movie ID for the trailer
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const { user } = useUser();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const userId = user.id;

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const { data } = await axios.get(`http://localhost:5000/add-to-favorites`, {
          params: {
            userId,
          },
        });
        setFavorites(data.favList);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    if (favorites.length > 0) {
      const fetchAllMovieDetails = async () => {
        const detailsPromises = favorites.map(async (favorite) => {
          const type = 'movie';
          const detail = await getTVorMovieDetailsByID(type, favorite.movieId);
          const videoData = await getTVorMovieVideosByID('movie', favorite.movieId);
            
          
          
          return {...favorite,...detail };
        });
        const resolvedDetails = await Promise.all(detailsPromises);
        setMovieDetails(resolvedDetails.reduce((acc, curr) => ({...acc, [curr.movieId]: curr }), {}));
      };
      fetchAllMovieDetails();
    }
  }, [favorites]);


  const handleTrailer = (movieId) => {
    setSelectedMovieId(movieId);
    setShowTrailerModal(true);

  }


  if (loading) {
    return <motion.div animate={{ scale: 0.9 }} initial={{ scale: 1 }} transition={{ duration: 0.5 }}>Loading...</motion.div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-gray-900 '>
    <Header/>
    <div className='mt-3 mx-11 '>
    <div className='relative w-full max-w-[1210px] h-auto grid grid-cols-5 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-min'> {/* Adjusted for grid layout */}
        {Object.values(movieDetails).map((movieDetail, index) => (
          <div key={index} className='h-[250px] w-[200px] bg-white border-2 border-white  shadow-md cursor-pointer transition-all duration-500 ease-in-out overflow-hidden relative group hover:shadow-lg hover:scale-105'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className="w-full h-full object-cover "
            />
            <div className='absolute inset-0 bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm p-5 rounded-tr-xl rounded-br-xl transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100'>
              <h1 className="text-red-600 mb-2 text-center font-bold">{movieDetail.title}</h1>
              <h3 className='text-red-950 text-center'>{getLanguageName(movieDetail.original_language)}</h3>
              <h1 className="text-red-600 mb-2 text-center font-bold">{movieDetail.vote_average.toFixed(1)}</h1>
            
              <Button variant="ghost" className="text-yellow-50 mx-1 hover:text-yellow-50 "  onClick={() => handleTrailer(movieDetail.movieId)}>
                <Play className='text-white inline-block' />
              </Button>              
              <Button variant="ui" className="">more details</Button>
              </div>
          </div>
        ))}
      </div>
    </div>
    
    {showTrailerModal && (
        <TrailerPage id={selectedMovieId} onClose={() => setShowTrailerModal(false)} />
      )}

  </div>
  );
};

export default Favorites;
