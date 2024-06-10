// modals/movie.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    backdrop_path:{ type:String,
        require:true,
        unique: true,
        dropDups: true
    },
    id: Number,
    original_title:{ type:String,
        require:true,
        unique: true,
        dropDups: true
    },
    overview: String,
    poster_path: String,
    media_type: String,
    adult: Boolean,
    title:{ type:String,
        require:true,
        unique: true,
        dropDups: true
    },
    original_language: String,
    genre_ids: [Number],
    popularity: Number,
    release_date: Date,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
}, {
  timestamps: true,
});

export const TrendingMovie = mongoose.model('TrendingMovie', movieSchema, 'trending_movies');
