const transitionScreen = document.getElementById("transitionScreen");
const loadingProgress = document.querySelector('.loading-progress');
const loadingScreen = document.getElementById('loadingScreen');
let progress = 0;

// 模擬 loading 進度條
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

//資料載入
fetch('https://script.google.com/macros/s/AKfycbwUXpxpsE6iC4jk-xjD1Vw9JPwGVB_SMQEs_rbv76KguMubVmkSsUoQswvXUkj3R5cjDw/exec')
    .then(response => response.json())
    .then(result => {
        const data = result.Items;
        const container = document.getElementById('about-team-container');

        if (Array.isArray(data)) {
            data.forEach((member, index) => {
                const card = document.createElement('div');
                card.classList.add('member-section');

                const imageName = ['A.png', 'B.png', 'C.png', 'D.png', 'E.png'][index % 5];
                const socialLinks = [];

                ['ig1', 'ig2'].forEach(key => {
                    if (member[key]) {
                        socialLinks.push(`<a href="${member[key]}" target="_blank" title="Instagram">
                            <i class="fa fa-instagram social-icon"></i></a>`);
                    }
                });
                ['fb1', 'fb2'].forEach(key => {
                    if (member[key]) {
                        socialLinks.push(`<a href="${member[key]}" target="_blank" title="Facebook">
                            <i class="fa fa-facebook social-icon"></i></a>`);
                    }
                });

                for (let i = 1; i <= 5; i++) {
                    const key = `other${i}`;
                    if (member[key]) {
                        socialLinks.push(`<a href="${member[key]}" target="_blank" title="其他連結">
                            <i class="fa fa-globe social-icon"></i></a>`);
                    }
                }

                card.innerHTML = `
                    <div class="member-card">
                        <div class="avatar-wrapper">
                            <img class="avatar" src="img/${imageName}" alt="頭像">
                        </div>
                        <div class="member-info">
                            <div class="name-row">
                                <div class="nickname">${member.nickname}</div>
                                <div class="realname">${member.realname}</div>
                            </div>
                            <div>${member.study}</div>
                            <div>${member.role}</div>
                            <div class="contact-info">
                                <div class="skills">${member.skills}</div>
                                <div class="mail">${member.mail}</div>
                            </div>
                            <div class="social-links">${socialLinks.join('')}</div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });

            // 等待所有圖片載入完成後再結束過場動畫
            const images = container.querySelectorAll('img');
            let loadedCount = 0;

            if (images.length === 0) {
                hideTransition();
            } else {
                images.forEach(img => {
                    if (img.complete) {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            hideTransition();
                        }
                    } else {
                        img.addEventListener('load', () => {
                            loadedCount++;
                            if (loadedCount === images.length) {
                                hideTransition();
                            }
                        });
                        img.addEventListener('error', () => {
                            loadedCount++;
                            if (loadedCount === images.length) {
                                hideTransition();
                            }
                        });
                    }
                });
            }

        } else {
            container.innerHTML = '<p>載入資料格式錯誤</p>';
            hideTransition();
        }
    })
    .catch(error => {
        console.error('載入錯誤：', error);
        document.getElementById('about-team-container').innerText = '讀取失敗，請稍後再試。';
        hideTransition();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
});
