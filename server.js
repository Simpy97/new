const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));
app.use(bodyParser.json());

let scores = [];

// Load existing scores if any
if (fs.existsSync('scores.json')) {
    const data = fs.readFileSync('scores.json');
    scores = JSON.parse(data);
}

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to submit a score
app.post('/submit-score', (req, res) => {
    const { name, score } = req.body;

    // Update or add the player's score
    const existingPlayer = scores.find(player => player.name === name);
    if (existingPlayer) {
        existingPlayer.score = Math.max(existingPlayer.score, score);
    } else {
        scores.push({ name, score });
    }

    // Sort scores in descending order
    scores.sort((a, b) => b.score - a.score);

    // Save to the file
    fs.writeFileSync('scores.json', JSON.stringify(scores));

    // Return updated scores
    res.json(scores);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
