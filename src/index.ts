import express, { Application, Request, Response } from 'express';
import apiRouter from './api';
import Users from './api/controllers/UserController';
import cors from 'cors';


const app: Application = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3001', 'https://management-tool-front.vercel.app'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
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
