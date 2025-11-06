import express from 'express';
import cors from 'cors';
import { initialProducts } from './data';
import { getAiAssistedAnswer } from './gemini';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.json(initialProducts);
});

app.post('/api/ai-search', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  try {
    const answer = await getAiAssistedAnswer(query, initialProducts);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI-assisted answer' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
