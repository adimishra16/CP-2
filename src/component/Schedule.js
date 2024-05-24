import React, { useEffect, useState } from 'react';

const SchedulePage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/schedule');
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setMatches(data);
        } else {
          const text = await response.text();
          console.error('Non-JSON response from server:', text);
          setError('Failed to fetch matches, server returned non-JSON response');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to fetch matches');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="schedule-page">
      <h1>Upcoming Matches</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Team 1</th>
            <th>Team 2</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.mDate}</td>
              <td>{match.mTime}</td>
              <td>{match.Team1}</td>
              <td>{match.Team2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SchedulePage;
