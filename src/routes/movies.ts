import express from 'express';
import { Movie } from '../models/Movie';
import { adminMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch(err) {
        res.status(500).json({ message: "Error fetching movies" });
    }
});

router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const movies = await Movie.find({
            $or: [{ title: query }, { genre: query }]
        });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error searching for movies" });
    }
});

router.post('/', adminMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const movie = await newMovie.save();
        res.status(201).json({ message: "Movie added", movie });
    } catch (error) {
        res.status(500).json({ message: "Error adding movie" });
    }
});

router.put('/:id', adminMiddleware, async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found'});
      }
      res.json(updatedMovie);
    } catch (err) {
      res.status(500).json({ message: 'Error updating movie' });
    }
});

router.delete('/:id', adminMiddleware, async (req, res) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      if (!deletedMovie) {
        return res.status(404).send('Movie not found');
      }
      res.json({ message: 'Movie deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting movie' });
    }
});
  
export default router;