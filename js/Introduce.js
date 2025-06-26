
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

// 頁面載入完畢後隱藏 loading

function hideTransition() {
    if (!transitionScreen) return;
    transitionScreen.classList.add("hide");
    setTimeout(() => {
        transitionScreen.style.display = "none";
    }, 1000); // 確保與 CSS 動畫時間一致
}

//=======

//從試算表載入
fetch('https://script.google.com/macros/s/AKfycbwPiCF78STojhFZlclQOOed4SwbnWsSmXC3T6Iny4UtKGbiwQdcYb0VjBb3fzciyF4sLw/exec')
    .then(response => response.json())
    .then(data => {

        // 資料載入完畢後隱藏 loading 畫面
        hideTransition();
    });
