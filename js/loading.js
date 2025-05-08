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

// 頁面轉場

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

// 頁面載入完畢後隱藏 loading
window.addEventListener("load", () => {
    if (!transitionScreen) return;
    transitionScreen.classList.add("hide");
    setTimeout(() => {
        transitionScreen.style.display = "none";
    }, 1000); // 與 CSS 動畫時間一致
});
