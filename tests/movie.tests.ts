import request from 'supertest';
import app from '../src/app';
import { Movie } from '../src/models/Movie';
import { Request, NextFunction, Response } from 'express';

jest.mock('../src/models/Movie');
jest.mock('../src/middleware/auth', () => ({
    adminMiddleware: (req: Request, res: Response, next: NextFunction) => next(),
}));

describe('Movies Routes', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /movies', () => {
        it('should fetch all movies', async () => {
            const mockFind = jest.spyOn(Movie, 'find');
            mockFind.mockResolvedValue([
                { title: 'Inception', genre: 'Action', rating: 8.8, streamingLink: 'http://example.com' },
            ]);

            const res = await request(app).get('/movies');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    // Test cases for GET /movies/search
    describe('GET /movies/search', () => {
        it('should return movies based on the search query', async () => {
            const query = 'Inception';
            const mockFind = jest.spyOn(Movie, 'find');
            mockFind.mockResolvedValue([
                { title: 'Inception', genre: 'Action', rating: 8.8, streamingLink: 'http://example.com' },
            ]);

            const res = await request(app).get(`/movies/search?q=${query}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0].title).toContain(query);
        });

        // Handle server error scenario
        it('should handle server errors', async () => {
            const mockFind = jest.spyOn(Movie, 'find');
            mockFind.mockImplementation(() => {
                throw new Error('Database error');
            });

            const res = await request(app).get('/movies/search?q=Inception');
            expect(res.statusCode).toEqual(500);
        });

    });

    // Test cases for POST /movies
    describe('POST /movies', () => {
        // Successful movie addition
        it('should add a new movie', async () => {
            jest.mock('../src/middleware/auth', () => ({
                adminMiddleware: (req: Request, res: Response, next: NextFunction) => next(),
            }));

            const newMovie = { title: 'New Movie', genre: 'Comedy', rating: 8, streamingLink: 'http://example.com/new' };
            const mockCreate = jest.spyOn(Movie, 'create');
            const mockMovieDocument = new Movie(newMovie) as any;
            mockCreate.mockResolvedValue(mockMovieDocument);

            const res = await request(app).post('/movies').send(newMovie);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual({message: "Movie added"});
        });

    });

    // PUT /movies/:id tests
    describe('PUT /movies/:id', () => {
        // Successful movie update
        it('should update an existing movie', async () => {
            const updatedData = { title: 'Updated Movie' };
            const mock = jest.spyOn(Movie, 'findByIdAndUpdate');
            mock.mockResolvedValue({ _id: 'movieId123', ...updatedData });

            const res = await request(app).put('/movies/movieId123').send(updatedData);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ _id: 'movieId123', ...updatedData });
        });

    });

    describe('DELETE /movies/:id', () => {
        // Successful movie deletion
        it('should delete a movie', async () => {
            const mock = jest.spyOn(Movie, 'findByIdAndDelete');
            mock.mockResolvedValue(true);
            const res = await request(app).delete('/movies/movieId123');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ message: 'Movie deleted' });
        });

    });
});