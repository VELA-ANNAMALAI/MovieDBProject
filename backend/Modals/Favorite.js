import mongoose,{Schema} from 'mongoose';

const favoriteSchema = new mongoose.Schema({

  movieId: {
     type: String,
      required: true,
      unique:true
     },
  userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
  }
});

export const Favorite = mongoose.model('Favorite', favoriteSchema,'add_to_favorite');