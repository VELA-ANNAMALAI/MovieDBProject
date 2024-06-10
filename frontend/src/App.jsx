
import React  from 'react';
import Home from './pages/Home/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Home/LoginPage.jsx';
import TVShows from './pages/TVShows.jsx';
import MovieDetails from './pages/Home/MoviesDetails.jsx';
import Favorites from './pages/Home/Favorites.jsx';
function App() {

  
  return (
       <>
      <Router>
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route path="/moviedetails/:id" element={<MovieDetails />} /> // Add a route for MovieDetails
          <Route path="/Favorites" element={<Favorites/>} />


         
         
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    
    </>
   
  );
}

export default App;

