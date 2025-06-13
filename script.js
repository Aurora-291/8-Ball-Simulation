const answers = [
    { text: "It is certain", type: "positive" },
    { text: "It is decidedly so", type: "positive" },
    { text: "Without a doubt", type: "positive" },
    { text: "Yes definitely", type: "positive" },
    { text: "You may rely on it", type: "positive" },
    { text: "As I see it, yes", type: "positive" },
    { text: "Most likely", type: "positive" },
    { text: "Outlook good", type: "positive" },
    { text: "Yes", type: "positive" },
    { text: "Signs point to yes", type: "positive" },
    { text: "Reply hazy, try again", type: "neutral" },
    { text: "Ask again later", type: "neutral" },
    { text: "Better not tell you now", type: "neutral" },
    { text: "Cannot predict now", type: "neutral" },
    { text: "Concentrate and ask again", type: "neutral" },
    { text: "Don't count on it", type: "negative" },
    { text: "My reply is no", type: "negative" },
    { text: "My sources say no", type: "negative" },
    { text: "Outlook not so good", type: "negative" },
    { text: "Very doubtful", type: "negative" }
];

const moodPhrases = {
    positive: ["The oracle is feeling generous", "The stars align in your favor", "The mystical forces are strong"],
    neutral: ["The oracle ponders deeply", "The cosmic energy is balanced", "The spirits are contemplating"],
    negative: ["The oracle senses uncertainty", "The astral planes are turbulent", "The mystic forces are cautious"]
};

const elements = {
    ball: document.querySelector('.ball'),
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

function updateMood(type) {
    const phrases = moodPhrases[type];
    elements.moodText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}

function shakeBall() {
    if (!elements.question.value.trim()) {
        elements.question.classList.add('shake');
        setTimeout(() => elements.question.classList.remove('shake'), 500);
        return;
    }

    elements.answer.style.opacity = '0';
    
    setTimeout(() => {
        const prediction = getRandomAnswer();
        elements.answer.textContent = prediction.text;
        elements.answer.style.opacity = '1';
        
        updateMood(prediction.type);
    }, 1000);
}

elements.question.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        shakeBall();
    }
});

elements.shakeButton.addEventListener('click', shakeBall);