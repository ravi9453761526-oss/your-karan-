// Moving hearts background
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
  heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
  heart.innerHTML = '💖';
  document.querySelector('.hearts-bg').appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);

// Audio control


// Typing effect
const text = document.querySelector('.typing-effect');
const fullText = text.textContent;
let index = 0;

function typeWriter() {
  if (index < fullText.length) {
    text.textContent = fullText.slice(0, index + 1);
    index++;
    setTimeout(typeWriter, 100);
  } else {
    text.classList.add('glow');
  }
}

setTimeout(typeWriter, 1000);

// Fade in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for sections
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelector('.hero').style.transform = `translateY(${scrolled * 0.5}px)`;
});
