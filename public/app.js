
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

    
    e.target.reset(); // clears all inputs back to their default values
});

let problems = []; // holds everything fetched from the server

async function loadProblems() {
    const res = await fetch('/api/problems');
    problems = await res.json();

    const select = document.getElementById('problemSelect');
    select.innerHTML = '<option value="" disabled selected>Choose a problem</option>';

    problems.forEach((problem) => {
        const option = document.createElement('option');
        option.value = problem.id;
        option.textContent = problem.name;
        select.appendChild(option);
    });
}

document.getElementById('problemSelect').addEventListener('change', (e) => {
    const selectedId = Number(e.target.value);
    const selected = problems.find((p) => p.id === selectedId);
    document.getElementById('notesDisplay').textContent = selected ? selected.notes : '';
});

loadProblems(); // fetch and populate the dropdown as soon as the page loads