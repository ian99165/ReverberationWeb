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

// 輪播邏輯
let currentIndex = 0;
const track = document.querySelector(".custom-track");
const slides = document.querySelectorAll(".custom-track img");
const totalSlides = slides.length;
const dotsContainer = document.getElementById("customDots");

for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll(".dot");

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
}

function nextSlide() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
    pauseAutoSlide();
}
function goToSlide(i) {
    currentIndex = i;
    updateSlider();
    pauseAutoSlide();
}

let autoSlideTimer = setInterval(nextSlide, 3000);
function pauseAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setTimeout(() => {
        autoSlideTimer = setInterval(nextSlide, 3000);
    }, 1500);
}

//從試算表載入
fetch('https://script.google.com/macros/s/AKfycbwPiCF78STojhFZlclQOOed4SwbnWsSmXC3T6Iny4UtKGbiwQdcYb0VjBb3fzciyF4sLw/exec')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const leftBox = document.querySelector('.left-box');
            const rightBox = document.querySelector('.right-box');

            leftBox.innerHTML = '';
            rightBox.innerHTML = '';

            data.forEach((item, index) => {
                const leftContent = document.createElement('p');
                leftContent.textContent = item.left;

                if (index === 0) {
                    leftContent.style.fontSize = '24px';
                }

                leftBox.appendChild(leftContent);

                const rightContent = document.createElement('p');
                if (item.link && item.link.trim() !== "") {
                    rightContent.innerHTML = `
                      <a href="${item.link}" target="_blank" class="blink-link">
                        ${item.right}
                      </a>`;
                } else {
                    rightContent.textContent = item.right;
                }
                rightBox.appendChild(rightContent);
            });
        }

        hideTransition();
    });
