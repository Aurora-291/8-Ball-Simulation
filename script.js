const answers = [
    "It is certain",
    "It is decidedly so", 
    "Without a doubt",
    "Yes definitely",
    "You may rely on it"
];

const elements = {
    answer: document.getElementById('answer'),
    question: document.getElementById('question'),
    shakeButton: document.getElementById('shake-button')
};

function getRandomAnswer() {
    return answers[Math.floor(Math.random() * answers.length)];
}

function shakeBall() {
    if (!elements.question.value.trim()) {
        return;
    }
    
    elements.answer.textContent = getRandomAnswer();
}

elements.shakeButton.addEventListener('click', shakeBall);