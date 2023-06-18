import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';
const port = 8082
const base_url = 'http://localhost'

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({limig: "50mb"}))

app.use('/api/v1', dalleRoutes);

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello from CodeX"})
})

app.listen(port, () => console.log(`Server running on ${base_url}:${port}`))