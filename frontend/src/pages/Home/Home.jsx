import React from 'react'
import { useState, useEffect,useRef } from 'react';
import Trending from './Trending';
import Header from './Header';
import Banner from './Banner';

export default function Home() {

 const [Scrolled , SetScrolled] = useState(false);
 




 

  window.onscroll = () => {
    SetScrolled(window.pageYOffset === 0? false : true);
    // Directly execute the cleanup logic without returning a function
    window.removeEventListener('scroll', window.onscroll);
  };

  return (
    <div>
    <div className='  w-screen overflow-y-auto'>
      <div className='w-full h-full'>
      <Header Scrolled={Scrolled}  />
      <Banner/>
      
      </div>

    </div>
<Trending/>

 </div>



  )
}
