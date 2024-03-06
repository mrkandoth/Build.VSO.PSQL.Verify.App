const { Client } = require('pg');

// Function to connect to the PostgreSQL database and perform actions
async function connectAndPerformActions() {
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;

  // Create a PostgreSQL client
  const client = new Client({
    user: dbUsername,
    password: dbPassword,
    host: '127.0.0.1', // Replace with your actual database host
    database: 'postgres', // Replace with your actual database name
    port: 5432, // Replace with your actual database port
  });

  try {
    // Connect to the PostgreSQL database
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Execute a simple query to get current date & time
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Query result:', result.rows[0]);
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  } finally {
    // Close the database connection
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  }
}

// Function to run the connection and actions loop every 5 minutes
function runLoop() {
  const interval = 5 * 60 * 1000; // 5 minutes in milliseconds

  setInterval(async () => {
    await connectAndPerformActions();
  }, interval);
}

// Start the loop
runLoop();
