import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import scoresRouter from './routes/scores';

const app = express();
const PORT = 3100;

app.use(cors({ origin: /^http:\/\/localhost:/ }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/scores', scoresRouter);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
