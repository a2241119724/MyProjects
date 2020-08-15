const header = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");
window.addEventListener("scroll", () => {
    let height = header.getBoundingClientRect().height;
    if (document.body.scrollTop + document.documentElement.scrollTop - height > 800) {
        if (!header.classList.contains("sticky")) {
            header.classList.add("sticky");
        }
    } else {
        header.classList.remove("sticky");
    }
    if (document.body.scrollTop + document.documentElement.scrollTop > 2000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
});

const glide = new Glide(".glide");
const captions = document.querySelectorAll(".slide-caption");
// 监听加载后,轮播后事件
glide.on(["mount.after", "run.after"], () => {
    const caption = captions[glide.index];
    // 动画
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, { start: 300 }),
        translateY: [anime.stagger([40, 10]), 0],
    })
});
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach((el) => {
        el.style.opacity = 0;
    })
})
glide.mount();

const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});
const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click", e => {
    let { target } = e; // 相当于let target = e.target;
    console.log(e);
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => {
            btn.classList.remove("active");
        });
        target.classList.add("active");
        isotope.arrange({ filter: filterOption });
    }
});

const scrollOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};
const dataSection = document.querySelector(".data-section");
// ...{}表示展开对象
ScrollReveal().reveal(".feature", {...scrollOption, interval: 350 });
ScrollReveal().reveal(".service-item", {...scrollOption, interval: 350 });
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration: 2000,
            round: 1,
            easing: "easeInExpo"
        });
        dataSection.style.backgroundPosirion = `center calc(50% - ${dataSection.getBoundingClientRect().bottom / 5})`
    }
});
window.addEventListener("scroll", () => {
    const bottom = dataSection.getBoundingClientRect().bottom;
    const top = dataSection.getBoundingClientRect().top;
    if (bottom >= 0 && top <= window.innerHeight) {
        dataSection.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
    }
});

const scroll = new SmoothScroll("nav a[href*='#'], .scrollToTop a[href*='#']", {
    header: "header",
    offset: 80,
});

document.addEventListener("scrollStart", () => {
    if (header.classList.contains("open")) {
        header.classList.remove("open");
    }
});

const exploreBtns = document.querySelectorAll(".explore-btn");
exploreBtns.forEach(exploreBtn => {
    exploreBtn.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    });
});

const menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
    header.classList.toggle("open");
});