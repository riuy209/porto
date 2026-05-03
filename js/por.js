const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const links = document.querySelectorAll(".menu a");
const sections = document.querySelectorAll("section");

hamburger.onclick = () => {
  menu.classList.toggle("active");
};

// =========================
// SCROLL REVEAL
// =========================
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    const height = window.innerHeight;

    if (top < height - 100) {
      el.classList.add("show");
    }
  });
}

// =========================
// ACTIVE NAVBAR (INI YANG LO MAU)
// =========================
function activeMenu() {
  let scrollY = window.scrollY;

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      links.forEach(link => {
        link.classList.remove("active");
      });

      document
        .querySelector('.menu a[href="#' + id + '"]')
        .classList.add("active");
    }
  });
}

// =========================
// TEXT ANIMATION
// =========================
function wordAnim() {
  document.querySelectorAll(".word").forEach(el => {
    let words = el.innerText.split(" ");
    el.innerHTML = words.map(w => `<span>${w}</span>`).join(" ");

    el.querySelectorAll("span").forEach((span, i) => {
      setTimeout(() => span.classList.add("show"), i * 150);
    });
  });
}

function sentenceAnim() {
  document.querySelectorAll(".sentence").forEach(el => {
    let s = el.innerText.split(".");
    el.innerHTML = s
      .filter(x => x.trim())
      .map(x => `<span>${x.trim()}.</span>`)
      .join("");

    el.querySelectorAll("span").forEach((span, i) => {
      setTimeout(() => span.classList.add("show"), i * 500);
    });
  });
}

// =========================
// EVENT
// =========================
window.addEventListener("scroll", () => {
  reveal();
  activeMenu(); // ⛔ ini kunci
});

window.addEventListener("load", () => {
  reveal();
  activeMenu();
  wordAnim();
  sentenceAnim();
});
