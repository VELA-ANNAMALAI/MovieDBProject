import express from "express";
import  {addToFavorites,getFavorites}  from "../handlers/Favorites.handlers.js";


const FavoritesRoutes = express.Router();


try{


    FavoritesRoutes.post("/", addToFavorites);
    FavoritesRoutes.get("/", getFavorites);



}
catch(error){

    console.log(error)
}



export default FavoritesRoutes;