import { User } from "../Modals/User.js";
import { Favorite } from "../Modals/Favorite.js";

export const addToFavorites = async(req,res) =>{
 
    try{
        const {movieId, clerkId} = await req.body;

        if(!movieId || !clerkId){

            return res.status(400).json({ message: "Bad Request" });
                 
        }
        console.log(clerkId,movieId)
         
        const userExists = await User.find({ clerkId: clerkId });
        if (userExists.length == 0)
          return res.status(401).json({ message: "You're not Authenticated" });
    
        const userId = userExists[0]._id;
        const newFavorites = await Favorite({
            movieId,
            userId,
        })
        
      
        console.log("new favorite data ",newFavorites)

        await newFavorites.save();
        
        return res.status(201).json({ message: "Added to Favorites" });



    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error  from handlers" });
      }
};


export const getFavorites = async (req,res) =>{
try{

  
  const clerkId = req.query.userId;
  
  console.log("clerkID",clerkId)
  if (!clerkId) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const userExists = await User.findOne({ clerkId: clerkId });
    if (!userExists) {
      return res.status(401).json({ message: "You're not Authenticated" });
    }
 
    const userId = userExists._id;
    const favList = await Favorite.find({ userId }).populate('userId');
  
    console.log("getFavorites Done")
  if(!favList) {

    return res.status(400).json({ message: "Bad Request" });

  }
  return res.status(200).json({ favList });
}
 catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal Server Error " });
}
}