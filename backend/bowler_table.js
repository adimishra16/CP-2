const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',      // Replace with your host
  user: 'root',  // Replace with your MySQL username
  password: '',  // Replace with your MySQL password
  database: 'test'  // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');

  // Create the BowlerStats table with an auto-incrementing id
  const createTableQuery = `
    CREATE TABLE BowlerStats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      player VARCHAR(100) NOT NULL,
      team VARCHAR(100) NOT NULL,
      mID INT NOT NULL,
      overs INT NOT NULL,
      runs INT NOT NULL,
      wickets INT NOT NULL,
      economy FLOAT NOT NULL
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating the table:', err);
      return;
    }
    console.log('Table BowlerStats created successfully.');
  });

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err);
      return;
    }
    console.log('Connection closed.');
  });
});
