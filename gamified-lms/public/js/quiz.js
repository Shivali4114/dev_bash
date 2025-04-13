let timer;
let timeLeft = 30;
let currentQuestionIndex = 0;
let score = 0;
let xp = 0;
let badges = [];
let questions = [
  {
    question: "What is the age of majority in most countries for legal purposes?",
    options: ["16", "18", "21", "25"],
    correctAnswer: "18"
  },
  {
    question: "What is the legal term for someone under the age of 18?",
    options: ["Minor", "Adult", "Senior", "Defendant"],
    correctAnswer: "Minor"
  },
  {
    question: "At what age can a child be legally tried as an adult in some jurisdictions?",
    options: ["14", "16", "18", "21"],
    correctAnswer: "16"
  },
  {
    question: "Which of these is a legal right of children?",
    options: ["Right to Vote", "Right to Education", "Right to Drive", "Right to Own Property"],
    correctAnswer: "Right to Education"
  },
  {
    question: "What is the best way to protect a child's rights?",
    options: ["Avoid talking to authorities", "Enforce strict punishments", "Know and assert legal rights", "Limit social interaction"],
    correctAnswer: "Know and assert legal rights"
  }
];

// Load question
function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    finishQuiz();
    return;
  }

  const question = questions[currentQuestionIndex];
  document.getElementById('question').innerText = question.question;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = ''; // Clear previous options

  question.options.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.innerText = option;
    optionDiv.onclick = () => checkAnswer(option, optionDiv);
    optionsContainer.appendChild(optionDiv);
  });

  // Reset timer
  timeLeft = 30;
  document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

  // Start timer countdown
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer('', null); // Timeout case, treat as incorrect
    }
  }, 1000);
}

// Check the answer
function checkAnswer(answer, optionDiv) {
  const question = questions[currentQuestionIndex];
  if (answer === question.correctAnswer) {
    score += 10;
    xp += Math.max(0, 30 - timeLeft); // Add XP based on time remaining
    optionDiv.classList.add('correct');
    showResult("Correct Answer! 🎉", "green");
  } else {
    optionDiv.classList.add('incorrect');
    showResult("Incorrect Answer. Try Again!", "red");
  }
}

// Show result after each answer
function showResult(message, color) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = message;
  resultDiv.style.display = 'block';
  resultDiv.style.color = color;

  setTimeout(() => {
    resultDiv.style.display = 'none';
    currentQuestionIndex++;
    loadQuestion();
  }, 1500);
}

// Finish quiz
function finishQuiz() {
  clearInterval(timer);

  // Hide quiz elements
  document.getElementById('question').style.display = 'none';
  document.getElementById('options').style.display = 'none';
  document.getElementById('timer').style.display = 'none';
  document.getElementById('points-box').style.display = 'none';
  document.getElementById('xp-box').style.display = 'none';
  document.getElementById('hint-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';

  // Show result
  document.getElementById('final-score').innerText = score;
  document.getElementById('final-xp').innerText = xp;
  document.getElementById('result-box').style.display = 'block';

  // Trigger celebration (confetti effect)
  triggerCelebration();
}

// Trigger confetti animation
function triggerCelebration() {
  const confettiElement = document.createElement('div');
  confettiElement.classList.add('confetti');
  document.body.appendChild(confettiElement);

  setTimeout(() => {
    confettiElement.remove();
  }, 4000);
}

// Restart quiz
function restartQuiz() {
  score = 0;
  xp = 0;
  currentQuestionIndex = 0;
  loadQuestion();
  document.getElementById('result-box').style.display = 'none';
}

// Start quiz
loadQuestion();
document.getElementById('restart-btn').addEventListener('click', restartQuiz);



// Start the quiz when the page loads
window.onload = loadQuestion;

function randomizeLeaderboard() {
    const leaderboard = document.querySelector('.leaderboard');
  
    setInterval(() => {
      const items = Array.from(document.querySelectorAll('.leaderboard-item'));
  
      // Update points for each item
      items.forEach(item => {
        const currentPoints = parseInt(item.dataset.points);
        const change = Math.floor(Math.random() * 101 - 50); // -50 to +50
        let newPoints = currentPoints + change;
        if (newPoints < 0) newPoints = 0;
        item.dataset.points = newPoints;
        item.dataset.change = change;
      });
  
      // Sort items by new points descending
      const sortedItems = [...items].sort((a, b) => {
        return parseInt(b.dataset.points) - parseInt(a.dataset.points);
      });
  
      leaderboard.innerHTML = '';
  
      // Re-render sorted leaderboard
      sortedItems.forEach((item, index) => {
        const newPoints = parseInt(item.dataset.points);
        const change = parseInt(item.dataset.change);
  
        item.querySelector('.rank').textContent = `${index + 1}.`;
        item.querySelector('.points').textContent = `${newPoints} Points`;
  
        const changeEl = item.querySelector('.point-change');
        if (change > 0) {
          changeEl.textContent = `+${change}`;
          changeEl.className = 'point-change up';
        } else if (change < 0) {
          changeEl.textContent = `${change}`;
          changeEl.className = 'point-change down';
        } else {
          changeEl.textContent = '';
          changeEl.className = 'point-change';
        }
  
        leaderboard.appendChild(item);
      });
    }, 5000);
  }
  
  randomizeLeaderboard();
  

  