import { createSignal, createEffect, For } from 'solid-js';

interface Score {
  name: string;
  score: number;
  timestamp: string;
}
const [scores, setScores] = createSignal<Score[]>([]);
export const [scoresLoading, setScoresLoading] = createSignal(true);
const [error, setError] = createSignal<string | null>(null);

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1y1-C_hKXzPTLQC4fDhsamvQC3xBRIXhR7czqJkNaWX0/gviz/tq?tqx=out:csv&sheet=scores';

export const fetchScores = async () => {
  setScoresLoading(true);
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
    setScoresLoading(false);
  }
};

const parseCSV = (csv: string): Score[] => {
  const lines = csv.split('\n');
  // Assuming the first line is the header, we skip it
  return lines.slice(1).map(line => {
    // Use regex to split the line, handling quoted values
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const [name, score, timestamp] = values.map(v => v.replace(/^"|"$/g, '').trim());
    return {
      name,
      score: parseInt(score, 10),
      timestamp
    };
  }).filter(r => r.name && !isNaN(r.score))
    .sort((a, b) => b.score - a.score);
};

const HighScoreList = () => {
  // Dummy data for testing
  const dummyScores: Score[] = [
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
    { name: 'Alice', score: 1200, timestamp: '2023-10-01T12:00:00Z' },
    { name: 'Bob', score: 1100, timestamp: '2023-10-02T12:00:00Z' },
    { name: 'Charlie', score: 1000, timestamp: '2023-10-03T12:00:00Z' },
    { name: 'David', score: 900, timestamp: '2023-10-04T12:00:00Z' },
    { name: 'Eve', score: 800, timestamp: '2023-10-05T12:00:00Z' },
    { name: 'Frank', score: 700, timestamp: '2023-10-06T12:00:00Z' },
    { name: 'Grace', score: 600, timestamp: '2023-10-07T12:00:00Z' },
    { name: 'Heidi', score: 500, timestamp: '2023-10-08T12:00:00Z' },
    { name: 'Ivan', score: 400, timestamp: '2023-10-09T12:00:00Z' },
    { name: 'Judy', score: 300, timestamp: '2023-10-10T12:00:00Z' },
  ];

  // setScores(dummyScores);
  // setLoading(false);


  createEffect(() => {
    fetchScores();
  });

  return (
    <>
      {/* <h2>High Scores</h2> */}
      <div style={{
        "overflow-y": 'auto',
        width: "calc(100% - 6rem)",
        flex: "1 1 auto",
        "text-align": "center",
      }}>
        {scoresLoading() ? (
          <p>Loading high scores...</p>
        ) : error() ? (
          <p style="color: red">{error()}</p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <For each={scores()}>
                {(score, index) => (
                  <tr>
                    <td>{index() + 1}</td>
                    <td style={{
                      "white-space": "nowrap",
                      "overflow": "hidden",
                      "text-overflow": "ellipsis",
                      "max-width": "16ch"
                    }}>{score.name}</td>
                    <td>{score.score}</td>
                    <td>{new Date(score.timestamp).toISOString().split('T')[0]}</td>
                  </tr>
                )}
            </For>
          </tbody>
          </table>
        )}
    </div >
    </>
  );
};

export default HighScoreList;