let timer;
let timeLeft = 30;
let currentQuestionIndex = 0;
let score = 0;
let xp = 0;
let lives = 3;

// Sample questions related to Child Law
const questions = [
  {
    question: "What is the age of majority in most countries for legal purposes?",
    options: ["16", "18", "21", "25"],
    correctAnswer: "18",
    hint: "It's the age at which you are considered an adult."
  },
  {
    question: "What is the legal term for someone under the age of 18?",
    options: ["Minor", "Adult", "Senior", "Defendant"],
    correctAnswer: "Minor",
    hint: "It's the opposite of an adult."
  },
  {
    question: "At what age can a child be legally tried as an adult in some jurisdictions?",
    options: ["14", "16", "18", "21"],
    correctAnswer: "16",
    hint: "It's a teenage age, but not yet an adult."
  },
  {
    question: "Which of these is a legal right of children?",
    options: ["Right to Vote", "Right to Education", "Right to Drive", "Right to Own Property"],
    correctAnswer: "Right to Education",
    hint: "This right ensures access to learning."
  },
  {
    question: "What is the best way to protect a child's rights?",
    options: ["Avoid talking to authorities", "Enforce strict punishments", "Know and assert legal rights", "Limit social interaction"],
    correctAnswer: "Know and assert legal rights",
    hint: "Knowledge is the key to defending your rights."
  }
];

// Load the next question
function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    finishQuiz();
    return;
  }

  const question = questions[currentQuestionIndex];
  document.getElementById('question').innerText = question.question;

  // Clear hint box, don't show it unless the hint button is clicked
  document.getElementById('hint-box').innerText = '';

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = ''; // Clear previous options

  question.options.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.innerText = option;
    optionDiv.onclick = () => checkAnswer(option, optionDiv);
    optionsContainer.appendChild(optionDiv);
  });

  // Update timer display
  timeLeft = 30;
  document.getElementById('timer-box').innerText = `Timer: ${timeLeft}s`;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer-box').innerText = `Timer: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

  // Update progress bar
  updateProgressBar();


// Check if answer is correct
function checkAnswer(answer, selectedOption) {
  const question = questions[currentQuestionIndex];
  const options = document.querySelectorAll('.option');

  // Disable further clicks
  options.forEach(option => option.onclick = null);

  // Highlight the selected option
  if (answer === question.correctAnswer) {
    score += 10;
    xp += 5;
    selectedOption.classList.add('correct');
  } else {
    lives--;
    selectedOption.classList.add('incorrect');
    if (lives <= 0) {
      finishQuiz();
    }
  }

  // Update points and XP
  updatePointsXP();

  // Move to the next question after a short delay (1.5 seconds)
  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 1500); // 1.5 seconds delay before moving to the next question
}

// Update the progress bar based on the question index
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
// Finish the quiz and show results
function finishQuiz() {
  clearInterval(timer);
  document.getElementById('quiz-box').style.display = 'none';
  const resultBox = document.getElementById('result-box');
  resultBox.style.display = 'block';

  document.getElementById('final-score').innerText = `Final Score: ${score}`;
  document.getElementById('badges').innerText = "Badges Earned: " + (score === 50 ? "Perfect Score" : "First Quiz Done");

// Add confetti animation on completion
showConfetti();
}

// Show confetti
function showConfetti() {
  var count = 100;
  var end = Date.now() + (15 * 1000);

  (function frame() {
    confetti({
      particleCount: count,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff0000', '#ff7300', '#fffb00', '#00ff00', '#0080ff', '#8000ff'],
      startVelocity: 25,
      ticks: 200
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}


// Show result in the quiz box
function updatePointsXP() {
  document.getElementById('points-box').innerText = `Points: ${score}`;
  document.getElementById('xp-box').innerText = `XP: ${xp}`;
}

// Hint functionality (displaying hint message inside quiz box)
document.getElementById('hint-button').onclick = function() {
  const question = questions[currentQuestionIndex];
  document.getElementById('hint-box').innerText = `Hint: ${question.hint}`;
};

// Restart the quiz after completion
document.getElementById('restart-btn').onclick = function() {
  location.reload();
};

// Load the first question when the page is ready
loadQuestion();




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
  

  