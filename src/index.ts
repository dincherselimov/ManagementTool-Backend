import express, { Application, Request, Response } from 'express';
import apiRouter from './api';
import Users from './api/controllers/UserController';
import cors from 'cors';

// Create Express server
const app: Application = express();

// Define port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

app.use(cors());

// Mount API routes
app.use('/api', apiRouter);

app.use('/api/users', Users);


// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
