const { Client } = require('pg');

// Function to connect to the PostgreSQL database and perform actions
async function connectAndPerformActions() {
  const dbHost = process.env.DB_HOST;
  const dbName = process.env.DB_NAME;
  const dbPort = process.env.DB_PORT;
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;

  // Create a PostgreSQL client
  const client = new Client({
    user: dbUsername,
    password: dbPassword,
    host: dbHost, // Replace with your actual database host
    database: dbName, // Replace with your actual database name
    port: dbPort, // Replace with your actual database port
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

// Function to run the connection and actions loop every 1 minutes
function runLoop() {
  const interval = 1 * 60 * 1000; // 1 minutes in milliseconds

  setInterval(async () => {
    await connectAndPerformActions();
  }, interval);
}

// Start the loop
runLoop();
