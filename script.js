// Floating Background Elements
const floatingBg = document.getElementById('floatingBg');
const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🌿', '🪷'];
const heartEmojis = ['❤️', '💖', '💗', '💕', '💝', '💘', '💓', '💞'];
const allEmojis = [...flowerEmojis, ...heartEmojis];

function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('float-item');
    item.textContent = allEmojis[Math.floor(Math.random() * allEmojis.length)];

    const size = Math.random() * 2 + 1.5; // 1.5rem to 3.5rem
    item.style.fontSize = `${size}rem`;

    const left = Math.random() * 100;
    item.style.left = `${left}%`;

    const duration = Math.random() * 8 + 6; // 6s to 14s
    item.style.animationDuration = `${duration}s`;

    const delay = Math.random() * 5;
    item.style.animationDelay = `${delay}s`;

    floatingBg.appendChild(item);

    // Remove after animation
    setTimeout(() => {
        if (item.parentNode) item.remove();
    }, (duration + delay) * 1000);
}

// Create initial batch
for (let i = 0; i < 30; i++) {
    setTimeout(createFloatingItem, Math.random() * 5000);
}

// Keep creating more
setInterval(createFloatingItem, 800);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.content-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(box);
});

// Button interactions
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const responseMessage = document.getElementById('responseMessage');

function createConfetti() {
    const confettiEmojis = ['🎉', '✨', '🎊', '💖', '🌸', '💐', '🎈', '⭐', '💕', '🍫'];
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 40 + 20}%`;
        confetti.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        document.body.appendChild(confetti);

        setTimeout(() => {
            if (confetti.parentNode) confetti.remove();
        }, 4000);
    }
}

btnYes.addEventListener('click', () => {
    responseMessage.innerHTML = '💖 Yay! I knew it! You are the best friend forever! 💖';
    responseMessage.classList.add('show');
    createConfetti();

    // Extra celebration
    btnYes.style.transform = 'scale(1.2)';
    btnYes.textContent = '💖 Forever! 💖';
    setTimeout(() => {
        btnYes.style.transform = 'scale(1)';
    }, 300);
});

// Make the "No" button run away or show cute message
let noClickCount = 0;
const noMessages = [
    "Nooo... you can't say no! 😢",
    "Are you sure think again ? 🥺",
    "Please say yes, darling ! 💕",
    "I won't let you click no! 😤",
    "My heart is breaking... 💔",
    "Try the other button! 💖"
];

btnNo.addEventListener('click', () => {
    noClickCount++;

    // Move button to random position
    const container = btnNo.parentElement;
    const maxX = container.offsetWidth - btnNo.offsetWidth - 20;
    const maxY = container.offsetHeight - btnNo.offsetHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.transition = 'all 0.4s ease';

    // Show a cute message
    const messageIndex = Math.min(noClickCount - 1, noMessages.length - 1);
    responseMessage.innerHTML = noMessages[messageIndex];
    responseMessage.classList.add('show');

    // After 3 clicks, transform No to Yes
    if (noClickCount >= 3) {
        setTimeout(() => {
            btnNo.textContent = 'Okay, Yes! 💕';
            btnNo.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
            btnNo.style.color = 'white';
            btnNo.style.position = 'relative';
            btnNo.style.left = 'auto';
            btnNo.style.top = 'auto';
            responseMessage.innerHTML = 'Hehe, I knew you would say yes! 😊💕';
        }, 600);
    }
});

// Smooth scrolling hint
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
    setTimeout(() => {
        scrollHint.style.opacity = '0.6';
    }, 3000);
}

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    document.querySelectorAll('.content-box').forEach(box => {
        box.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });
});

// Extra floating hearts on love section
const loveSection = document.querySelector('.love-section');
if (loveSection) {
    const loveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                for (let i = 0; i < 10; i++) {
                    setTimeout(createFloatingItem, i * 200);
                }
            }
        });
    }, { threshold: 0.5 });

    loveObserver.observe(loveSection);
}

console.log('💕 for you made with Love! 💕');

