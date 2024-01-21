import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: Number,
    streamingLink: String
});

export const Movie = mongoose.model('Movie', movieSchema);