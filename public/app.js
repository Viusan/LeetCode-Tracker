
document.getElementById('progressForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // stops the normal page reload

    const name = document.getElementById('problemName').value;
    const description = document.getElementById('description').value;
    const difficulty = document.getElementById('difficulty').value;

    // Making HTTP req
    const res = await fetch('/api/problems', {
        method: 'POST', // POST Method cause we creating
        headers: { 'Content-Type': 'application/json' }, // Label telling we are sending in JSON 
        body: JSON.stringify({ name, difficulty, notes: description }), // Actual data we are sending in JSON formatted string
    });

    const saved = await res.json(); // Raw HTTP response
    console.log('Saved:', saved); // Print just to see the response and visually confirm if we want to
});