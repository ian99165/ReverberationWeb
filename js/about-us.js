
fetch('https://script.google.com/macros/s/AKfycbwUXpxpsE6iC4jk-xjD1Vw9JPwGVB_SMQEs_rbv76KguMubVmkSsUoQswvXUkj3R5cjDw/exec')
    .then(response => response.json())
    .then(result => {
        const data = result.Items;
        const container = document.getElementById('about-team-container');
        if (Array.isArray(data)) {
            data.forEach(member => {
                const card = document.createElement('div');
                card.classList.add('member-section');

                card.innerHTML = `
              <div class="member-card">
                <img class="avatar" src="https://via.placeholder.com/150" alt="頭像">
                <div class="member-info">
                  <div class="nickname">${member.nickname}</div>
                  <div class="realname"><strong>本名：</strong>${member.realname}</div>
                  <div class="role"><strong>角色：</strong>${member.role}</div>
                  <div class="skills"><strong>技能：</strong>${member.skills}</div>
                </div>
              </div>
            `;
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p>載入資料格式錯誤</p>';
        }
    })
    .catch(error => {
        console.error('載入錯誤：', error);
        document.getElementById('about-team-container').innerText = '讀取失敗，請稍後再試。';
    });

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

window.addEventListener("scroll", function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    if (window.scrollY > 50) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

document.getElementById("backToTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
