const { Client } = require('pg');

// Function to create a PostgreSQL client
function createClient() {
  const dbHost = process.env.DB_HOST;
  const dbName = process.env.DB_NAME;
  const dbPort = process.env.DB_PORT;
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;

  // Create a PostgreSQL connection URL
  const connectionString = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

  // Create a new PostgreSQL client
  return new Client({
    connectionString: connectionString,
  });
}

// Function to connect to the PostgreSQL database and perform actions
async function connectAndPerformActions() {
  const client = createClient();

  try {
    // Connect to the PostgreSQL database
    await client.connect();
    console.log(`Connected to PostgreSQL database as user: ${client.connectionParameters.user}`);

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

// Function to run the connection and actions loop every 1 minute
function runLoop() {
  const interval = 1 * 60 * 1000; // 1 minute in milliseconds

  setInterval(async () => {
    await connectAndPerformActions();
  }, interval);
}

// Start the loop
runLoop();