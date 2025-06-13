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
    shakeButton: document.getElementById('shake-button'),
    resetButton: document.getElementById('reset-button'),
    moodText: document.getElementById('mood-text')
};

function resetBall() {
    elements.question.value = '';
    elements.answer.textContent = 'Ask your destiny...';
    elements.moodText.textContent = 'The oracle awaits...';
}

elements.resetButton.addEventListener('click', resetBall);

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