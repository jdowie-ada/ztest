// functions/create-data.js (Example POST function to create data)

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' }; // Only allow POST requests
    }
  
    try {
      const data = JSON.parse(event.body); // Parse the request body (assuming JSON)
  
      const result = await client.query(
        q.Create(q.Collection("data"), { data: data }) // Create a new document in the "data" collection
      );
  
      return {
        statusCode: 201, // 201 Created
        body: JSON.stringify(result.data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } catch (error) {
      console.error("Error creating data:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create data' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
  };