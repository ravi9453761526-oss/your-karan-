// Countdown to current time + 1 hour (you can adjust)
function updateCountdown() {
    const now = new Date().getTime();
    const targetTime = now + (60 * 60 * 1000); // 1 hour from now
    
    const distance = targetTime - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);

// Music control
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const button = document.getElementById('musicToggle');
    
    if (music.paused) {
        music.play().catch(e => console.log('Autoplay prevented'));
        button.textContent = '🎵 Pause Music';
    } else {
        music.pause();
        button.textContent = '🎵 Play Romantic Music';
    }
}

// Proposal functions
function acceptProposal() {
    document.querySelector('.proposal-section').style.display = 'none';
    document.getElementById('celebration').classList.remove('hidden');
    createFireworks();
    createConfetti();
    createMassPetals(); // Extra lovely petals on accept
    
    // Play celebration sound (using Web Audio API for better compatibility)
    playCelebrationSound();
}

// Extra petals for celebration
function createMassPetals() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createPetals(), i * 100);
    }
}

function showPersuasion() {
    document.getElementById('persuasion').classList.remove('hidden');
}

function hidePersuasion() {
    document.getElementById('persuasion').classList.add('hidden');
}

// Fireworks effect
function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 100);
    }
}

function createFirework() {
    const firework = document.createElement('div');
    firework.style.position = 'absolute';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = '100vh';
    firework.style.width = '4px';
    firework.style.height = '4px';
    firework.style.background = `hsl(${Math.random() * 60 + 300}, 100%, 60%)`;
    firework.style.borderRadius = '50%';
    firework.style.pointerEvents = 'none';
    firework.style.zIndex = '1001';
    
    document.querySelector('.fireworks').appendChild(firework);
    
    const animation = firework.animate([
        { transform: 'translateY(0) scale(0)', opacity: 1 },
        { transform: `translateY(-${Math.random() * 300 + 200}px) scale(1)`, opacity: 0.8 },
        { transform: `translateY(-${Math.random() * 300 + 200}px) scale(0)`, opacity: 0 }
    ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => firework.remove();
}

// Confetti effect
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = `hsl(${Math.random() * 60 + 0}, 100%, ${50 + Math.random() * 50}%)`;
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.querySelector('.confetti').appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}

// Celebration sound using Web Audio API
function playCelebrationSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Simple celebration sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Add floating hearts on load
window.addEventListener('load', () => {
    // Add more floating hearts periodically
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = `${15 + Math.random() * 15}px`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '5';
        heart.style.animation = `float ${Math.random() * 3 + 4}s linear forwards`;
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255,182,193,0.8))';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 1500);

    // Petal fall generator
    setInterval(createPetals, 3000);

    // Heart particle generator
    setInterval(createHeartParticles, 4000);
    
    updateCountdown();
});

// Petal generator
function createPetals() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 2 + 's';
            petal.style.animationDuration = (8 + Math.random() * 4) + 's';
            document.querySelector('.petals').appendChild(petal);
            
            setTimeout(() => petal.remove(), 12000);
        }, i * 200);
    }
}

// Heart particle generator
function createHeartParticles() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle-heart';
            particle.innerHTML = '💕';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 1 + 's';
            particle.style.animationDuration = (3 + Math.random() * 2) + 's';
            document.querySelector('.heart-particles').appendChild(particle);
            
            setTimeout(() => particle.remove(), 5000);
        }, i * 100);
    }
}

// Custom property for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced mouse trail hearts with trail effect
let trailHearts = [];
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.15) {
        const heart = document.createElement('div');
        heart.innerHTML = ['💖','💕','💗','💝'][Math.floor(Math.random()*4)];
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = `${12 + Math.random() * 12}px`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10';
        heart.style.opacity = '0.8';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.filter = 'drop-shadow(0 0 8px rgba(255,105,180,0.8))';
        document.body.appendChild(heart);
        
        trailHearts.push(heart);
        
        if (trailHearts.length > 8) {
            const oldHeart = trailHearts.shift();
            oldHeart.style.transition = 'all 1s ease-out';
            oldHeart.style.opacity = '0';
            oldHeart.style.transform = 'translateY(-50px) scale(1.5)';
            setTimeout(() => oldHeart.remove(), 1000);
        }
        
        // Animate current heart
        requestAnimationFrame(() => {
            heart.style.transition = 'all 2s ease-out';
            heart.style.left = (e.clientX + (Math.random() - 0.5) * 60) + 'px';
            heart.style.top = (e.clientY - 80 - Math.random() * 40) + 'px';
            heart.style.opacity = '0';
        });
    }
});
