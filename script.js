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

let stats = {
    total: 0,
    positive: 0,
    negative: 0
};

const soundEffects = {
    shake: new Audio('data:audio/wav;base64,UklGRl9vT...'),
    positive: new Audio('data:audio/wav;base64,UklGRh8wX...'),
    negative: new Audio('data:audio/wav;base64,UklGRk9yY...')
};

class Particle {
    constructor(x, y) {
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        document.querySelector('.floating-particles').appendChild(this.element);
        
        this.animate();
    }
    
    animate() {
        this.element.style.animation = `particle-float ${2 + Math.random() * 2}s linear forwards`;
        this.element.addEventListener('animationend', () => {
            this.element.remove();
        });
    }
}

const elements = {
    ball: document.querySelector('.ball'),
    answer: document.getElementById('answer'),
    question: document.getElementById('question'),
    shakeButton: document.getElementById('shake-button'),
    resetButton: document.getElementById('reset-button'),
    historyList: document.getElementById('history-list'),
    moodText: document.getElementById('mood-text'),
    totalPredictions: document.getElementById('total-predictions'),
    positivePredictions: document.getElementById('positive-predictions'),
    negativePredictions: document.getElementById('negative-predictions'),
    themeSwitch: document.getElementById('theme-switch'),
    animationSwitch: document.getElementById('animation-switch'),
    soundSwitch: document.getElementById('sound-switch'),
    autoModeSwitch: document.getElementById('auto-mode-switch'),
    volumeSlider: document.getElementById('volume-slider')
};

let history = [];
let autoModeInterval;

function getRandomAnswer() {
    return answers[Math.floor(Math.random() * answers.length)];
}

function updateStats(type) {
    stats.total++;
    if (type === 'positive') stats.positive++;
    if (type === 'negative') stats.negative++;
    
    elements.totalPredictions.textContent = stats.total;
    elements.positivePredictions.textContent = stats.positive;
    elements.negativePredictions.textContent = stats.negative;
}

function updateMood(type) {
    const phrases = moodPhrases[type];
    elements.moodText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}

function createParticles() {
    const particleCount = 5;
    const ballRect = elements.ball.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        new Particle(
            ballRect.left + Math.random() * ballRect.width,
            ballRect.top + Math.random() * ballRect.height
        );
    }
}

function playSound(type) {
    if (!elements.soundSwitch.checked) return;
    
    const sound = soundEffects[type];
    if (sound) {
        sound.volume = elements.volumeSlider.value / 100;
        sound.currentTime = 0;
        sound.play();
    }
}

function shakeBall() {
    if (!elements.question.value.trim()) {
        elements.question.classList.add('shake');
        setTimeout(() => elements.question.classList.remove('shake'), 500);
        return;
    }

    elements.ball.classList.add('shake');
    elements.answer.style.opacity = '0';
    
    setTimeout(() => {
        const prediction = getRandomAnswer();
        elements.answer.textContent = prediction.text;
        elements.answer.style.opacity = '1';
        
        updateMood(prediction.type);
        createParticles();
        
        elements.ball.classList.remove('shake');
    }, 1000);
}

function resetBall() {
    elements.question.value = '';
    elements.answer.textContent = 'Ask your destiny...';
    elements.moodText.textContent = 'The oracle awaits...';
}

function initializeParticleSystem() {
    const particlesContainer = document.querySelector('.floating-particles');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.animation = `particle-float ${3 + Math.random() * 4}s linear infinite`;
            particlesContainer.appendChild(particle);
        }, i * 200);
    }
}

elements.shakeButton.addEventListener('click', shakeBall);
elements.resetButton.addEventListener('click', resetBall);

elements.question.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        shakeBall();
    }
});

elements.ball.addEventListener('click', () => {
    if (elements.question.value.trim()) {
        shakeBall();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initializeParticleSystem();
    
    setInterval(() => {
        const particles = document.querySelectorAll('.particle');
        if (particles.length > 50) {
            particles[0].remove();
        }
    }, 1000);
});