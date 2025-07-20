import express from 'express';
import { fetchViacData } from './viac-api.js';
import { parseDate } from 'tough-cookie';

const app = express();
const port = process.env.PORT || 3000;

app.get('/viac/daily-wealth', async (req, res) => {
  const portfolioIndex = parseInt(req.query.portfolio) || 0;
  const cutoffDate = req.query.cutoffDate;

  try {
    const data = await fetchViacData(portfolioIndex, cutoffDate);
    res.json({data: data});
  } catch (err) {
    console.error('🔥 Fehler beim Laden der Viac-Daten:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});

