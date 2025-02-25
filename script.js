const questions = {
    "Computer Science": [
        { question: "What does CPU stand for?", options: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"], answer: 0 },
        { question: "Which language is used for web apps?", options: ["Python", "Java", "JavaScript", "C++"], answer: 2 },
        { question: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Randomly Accessed Memory"], answer: 0 },
        { question: "What is HTML?", options: ["Programming Language", "Markup Language", "Database", "Operating System"], answer: 1 },
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Sheets", "Coded Style System"], answer: 0 },
        { question: "Which of these is not a programming language?", options: ["Python", "Java", "HTML", "C++"], answer: 2 },
        { question: "What is the main purpose of an operating system?", options: ["To run applications", "To manage hardware and software", "To create websites", "To store data"], answer: 1 },
        { question: "Which company developed Java?", options: ["Microsoft", "Sun Microsystems", "Apple", "Google"], answer: 1 },
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Query Logic", "Standard Query Language", "Server Query Language"], answer: 0 },
        { question: "Which of the following is a database?", options: ["MySQL", "Python", "Windows", "Java"], answer: 0 }
    ],
    "Statistics": [
        { question: "What is the median of {1, 3, 3, 6, 7, 8, 9}?", options: ["6", "5", "7", "4"], answer: 0 },
        { question: "What does standard deviation measure?", options: ["Mean", "Spread of data", "Mode", "Range"], answer: 1 },
        { question: "What is the probability of rolling a 6 on a fair die?", options: ["1/6", "1/2", "1/3", "1/4"], answer: 0 },
        { question: "Which measure is affected most by extreme values?", options: ["Median", "Mode", "Mean", "Range"], answer: 2 },
        { question: "What is a histogram used for?", options: ["Showing trends", "Displaying frequency", "Comparing two values", "Calculating probability"], answer: 1 },
        { question: "What is an outlier in statistics?", options: ["A common value", "An extreme value", "A repeated value", "A missing value"], answer: 1 },
        { question: "What does a normal distribution look like?", options: ["Bell curve", "Flat line", "Steep slope", "Random points"], answer: 0 },
        { question: "What is a scatter plot used for?", options: ["Comparing categories", "Showing relationships between variables", "Listing frequencies", "Displaying percentages"], answer: 1 },
        { question: "What is the mode of {2, 3, 3, 4, 4, 4, 5}?", options: ["2", "3", "4", "5"], answer: 2 },
        { question: "What is the interquartile range?", options: ["Difference between Q1 and Q3", "Sum of all values", "Median of data", "Range of all values"], answer: 0 }
    ],
    "Chemistry": [
        { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: 0 },
        { question: "What is H2O?", options: ["Oxygen", "Hydrogen Peroxide", "Water", "Hydrochloric Acid"], answer: 2 },
        { question: "What gas do plants use for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 1 },
        { question: "What is the pH of pure water?", options: ["7", "5", "3", "9"], answer: 0 },
        { question: "Which element has the highest atomic number?", options: ["Uranium", "Oxygen", "Hydrogen", "Plutonium"], answer: 3 },
        { question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], answer: 1 },
        { question: "What type of bond is found in NaCl?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], answer: 1 },
        { question: "What is the chemical symbol for silver?", options: ["Si", "Ag", "Pb", "Fe"], answer: 1 },
        { question: "What is CH4?", options: ["Methane", "Ethanol", "Butane", "Propane"], answer: 0 },
        { question: "What does the periodic table show?", options: ["Planets", "Chemical elements", "Biological cells", "Mathematical formulas"], answer: 1 }
    ],
    "Physics": [
        { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"], answer: 0 },
        { question: "What force keeps planets in orbit?", options: ["Magnetic Force", "Gravity", "Friction", "Centripetal"], answer: 1 },
        { question: "What is Newton's First Law?", options: ["Law of Gravity", "Law of Inertia", "Law of Motion", "Law of Relativity"], answer: 1 },
        { question: "What is the unit of force?", options: ["Watt", "Joule", "Newton", "Pascal"], answer: 2 },
        { question: "What is the formula for kinetic energy?", options: ["KE = mv", "KE = 1/2 mv²", "KE = mg", "KE = Fd"], answer: 1 },
        { question: "What does E=mc² represent?", options: ["Force equation", "Quantum mechanics", "Energy-mass equivalence", "Thermal expansion"], answer: 2 },
        { question: "What type of wave is light?", options: ["Sound wave", "Mechanical wave", "Electromagnetic wave", "Pressure wave"], answer: 2 },
        { question: "Which of these is a vector quantity?", options: ["Speed", "Temperature", "Distance", "Velocity"], answer: 3 },
        { question: "What is absolute zero?", options: ["0°F", "0°C", "-273.15°C", "100°C"], answer: 2 },
        { question: "What causes objects to float in water?", options: ["Gravity", "Buoyancy", "Magnetism", "Pressure"], answer: 1 }
    ]
};

let subject = "";
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startGame(selectedSubject) {
    subject = selectedSubject;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("subject-selection").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    if (!questions[subject] || questions[subject].length === 0) {
        alert("No questions available for this subject.");
        restartGame();
        return;
    }

    if (currentQuestionIndex >= 10) {
        endGame();
        return;
    }
    
    const questionData = questions[subject][currentQuestionIndex % questions[subject].length];
    document.getElementById("question").innerText = questionData.question;
    
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById("score").innerText = `Score: ${score}`;
    timeLeft = 15;
    document.getElementById("time-left").innerText = timeLeft;
    document.getElementById("time-left").style.color = "black"; // Reset timer color

    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft <= 5) {
            document.getElementById("time-left").style.color = "red";
        }
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const questionData = questions[subject][currentQuestionIndex % questions[subject].length];
    if (selectedIndex === questionData.answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function endGame() {
    clearInterval(timer);
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("final-score").innerText = `${score}/10`;
    startConfetti();
}

function restartGame() {
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("subject-selection").classList.remove("hidden");
}

/* Fun Animations */

// Confetti effect on game completion
function startConfetti() {
    if (window.confetti) {
        window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        console.warn("Confetti library not loaded.");
    }
}

// Bouncing student animation
function addBouncingStudent() {
    const student = document.createElement("div");
    student.innerHTML = "🎓";
    student.style.position = "absolute";
    student.style.fontSize = "50px";
    student.style.left = "10px";
    student.style.bottom = "10px";
    student.style.animation = "bounce 1.5s infinite";
    document.body.appendChild(student);
}

// Timer countdown animation
function animateTimer() {
    const timerElement = document.getElementById("time-left");
    timerElement.style.animation = "pulse 1s infinite";
}

// Apply animations on page load
window.onload = function() {
    addBouncingStudent();
    animateTimer();
};
