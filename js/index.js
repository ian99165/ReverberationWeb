const track = document.querySelector(".carousel-track");
let slides = Array.from(track.children);
const slideCount = slides.length;
let currentIndex = 0;

for (let i = 0; i < 4; i++) {
    const clone = slides[i].cloneNode(true);
    track.appendChild(clone);
}

let totalSlides = track.children.length;

function moveToNextSlide() {
    currentIndex++;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${25 * currentIndex}vw)`;

    if (currentIndex === totalSlides - 4) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = 0;
            track.style.transform = `translateX(0vw)`;
        }, 600);
    }
}

setInterval(moveToNextSlide, 2500);

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}
let progress = 0;
const loadingProgress = document.querySelector('.loading-progress');
const loadingScreen = document.getElementById('loadingScreen');

const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    loadingProgress.style.width = progress + '%';

    if (progress >= 100) {
        clearInterval(interval);
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}, 200);

