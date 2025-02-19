// functions/get-data.js (Netlify Function)

const faunadb = require('faunadb');
const q = faunadb.query;

// Initialize FaunaDB client (replace with your secret key)
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET, // Store secret in Netlify environment variables
  domain: process.env.FAUNADB_DOMAIN, // Optional: for custom domain
  port: process.env.FAUNADB_PORT, // Optional: for custom port
  scheme: process.env.FAUNADB_SCHEME, // Optional: for custom scheme (http or https)
});


exports.handler = async (event) => {
  try {
    // Example: Fetch all documents from a collection named "data"
    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("data"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.data.map(doc => doc.data)), // Extract data from FaunaDB response
      headers: {
        'Content-Type': 'application/json', // Important for JSON responses
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error); // Log errors for debugging

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};