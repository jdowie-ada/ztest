fetch('/.netlify/functions/create-data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'New Item', value: 123 }), // Example data
})
.then(response => response.json())
.then(data => {
    console.log('Data created:', data);
})
.catch(error => {
    console.error('Error creating data:', error);
});