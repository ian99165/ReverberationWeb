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

const bg = document.getElementById('bg');
const character = document.getElementById('character');
const eye = document.getElementById('eye');
const flashlight = document.getElementById('flashlight');

document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    bg.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;               // 背景最多晃動
    character.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`; // 角色較少晃動
    eye.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;       // 同步角色
    flashlight.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`; // 同步角色
});



function toggleDarkness(on) {
    if (on) {
        bg.classList.add('darken-75');
        character.classList.add('darken-75');
        eye.classList.add('darken-25');
        flashlight.classList.add('darken-25');
    } else {
        bg.classList.remove('darken-75');
        character.classList.remove('darken-75');
        eye.classList.remove('darken-25');
        flashlight.classList.remove('darken-25');
    }
}

function flashDarkness(times, interval) {
    let count = 0;
    const flashInterval = setInterval(() => {
        const on = count % 2 === 0;
        toggleDarkness(on);
        count++;
        if (count >= times * 2) clearInterval(flashInterval);
    }, interval);
}

setInterval(() => {
    flashDarkness(3, 100);
}, 6000);

let idleTimer = null;
let isIdle = false;
let autoMoveTimer = null;
let startTime = null;

// 滑鼠移動 → 重設計時器
document.addEventListener('mousemove', e => {
    resetIdle();
    updateParallax(e);
});

// 滑鼠控制畫面移動
function updateParallax(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    bg.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    character.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;
    eye.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;
    flashlight.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;
}

function resetIdle() {
    clearTimeout(idleTimer);
    if (isIdle) {
        cancelAnimationFrame(autoMoveTimer);
        isIdle = false;
    }
    idleTimer = setTimeout(() => {
        isIdle = true;
        startTime = Date.now();
        autoMove();
    }, 10000);
}

function autoMove() {
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const x = Math.sin(elapsed * 0.7) * 20; // 2Hz 速度、最大偏移量 20
    const y = 0;

    bg.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    character.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;
    eye.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;
    flashlight.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;

    autoMoveTimer = requestAnimationFrame(autoMove);
}

// 啟動時立即設置計時
resetIdle();
