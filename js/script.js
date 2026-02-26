/* =====================================
   A Sincere Apology Website Script
   Vanilla JS - Production-ready
===================================== */

/* -------------------------------------
   1) DOM References
------------------------------------- */
const particlesContainer = document.getElementById("particles");
const confettiCanvas = document.getElementById("confetti-canvas");
const hearMeOutBtn = document.getElementById("hearMeOutBtn");
const apologyCard = document.getElementById("apologyCard");
const moveForwardBtn = document.getElementById("moveForwardBtn");
const needTimeBtn = document.getElementById("needTimeBtn");
const feedbackMessage = document.getElementById("feedbackMessage");
const bgMusic = document.getElementById("bgMusic");

/* -------------------------------------
   2) Helpers
------------------------------------- */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/* -------------------------------------
   3) Typewriter Animation
------------------------------------- */
const typeLines = [
  "Hey Han...",
  "I owe you an apology.",
  "I messed up.",
  "And I’m truly sorry."
];

function applyHanHighlight(text) {
  return text.replace("Han", '<span class="han-highlight">Han</span>');
}

async function typeSingleLine(element, text, speed = 44, shouldHighlightHan = false) {
  let output = "";

  for (let i = 0; i < text.length; i += 1) {
    output += text[i];
    element.innerHTML = `${escapeHtml(output)}<span class="cursor">|</span>`;
    await wait(speed);
  }

  const finalText = escapeHtml(output);
  element.innerHTML = shouldHighlightHan ? applyHanHighlight(finalText) : finalText;
}

async function runTypewriter() {
  for (let i = 0; i < typeLines.length; i += 1) {
    const lineElement = document.getElementById(`line-${i + 1}`);
    const isFirstLine = i === 0;
    await typeSingleLine(lineElement, typeLines[i], 44, isFirstLine);
    await wait(260);
  }
}

/* -------------------------------------
   4) Scroll Reveal
------------------------------------- */
function initRevealObserver() {
  const revealTargets = document.querySelectorAll(".reveal:not(.is-visible)");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

/* -------------------------------------
   5) Apology Card Reveal Interaction
------------------------------------- */
function initApologyInteraction() {
  hearMeOutBtn.addEventListener("click", () => {
    apologyCard.classList.remove("hidden");

    requestAnimationFrame(() => {
      apologyCard.classList.add("is-visible");
    });

    apologyCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    hearMeOutBtn.textContent = "Thank you for hearing me";
    hearMeOutBtn.disabled = true;
  });
}

/* -------------------------------------
   6) Forgiveness Buttons Behavior
------------------------------------- */
function initForgivenessActions() {
  moveForwardBtn.addEventListener("click", () => {
    feedbackMessage.textContent = "Thank you. That means more than you know.";
    launchConfetti();
  });

  needTimeBtn.addEventListener("click", () => {
    feedbackMessage.textContent = "That’s okay. I’ll be here when you’re ready.";
  });
}

/* -------------------------------------
   7) Floating Particles Generator
------------------------------------- */
function createParticles(count = 26) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";

    particle.style.setProperty("--size", `${Math.random() * 5 + 2}px`);
    particle.style.setProperty("--left", `${Math.random() * 100}%`);
    particle.style.setProperty("--opacity", (Math.random() * 0.38 + 0.12).toFixed(2));
    particle.style.setProperty("--duration", `${Math.random() * 13 + 10}s`);
    particle.style.setProperty("--delay", `${Math.random() * -20}s`);
    particle.style.setProperty("--drift-x", `${(Math.random() * 40 - 20).toFixed(0)}px`);

    fragment.appendChild(particle);
  }

  particlesContainer.appendChild(fragment);
}

/* -------------------------------------
   8) Lightweight Confetti (Canvas)
------------------------------------- */
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiActive = false;
let confettiStopTimer = null;

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function createConfettiPiece() {
  const colors = ["#c9b4ff", "#f4b8d8", "#b7d6ff", "#e8dcff", "#ffd7ea"];

  return {
    x: Math.random() * confettiCanvas.width,
    y: -10 - Math.random() * confettiCanvas.height * 0.45,
    w: Math.random() * 7 + 4,
    h: Math.random() * 9 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: Math.random() * 2.6 + 1.2,
    speedX: Math.random() * 1.6 - 0.8,
    rotate: Math.random() * Math.PI,
    rotateSpeed: Math.random() * 0.08 - 0.04,
    alpha: Math.random() * 0.45 + 0.45
  };
}

function drawConfettiFrame() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces.forEach((piece) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.rotate += piece.rotateSpeed;

    confettiCtx.save();
    confettiCtx.translate(piece.x, piece.y);
    confettiCtx.rotate(piece.rotate);
    confettiCtx.globalAlpha = piece.alpha;
    confettiCtx.fillStyle = piece.color;
    confettiCtx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
    confettiCtx.restore();
  });

  confettiPieces = confettiPieces.filter((piece) => piece.y < confettiCanvas.height + 18);
}

function animateConfetti() {
  if (!confettiActive) return;
  drawConfettiFrame();
  requestAnimationFrame(animateConfetti);
}

function launchConfetti() {
  confettiPieces = Array.from({ length: 130 }, createConfettiPiece);

  if (!confettiActive) {
    confettiActive = true;
    animateConfetti();
  }

  if (confettiStopTimer) {
    clearTimeout(confettiStopTimer);
  }

  confettiStopTimer = setTimeout(() => {
    confettiActive = false;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 2600);
}

/* -------------------------------------
   9) Optional Background Music
   Plays only after first user interaction
------------------------------------- */
let interactionHandled = false;

function tryPlayMusicOnce() {
  if (interactionHandled) return;
  interactionHandled = true;

  if (!bgMusic || !bgMusic.src) return;

  bgMusic.volume = 0.35;
  bgMusic.play().catch(() => {
    /* Autoplay policies may block playback; fail silently */
  });
}

function initOptionalMusicInteraction() {
  const events = ["click", "touchstart", "keydown"];

  events.forEach((eventName) => {
    window.addEventListener(eventName, tryPlayMusicOnce, { once: true, passive: true });
  });
}

/* -------------------------------------
   10) App Init
------------------------------------- */
function initApp() {
  resizeConfettiCanvas();
  createParticles();
  initRevealObserver();
  initApologyInteraction();
  initForgivenessActions();
  initOptionalMusicInteraction();
  runTypewriter();
}

window.addEventListener("resize", resizeConfettiCanvas);
window.addEventListener("DOMContentLoaded", initApp);
