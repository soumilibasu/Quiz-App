const questions = [
    {
        question: "Which of the following is NOT a type of machine learning?",
        answers: [
            { text: "Supervised Learning", correct: false },
            { text: "Unsupervised Learning", correct: false },
            { text: "Reinforcement Learning", correct: false },
            { text: "Quantum Learning", correct: true },
        ]
    },
    {
        question: "What does NLP stand for in the context of AI?",
        answers: [
            { text: "Neural Language Processing", correct: false },
            { text: "Natural Learning Program", correct: false },
            { text: "Neural Learning Process", correct: false },
            { text: "Natural Language Processing", correct: true },
        ]
    },
    {
        question: "Which algorithm is commonly used for classification tasks in AI?",
        answers: [
            { text: "K-Means", correct: false },
            { text: "Decision Trees", correct: true },
            { text: "K-Nearest Neighbors", correct: false },
            { text: "Gradient Descent", correct: false },
        ]
    }, {
        question: "In AI, what is a neural network primarily inspired by?",
        answers: [
            { text: "The Internet", correct: false },
            { text: "Human brain structure", correct: true },
            { text: "Solar system", correct: false },
            { text: "Quantum mechanics", correct: false },
        ]
    }, {
        question: "Which of the following is an application of computer vision?",
        answers: [
            { text: "Speech recognition", correct: false },
            { text: "Image classification", correct: true },
            { text: "Text summarization", correct: false },
            { text: "Natural language translation", correct: false },
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("Next-btn");

let currentQIndex = 0;
let score = 0;

function startQuiz() {
    currentQIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQIndex];
    let questionNo = currentQIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQIndex++;
    if (currentQIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();
