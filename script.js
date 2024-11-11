let score = 0;
let playerName = '';
const words = ["apple", "banana", "orange", "grape", "pear"];
let selectedWord = '';
let round = 1;
const totalRounds = 5;
let scoresHistory = [];

// Start the game
document.getElementById('start-button').onclick = function () {
    playerName = document.getElementById('name').value.trim();
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }

    score = 0;
    round = 1;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('round').innerText = `Round: ${round} / ${totalRounds}`;
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('match-word').value = '';

    startNewRound();
};

// Function to start a new round
function startNewRound() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('words-container').innerText = `Find the word: ${selectedWord}`;
}

// Submit the answer
document.getElementById('submit-button').onclick = function () {
    const userWord = document.getElementById('match-word').value.trim();

    if (userWord.toLowerCase() === selectedWord.toLowerCase()) {
        score += 10;
        alert('Correct! +10 points');
    } else {
        alert('Wrong! Try again.');
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('match-word').value = '';

    if (round < totalRounds) {
        round++;
        document.getElementById('round').innerText = `Round: ${round} / ${totalRounds}`;
        startNewRound();
    } else {
        endGame();
    }
};

// Function to end the game
function endGame() {
    alert(`${playerName}, your final score is: ${score}`);
    saveScore(playerName, score);
    document.getElementById('game-area').style.display = 'none';
    displayScoreboard();
}

// Function to save score to history
function saveScore(name, score) {
    scoresHistory.push({ name, score });
    scoresHistory.sort((a, b) => b.score - a.score); // Sort in descending order of score
}

// Function to display the scoreboard
function displayScoreboard() {
    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';

    scoresHistory.forEach(entry => {
        const scoreEntry = document.createElement('div');
        scoreEntry.innerText = `${entry.name}: ${entry.score}`;
        scoreList.appendChild(scoreEntry);
    });
}
