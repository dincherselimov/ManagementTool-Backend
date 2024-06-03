import express, { Application, Request, Response } from 'express';
import apiRouter from './api';
import Users from './api/controllers/UserController';

// Create Express server
const app: Application = express();

// Define port
const PORT = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
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
