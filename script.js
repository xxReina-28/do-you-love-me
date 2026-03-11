const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const cat = document.getElementById("cat");
const shareBtn = document.getElementById("shareBtn");
const loadingScreen = document.getElementById("loadingScreen");
const buttonsArea = document.getElementById("buttonsArea");

let attempts = 0;
let heartInterval = null;
let gameWon = false;

/* Cute loading screen */
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 2200);
});

/* Escape logic */
function escapeButton(event) {
  if (gameWon) return;

  if (event.type === "touchstart") {
    event.preventDefault();
  }

  attempts++;

  const areaWidth = buttonsArea.clientWidth;
  const areaHeight = buttonsArea.clientHeight;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = Math.max(areaWidth - btnWidth, 10);
  const maxY = Math.max(areaHeight - btnHeight, 10);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.right = "auto";
  noBtn.style.transform = "none";

  const grow = 1 + attempts * 0.18;
  yesBtn.style.transform = `scale(${grow})`;

  cat.style.transform = `translate(${x / 7}px, ${y / 7}px)`;

  if (attempts === 2) {
    cat.src = "sadcat.png";
    message.innerText = "Why not? 🥺";
  }

  if (attempts === 4) {
    cat.src = "crycat.png";
    message.innerText = "That hurts a little 😭";
  }

  if (attempts === 6) {
    message.innerText = "Stop running from destiny 😌";
  }

  if (attempts > 7) {
    yesBtn.style.width = "100%";
    yesBtn.style.fontSize = "28px";
    yesBtn.style.padding = "18px 24px";
  }

  if (attempts > 10) {
    noBtn.style.opacity = "0.35";
    noBtn.textContent = "too late 🙈";
  }
}

noBtn.addEventListener("mouseover", escapeButton, { passive: false });
noBtn.addEventListener("touchstart", escapeButton, { passive: false });

/* Yes click */
yesBtn.addEventListener("click", () => {
  if (gameWon) return;

  gameWon = true;
  cat.src = "lovecat.png";
  cat.style.transform = "scale(1.05)";
  message.innerHTML = "";
  typeMessage("I knew it!! You love me ❤️");
  startHeartStorm();
  shareBtn.classList.add("show");
  noBtn.style.display = "none";
  document.body.style.background = "linear-gradient(180deg, #ffc2d1, #ffe7ef)";
});

/* Typing effect */
function typeMessage(textToType) {
  let i = 0;
  const typing = setInterval(() => {
    message.innerHTML += textToType[i];
    i++;
    if (i >= textToType.length) {
      clearInterval(typing);
    }
  }, 40);
}

/* Floating burst hearts after win */
function startHeartStorm() {
  if (heartInterval) return;

  heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart-burst";
    heart.innerHTML = ["❤️", "💖", "💕", "💘"][Math.floor(Math.random() * 4)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.bottom = "-20px";
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 3500);
  }, 180);
}

/* Share button */
shareBtn.addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "Answer this honestly",
        text: "You need to answer this 😆",
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied. Now go cause chaos.");
    }
  } catch (error) {
    console.log("Share cancelled or failed:", error);
  }
});