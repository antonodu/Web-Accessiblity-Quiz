const questions = [
    {
        question: "What does the acronym WCAG stand for?",
        answers: [
            { text: "Web Content Accessibility Guidelines", correct: true},
            { text: "Website Compliance Accessibility Guide", correct: false},
            { text: "Web Compliance and Accessibility Group", correct: false},
            { text: "World Committee for Accessible Guidelines", correct: false},
        ]
    },
    {
        question: "What is the primary goal of Web Accessibility?",
        answers: [
            { text: "To create visually appealing websites", correct: false},
            { text: "To make websites usuable for everyone, including people with disabilities", correct: true},
            { text: "Web Compliance and Accessibility Group", correct: false},
            { text: "World Committee for Accessible Guidelines", correct: false},
        ]
    },
    {
        question: "What is the purpose of ARIA (Accessible Rich Internet Images)?",
        answers: [
            { text: "To improve website loading speed", correct: false},
            { text: "To enhance the appearance of websites", correct: false},
            { text: "To optimise websites for search engines", correct: false},
            { text: "To make dynamic content and user interfaces more accessible", correct: true},
        ]
    },
    {
        question: "When should ARIA be used?",
        answers: [
            { text: "Always", correct: false},
            { text: "Only for styling", correct: false},
            { text: "When HTML alone isn’t enough", correct: true},
            { text: "Never", correct: false},
        ]
    },
    {
        question: "Is accessibility only for disabled users?",
        answers: [
            { text: "Yes", correct: false},
            { text: "Mostly", correct: false},
            { text: "No", correct: true},
            { text: "Only for blind users", correct: false},
        ]
    },
    {
        question: "Why are captions important for videos?",
        answers: [
            { text: "To improve video quality", correct: false},
            { text: "To make videos more engaging", correct: false},
            { text: "To provide metadata for search engines", correct: false},
            { text: "To ensure content is accessible to users who are deaf or hard of hearing", correct: true},
        ]
    },
    {
        question: "Which of the following is an example of accessible website feature?",
        answers: [
            { text: "High constrast between text and background", correct: true},
            { text: "Images without alternative text", correct: false},
            { text: "Videos without captions", correct: false},
            { text: "Small text sizes for compact design", correct: false},
        ]
    },
    {
        question: "Why should images on a website include alt text?",
        answers: [
            { text: "To improve SEO", correct: false},
            { text: "To make images load faster", correct: false},
            { text: "To add captions below the images", correct: false},
            { text: "To describe the image content for screen readers", correct: true},
        ]
    },
    {
        question: "Which of the following is a key principle of WCAG?",
        answers: [
            { text: "Operability ", correct: true},
            { text: "Visibility", correct: false},
            { text: "Sustainability", correct: false},
            { text: "Scalability", correct: false},
        ]
    },
    {
        question: "What is keyboard accessibility?",
        answers: [
            { text: "Using shortcuts only", correct: false},
            { text: "Navigating with arrow keys only", correct: false},
            { text: "Navigating using only a keyboard", correct: true},
            { text: "Typing into inputs", correct: false},
        ]
    },
    {
        question: "How can you make keyboard navigation accessible?",
        answers: [
            { text: "Use only a mouse interaction for navigation", correct: false},
            { text: "Ensure all interactive elements are focusable", correct: true},
            { text: "Disable tabbing on form fields", correct: false},
            { text: "Avoid Keyboard shortcuts", correct: false},
        ]
    },
    {
        question: "What does perceivable mean in the context of accessibility?",
        answers: [
            { text: "Content is available in ways that can be recognised by the senses, such as sight or hearing", correct: true},
            { text: "Users can perceive all colours on the website", correct: false},
            { text: "Website loads within a perceivable amount of time", correct: false},
            { text: "Website is visible on all devices", correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();