import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getTVorMovieDetailsByID } from '@/you-2';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import Header from './Header';
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
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
          return {...favorite,...detail };
        });
        const resolvedDetails = await Promise.all(detailsPromises);
        setMovieDetails(resolvedDetails.reduce((acc, curr) => ({...acc, [curr.movieId]: curr }), {}));
      };
      fetchAllMovieDetails();
    }
  }, [favorites]);

  if (loading) {
    return <motion.div animate={{ scale: 0.9 }} initial={{ scale: 1 }} transition={{ duration: 0.5 }}>Loading...</motion.div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-gray-900 h-screen'>
    <Header/>
    <div className='mt-1  '>
      <div className='relative w-full max-w-[1150px]  h-auto flex flex-wrap ' style={{ flexDirection: 'row', justifyContent: 'flex-start',gap: '20px' }}> {/* Adjusted for centering */}
        {Object.values(movieDetails).map((movieDetail) => (
          <div className='flex-1 flex-grow flex-shrink h-[440px] bg-white border-2 border-white shadow-md cursor-pointer transition-all duration-500 ease-in-out overflow-hidden relative group hover:shadow-lg hover:scale-105'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className="w-full h-full  transition-all duration-500 ease-in-out"
            />
            <div className='absolute inset-0 bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm p-5 rounded-tr-xl rounded-br-xl transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100'>
              <h1 className="text-red-600 mb-2">{movieDetail.title}</h1>
              <p className="mb-4">{movieDetail.overview}</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">Play trailer on YouTube</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Favorites;
