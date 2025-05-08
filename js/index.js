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

// 選單與回頂
function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}
document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

//過場隱藏
function hideTransition() {
    if (!transitionScreen) return;
    transitionScreen.classList.add("hide");
    setTimeout(() => {
        transitionScreen.style.display = "none";
    }, 1000); // 與 CSS transition 時間一致
}

//選單
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

//回到頂端
window.addEventListener("scroll", function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    btn.style.display = window.scrollY > 50 ? "block" : "none";
});

document.getElementById("backToTop")?.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        const overlay = document.getElementById('transitionOverlay');
        overlay.classList.add('active');

        // 等 1 秒動畫跑完再跳轉
        setTimeout(() => {
            window.location.href = href;
        }, 1000);
    });
});
