import express, { Express } from 'express';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movies';

const app: Express = express();

app.use(express.json());

// Register routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;