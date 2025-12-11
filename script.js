const messages = [
    "I hope today is soft for you. ❤️",
    "You're doing amazing, even if you don't feel it.",
    "Proud ako sa’yo always.",
    "Please drink water, love.",
    "Your smile makes things lighter.",
    "You're a blessing more than you know.",
    "You're worth loving, always.",
    "I appreciate you. Kindly and deeply.",
    "Ang ganda mo kahit stressed ka. Promise.",
    "You're stronger than you think."
];

const heart = document.getElementById("heart");
const msg = document.getElementById("message");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

// random message + sparkles
heart.addEventListener("click", (e) => {
    const random = Math.floor(Math.random() * messages.length);
    msg.textContent = messages[random];
    msg.classList.add("show");

    setTimeout(() => msg.classList.remove("show"), 2000);

    createSparkles(e.pageX, e.pageY);
});

// sparkle effect
function createSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        document.body.appendChild(sparkle);

        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;

        sparkle.style.left = x + offsetX + "px";
        sparkle.style.top = y + offsetY + "px";

        setTimeout(() => sparkle.remove(), 1000);
    }
}

// MUSIC TOGGLE (ICON ONLY)
let playing = false;
musicBtn.addEventListener("click", () => {
    if (!playing) {
        bgMusic.play();
        musicBtn.textContent = "🔇";
        playing = true;
    } else {
        bgMusic.pause();
        musicBtn.textContent = "🎵";
        playing = false;
    }
});

// SNOWFALL EFFECT
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let flakes = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function createFlakes() {
    for (let i = 0; i < 150; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            d: Math.random() + 1
        });
    }
}

function drawFlakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    flakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    });
    ctx.fill();
    moveFlakes();
}

let angle = 0;

function moveFlakes() {
    angle += 0.01;
    flakes.forEach(f => {
        f.y += Math.pow(f.d, 2) + 1;
        f.x += Math.sin(angle) * 1;

        if (f.y > canvas.height) {
            f.y = -10;
            f.x = Math.random() * canvas.width;
        }
    });
}

function snowfall() {
    drawFlakes();
    requestAnimationFrame(snowfall);
}


createFlakes();
snowfall();
