const mysql = require('mysql');

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost', // Change this to your MySQL host
    user: 'root', // Change this to your MySQL username
    password: '', // Change this to your MySQL password
    database: 'test' // Change this to your MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// SQL query to create the table
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS CricketScoreboard (
        id INT AUTO_INCREMENT PRIMARY KEY,
        batsman1 VARCHAR(255),
        batsman2 VARCHAR(255),
        batsman1_runs INT,
        batsman1_balls INT,
        batsman1_fours INT,
        batsman1_sixes INT,
        batsman1_ballsFaced INT,
        batsman1_strikeRate FLOAT,
        batsman2_runs INT,
        batsman2_balls INT,
        batsman2_fours INT,
        batsman2_sixes INT,
        batsman2_ballsFaced INT,
        batsman2_strikeRate FLOAT,
        batsman1Locked BOOLEAN,
        batsman2Locked BOOLEAN,
        bowler VARCHAR(255),
        bowler_overs FLOAT,
        bowler_runs INT,
        bowler_wickets INT,
        bowler_economy FLOAT,
        bowlerLocked BOOLEAN,
        score INT,
        extras_wide INT,
        extras_noBall INT,
        extras_legByes INT,
        isWicketDialogOpen BOOLEAN,
        selectedWicketOption VARCHAR(255),
        overs FLOAT,
        strikeBatsman INT,
        overSummary TEXT,
        wickets INT,
        ballsBowled INT,
        batsmen TEXT,
        bowlers TEXT,
        battingTeam VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

// Execute the query to create the table
connection.query(createTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating table: ' + err.stack);
        return;
    }
    console.log('Table "CricketScoreboard" created successfully');
});

// Close MySQL connection
connection.end();
