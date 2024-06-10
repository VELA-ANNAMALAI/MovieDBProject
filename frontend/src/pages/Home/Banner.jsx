import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);


    
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=edef38af3394ef62d6c2066aca5b7b25")
      .then(res => res.json())
      .then(data => setPopularMovies(data.results))
      .catch(err => console.error('error:' + err));
      setLoading(false);
    }, []);

    const [scrolled, setScrolled] = useState(false);

    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0? false : true);
        return () => (window.onscroll = null);
    };



    if (loading) {
        return <div className="text-center">
        <div
          className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
        ></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
      
      </div>;
      }

    return (
        <>
            <div>
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link key={movie.id} href={`/movie/${movie.id}`} className="no-underline text-white">
                                <div className="relative h-[600px]">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} className="ml-auto display:block w-full " />
                                </div>
                                <div className="absolute p-20 bottom-0 h-3/4 flex flex-col justify-end items-start w-full bg-gradient-to-b from-transparent to-black opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-100">
                                    <div className="font-bold text-9xl mb-1 text-left">{movie?.original_title || ""}</div>
                                    <div className="text-4xl mb-4">
                                        {movie?.release_date || ""}
                                        <span className="ml-12">
                                            {movie?.vote_average || ""}
                                            <i className="ml-2 fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="italic text-base mb-1 flex text-left w-1/2">{movie?.overview || ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
            </div>
        </>
    );
};

export default Banner;
