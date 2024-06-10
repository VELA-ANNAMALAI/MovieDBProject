import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage'
import SearchBar from './Searchbar'
import { Heart } from 'lucide-react';
import Categories from './Categories';
function Header() {
  return (

    <div className="bg-black text-white pt-4">


      <div className="flex space-x-8">
        <Link to="/">
          <span className="text-lg cursor-pointer text-white lg:block hidden">Home</span>
          <Heart size={20} className="text-white mt-1 ml-2 lg:hidden block" />

        </Link>
        <Link to="/movies/trending">
          <span className="text-lg cursor-pointer text-white">Trending</span>
        </Link>
        
        <Link to={`/Favorites`}>
          <span className="text-lg cursor-pointer text-white">My List</span>
        </Link>
        <div className='ml-auto'>
          
          <Categories/>
          <SearchBar />
           <LoginPage/>
           
        </div>

      </div>

    </div>
  )
}


export default Header;
