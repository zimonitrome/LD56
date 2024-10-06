import { createSignal, createEffect, For } from 'solid-js';

interface Score {
  name: string;
  score: number;
  timestamp: string;
}

const HighScoreList = () => {
  const [scores, setScores] = createSignal<Score[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  // Replace with your Google Sheets published CSV URL
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1y1-C_hKXzPTLQC4fDhsamvQC3xBRIXhR7czqJkNaWX0/gviz/tq?tqx=out:csv&sheet=scores';

  const fetchScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SHEET_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch scores');
      }
      const csvText = await response.text();
      const parsedScores = parseCSV(csvText);
      setScores(parsedScores);
    } catch (err) {
      setError('Failed to load high scores. Please try again later.');
      console.error('Error fetching scores:', err);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (csv: string): Score[] => {
    const lines = csv.split('\n');
    // Assuming the first line is the header, we skip it
    return lines.slice(1).map(line => {
      const [name, score, timestamp] = line.split(',');
      return {
        name,
        score: parseInt(score, 10),
        timestamp
      };
    }).filter(score => score.name && !isNaN(score.score))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Get top 10 scores
  };

  createEffect(() => {
    fetchScores();
  });

  return (
    <div>
      <h2>High Scores</h2>
      {loading() ? (
        <p>Loading high scores...</p>
      ) : error() ? (
        <p style="color: red">{error()}</p>
      ) : (
        <ul>
          <For each={scores()}>
            {(score, index) => (
              <li>
                {index() + 1}. {score.name} - {score.score} (
                {new Date(score.timestamp).toLocaleDateString()})
              </li>
            )}
          </For>
        </ul>
      )}
    </div>
  );
};

export default HighScoreList;