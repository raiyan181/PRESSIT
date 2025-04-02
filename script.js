// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const gameThemeToggle = document.querySelector('.game-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const gameThemeIcon = document.getElementById('gameThemeIcon');
const tutorialThemeIcon = document.querySelector('.NewSec .theme-toggle i');
const startTypingBtn = document.getElementById('startTypingBtn');
const gameSection = document.getElementById('gameSection');
const startGameBtn = document.getElementById('startGameBtn');
const customizeBtn = document.getElementById('customizeBtn');
const settingsSidebar = document.getElementById('settingsSidebar');
const closeSettings = document.getElementById('closeSettings');
const overlay = document.getElementById('overlay');
const sourceText = document.getElementById('sourceText');
const userInput = document.getElementById('userInput');
const results = document.getElementById('results');
const timeCounter = document.getElementById('timeCounter');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const topBackBtn = document.getElementById('topBackBtn');
const wordLimit = document.getElementById('wordLimit');
const wordLimitValue = document.getElementById('wordLimitValue');
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const difficultySelect = document.getElementById('difficultyLevel');
const tutorialBackBtn = document.querySelector('.NewSec .tutorial-back-btn');
const tutorialBtn = document.getElementById("Tutorial");
const tutorialSection = document.querySelector(".NewSec");
const tutorialThemeToggle = document.querySelector('.NewSec .theme-toggle');

// Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Sample texts for different difficulty levels
const sampleTexts = {
    easy: "No one is perfect at the beginning, when he builds his career, he seems to be working as a noob, but inside he is always a pro. Jelous people always try to demotivate motivated person by false or lie acusission, but knowing the truth, always continues as a noob to be a real pro. Finally when he becomes a pro, all lie exposion fades away from the darkness of unreality to the society!",
    // Intermediate level text - 250 words with more complex vocabulary and sentence structure
    intermediate: "Math is a subject that can build your fututre, it is a mandotary, non-optional easy and historical subject, not only our daily life depends on it also other huge sub-topics and Topics and other subjects like Physics and CSE depends on it, programming is full of Maths understanding, even though coding is coded but the brain thinking outstanding skill, that skill you won't get from any other source -- is MATH!",
    // Hard level text - 250 words with technical terms and complex concepts
    hard: "I don't care about anyone who tries to demotivate me, fool people always die or suicide due to this type of false insultation which is absoluetly injustice by which they can't show face openly in front of the society. People always fall as a victim in this issues, But remember, i'm a man who continues for succeeding the Dream without stoping by the demotivation and insultaion, nothing can stop me in this world unless i give up, and i'll never be giving up!"
};

let isDarkMode = false;
let words = [];
let startTime;
let timer;
let gameActive = false;
let currentText = '';
let currentDifficulty = 'easy';

// Theme toggle functionality
function toggleTheme() {
    isDarkMode =!isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    gameThemeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    tutorialThemeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', toggleTheme);
gameThemeToggle.addEventListener('click', toggleTheme);
tutorialThemeIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    updateThemeIcons();
});

