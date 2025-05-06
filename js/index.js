const track = document.querySelector(".carousel-track");
let slides = Array.from(track.children);
const slideCount = slides.length;
let currentIndex = 0;

// 複製前 4 張補到尾端
for (let i = 0; i < 4; i++) {
    const clone = slides[i].cloneNode(true);
    track.appendChild(clone);
}

let totalSlides = track.children.length;

function moveToNextSlide() {
    currentIndex++;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${25 * currentIndex}vw)`;

    // 當跑到最後一張（複製品）時
    if (currentIndex === totalSlides - 4) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = 0;
            track.style.transform = `translateX(0vw)`;
        }, 600); // 等動畫播完再重設
    }
}

setInterval(moveToNextSlide, 2500);

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}
