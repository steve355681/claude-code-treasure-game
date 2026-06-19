import { Router, Response } from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { score } = req.body;

  if (typeof score !== 'number') {
    res.status(400).json({ error: 'Score must be a number' });
    return;
  }

  const result = db
    .prepare('INSERT INTO game_scores (user_id, score) VALUES (?, ?)')
    .run(req.user!.id, score);

  const row = db
    .prepare('SELECT id, score, played_at FROM game_scores WHERE id = ?')
    .get(result.lastInsertRowid) as { id: number; score: number; played_at: string };

  res.status(201).json(row);
});

router.get('/', requireAuth, (req: AuthRequest, res: Response) => {
  const rows = db
    .prepare(
      'SELECT id, score, played_at FROM game_scores WHERE user_id = ? ORDER BY played_at DESC LIMIT 10'
    )
    .all(req.user!.id);

  res.json(rows);
});

export default router;
