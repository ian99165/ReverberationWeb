let progress = 0;
const loadingProgress = document.querySelector('.loading-progress');
const loadingScreen = document.getElementById('loadingScreen');
const transitionScreen = document.getElementById("transitionScreen");

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

// 選單 回頂
function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}
document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

// 頁面轉場
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('transitionOverlay').classList.add('active');
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 1000);
    });
});

window.addEventListener("load", () => {
    if (!transitionScreen) return;
    transitionScreen.classList.add("hide");
    setTimeout(() => {
        transitionScreen.style.display = "none";
    }, 1000); // 與 CSS 動畫時間一致
});

//=======

// 輪播功能
const track = document.querySelector(".carousel-track");
let slides = Array.from(track.children);
for (let i = 0; i < 4; i++) {
    track.appendChild(slides[i].cloneNode(true));
}
let currentIndex = 0;
const totalSlides = track.children.length;

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