function updateThemeIcons() {
    const isDark = document.body.classList.contains('dark-theme');
    const allThemeIcons = document.querySelectorAll('.theme-toggle i');
    
    allThemeIcons.forEach(icon => {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Add back button functionality with animation
tutorialBackBtn.addEventListener('click', () => {
    const tutorialSection = document.querySelector('.NewSec');
    tutorialSection.style.animation = 'fadeOutDown 0.5s ease-out forwards';
    
    setTimeout(() => {
        tutorialSection.classList.remove('active');
        tutorialSection.style.animation = '';
        document.getElementById('home').classList.add('active');
    }, 500);
});

// Slider Functionality
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

showSlide(0);

// Add click events to navigation dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Event listener for difficulty change
difficultySelect.addEventListener('change', (e) => {
    currentDifficulty = e.target.value;
    // Update word limit based on current text
    const wordCount = Math.min(wordLimit.value, sampleTexts[currentDifficulty].split(' ').length);
    words = sampleTexts[currentDifficulty].split(' ').slice(0, wordCount);
    if (!gameActive) {
        sourceText.textContent = words.join(' ');
    }
});

// Game Controls
startTypingBtn.addEventListener('click', () => {
    gameSection.style.display = 'block';
    setTimeout(() => gameSection.classList.add('active'), 10);
});

function goBackToHome() {
    gameSection.classList.remove('active');
    setTimeout(() => {
        gameSection.style.display = 'none';
        resetGame();
    }, 500);
}

function startGame() {
    if (gameActive) return;
    
    // Reset game state
    gameActive = true;
    userInput.value = '';
    userInput.disabled = false;
    startTime = new Date();
    
    // Get random text
    const wordCount = Math.min(wordLimit.value, sampleTexts[currentDifficulty].split(' ').length);
    words = sampleTexts[currentDifficulty].split(' ').slice(0, wordCount);
    sourceText.textContent = words.join(' ');
    
    // Start timer
    let seconds = 0;
    timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeCounter.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);
    
    userInput.focus();
}

function endGame() {
    clearInterval(timer);
    userInput.disabled = true;
    gameActive = false;
    
    const timeElapsed = (new Date() - startTime) / 1000;
    const wordsTyped = words.length;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    
    const correctWords = words.filter((word, i) => word === userInput.value.trim().split(/\s+/)[i]).length;
    const accuracy = Math.round((correctWords / wordsTyped) * 100);
    
    document.getElementById('wpmValue').textContent = wpm;
    document.getElementById('accuracyValue').textContent = `${accuracy}%`;
    document.getElementById('timeValue').textContent = timeCounter.textContent;
    
    results.classList.add('active');
}

function resetGame() {
    clearInterval(timer);
    gameActive = false;
    userInput.value = '';
    userInput.disabled = true;
    sourceText.textContent = '';
    timeCounter.textContent = '00:00';
    results.classList.remove('active');
}

startGameBtn.addEventListener('click', startGame);
customizeBtn.addEventListener('click', openSettings);
closeSettings.addEventListener('click', closeSettingsPanel);
overlay.addEventListener('click', closeSettingsPanel);
backToHomeBtn.addEventListener('click', goBackToHome);
topBackBtn.addEventListener('click', goBackToHome);

// Settings Controls
wordLimit.addEventListener('input', (e) => {
    const value = e.target.value;
    wordLimitValue.textContent = `${value} words`;
    const wordCount = Math.min(value, sampleTexts[currentDifficulty].split(' ').length);
    words = sampleTexts[currentDifficulty].split(' ').slice(0, wordCount);
    if (!gameActive) {
        sourceText.textContent = words.join(' ');
    }
});

fontFamily.addEventListener('change', (e) => {
    userInput.style.fontFamily = e.target.value;
    sourceText.style.fontFamily = e.target.value;
});

fontSize.addEventListener('input', (e) => {
    const value = e.target.value;
    fontSizeValue.textContent = `${value}px`;
    userInput.style.fontSize = `${value}px`;
    sourceText.style.fontSize = `${value}px`;
});

function openSettings() {
    settingsSidebar.classList.add('active');
    overlay.classList.add('active');
}

function closeSettingsPanel() {
    settingsSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

userInput.addEventListener('input', () => {
    if (!gameActive) return;
    
    const typedWords = userInput.value.trim().split(/\s+/);
    const typedText = userInput.value;
    
    // Update source text with highlighting
    sourceText.innerHTML = words.map((word, index) => {
        if (index >= typedWords.length) return word;
        const isCorrect = typedWords[index] === word;
        return `<span class="${isCorrect ? 'correct' : 'incorrect'}">${word}</span>`;
    }).join(' ');
    
    if (typedWords.length === words.length) {
        endGame();
    }
});

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    successMessage.classList.add('active');
    contactForm.reset();
    setTimeout(() => {
        successMessage.classList.remove('active');
    }, 3000);
});

// Auto-typing Animation
const autoTypeTexts = [
    'Junior Web Developer',
    'Graphic Designer',
    'Fresh Freelancer',
    'WP Developer' ,
    'Youtuber'
];

function setupAutoType(elementId, texts, delay = 2000) {
    const element = document.getElementById(elementId);
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    
    function type() {
        const text = texts[currentIndex];
        
        if (isDeleting) {
            currentText = text.substring(0, currentText.length - 1);
        } else {
            currentText = text.substring(0, currentText.length + 1);
        }
        
        element.textContent = currentText + (isDeleting ? '' : '|');
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentText === text) {
            typeSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % texts.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

setupAutoType('autoType', autoTypeTexts);
setupAutoType('autoTypeSecondary', autoTypeTexts);

// Cursor-aware hover effect for about image container
const aboutContainer = document.querySelector('.about-image-container');

aboutContainer.addEventListener('mousemove', (e) => {
    const rect = aboutContainer.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse position relative to container
    const y = e.clientY - rect.top;
    
    // Convert coordinates to percentages
    const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPercent = (y / rect.height - 0.5) * 2;
    
    // Calculate rotation angles (max 15 degrees)
    const rotateX = yPercent * -15; // Inverted for natural feel
    const rotateY = xPercent * 15;
    
    aboutContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

aboutContainer.addEventListener('mouseleave', () => {
    aboutContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

// Tutorial Section
tutorialBtn.addEventListener("click", () => {
    tutorialSection.classList.add("active");
    document.getElementById('home').classList.remove('active');
});

tutorialBackBtn.addEventListener('click', () => {
    tutorialSection.style.animation = 'fadeOutDown 0.5s ease-out forwards';
    setTimeout(() => {
        tutorialSection.classList.remove('active');
        tutorialSection.style.animation = '';
        document.getElementById('home').classList.add('active');
    }, 500);
});

// disabling right-click from website:

document.addEventListener("contextmenu" , (himu)=>{
himu.preventDefault();
})