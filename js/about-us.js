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

function hideTransition() {
    if (!transitionScreen) return;
    transitionScreen.classList.add("hide");
    setTimeout(() => {
        transitionScreen.style.display = "none";
    }, 1000); // 確保與 CSS 動畫時間一致
}

//=======

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

                const imageName = ['A.PNG', 'B.PNG', 'C.PNG', 'D.PNG', 'E.PNG'][index % 5];
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
                    <div class="fade-chess-bg"></div>
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
                    <img src="img/G.PNG" alt="G" class="corner-g">
                </div>
            `;
                container.appendChild(card);
            });

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