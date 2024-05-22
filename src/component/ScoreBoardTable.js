import React, { useState, useEffect } from 'react';
import './ScoreBoardTable.css';
import { useLocation } from 'react-router-dom';

const ScoreboardTable = () => {
  const [matchData, setMatchData] = useState(null);
  const location = useLocation();
  const { mID } = location.state;

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8000/api/match/get_score/update-stream/${mID}`);

    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      setMatchData(data);
    });

    eventSource.addEventListener('error', (event) => {
      console.error('SSE error:', event);
    });

    return () => {
      eventSource.close();
    };
  }, [mID]);

  if (!matchData) {
    return <div>Loading...</div>;
  }

  const {
    battingTeam,
    batsman1,
    batsman2,
    batsman1Stats,
    batsman2Stats,
    bowler,
    bowlerStats,
    score,
    extras,
    overs,
    strikeBatsman,
    overSummary,
    wickets,
    ballsBowled,
  } = matchData;

  const battingRunRate = (score / overs).toFixed(2);

  const parsedBatsman1Stats = JSON.parse(batsman1Stats);
  const parsedBatsman2Stats = JSON.parse(batsman2Stats);
  const parsedbowlerStats = JSON.parse(bowlerStats);


  return (
    <div className="scoreboard-table">
      <div className="team-scores">
        <div className="team-score">
          <h2>{battingTeam}</h2>
          <p>
            {score}/{wickets} ({overs})  
          </p>
          <p>
          CRR:{battingRunRate}
          </p>
        </div>
      </div>
      <div className="batsmen-table">
        <h3>Batsmen</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{batsman1}</td>
              <td>{parsedBatsman1Stats.runs}</td>
              <td>{parsedBatsman1Stats.ballsFaced}</td>
              <td>{parsedBatsman1Stats.fours}</td>
              <td>{parsedBatsman1Stats.sixes}</td>
              <td>{parsedBatsman1Stats.strikeRate.toFixed(2)}</td>
            </tr>
            <tr>
              <td>{batsman2}</td>
              <td>{parsedBatsman2Stats.runs}</td>
              <td>{parsedBatsman2Stats.ballsFaced}</td>
              <td>{parsedBatsman1Stats.fours}</td>
              <td>{parsedBatsman2Stats.sixes}</td>
              <td>{parsedBatsman2Stats.strikeRate.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bowlers-table">
        <h3>Bowlers</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Overs</th>
              <th>Economy</th>
              <th>Runs</th>
              <th>Wickets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bowler}</td>
              <td>{parsedbowlerStats.overs.toFixed(1)}</td>
              <td>{parsedbowlerStats.economy.toFixed(1)}</td>
              <td>{parsedbowlerStats.runs}</td>
              <td>{wickets}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreboardTable;