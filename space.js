// Virtual space world: a 3D starfield and neon grid floor whose vanishing point
// follows the pointer. Also publishes the smoothed pointer as --mx / --my
// (-1..1) so CSS can tilt the avatar and parallax the HUD.
(function () {
  const canvas = document.getElementById("space");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w = 0, h = 0, dpr = 1;
  const STAR_COUNT = 380;
  const stars = [];
  const pointer = { x: 0, y: 0, lastMove: -Infinity };
  const cam = { x: 0, y: 0 };
  let gridOffset = 0;

  function resetStar(s, z) {
    s.x = (Math.random() * 2 - 1) * 1.6;
    s.y = (Math.random() * 2 - 1) * 1.0;
    s.z = z ?? Math.random();
    s.hue = Math.random() < 0.5 ? 190 : 280;
  }
  for (let i = 0; i < STAR_COUNT; i++) { const s = {}; resetStar(s); stars.push(s); }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduceMotion) draw(0);
  }

  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / w) * 2 - 1;
    pointer.y = (e.clientY / h) * 2 - 1;
    pointer.lastMove = performance.now();
  }, { passive: true });

  function drawGrid(alpha, vpX, horizon) {
    if (alpha <= 0.01) return;
    const grad = ctx.createLinearGradient(0, horizon, 0, h);
    grad.addColorStop(0, `rgba(94, 231, 255, 0)`);
    grad.addColorStop(0.35, `rgba(94, 231, 255, ${0.35 * alpha})`);
    grad.addColorStop(1, `rgba(199, 125, 255, ${0.7 * alpha})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Horizontal lines rushing toward the viewer
    for (let i = 0; i < 18; i++) {
      const z = i + 1 - gridOffset;
      if (z <= 0.05) continue;
      const y = horizon + (h * 0.28) / z;
      if (y > h) continue;
      ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    // Lines converging on the vanishing point
    for (let i = -14; i <= 14; i++) {
      ctx.moveTo(vpX + i * 6, horizon);
      ctx.lineTo(vpX + i * w * 0.16, h + h * 0.5);
    }
    ctx.stroke();
    // Horizon glow
    const glow = ctx.createRadialGradient(vpX, horizon, 0, vpX, horizon, w * 0.45);
    glow.addColorStop(0, `rgba(199, 125, 255, ${0.28 * alpha})`);
    glow.addColorStop(1, "rgba(199, 125, 255, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }

  function draw(dt) {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2 - cam.x * w * 0.12;
    const cy = h / 2 - cam.y * h * 0.10;
    const fov = Math.max(w, h) * 0.55;
    const speed = reduceMotion ? 0 : dt * 0.00006;

    // Dim the stars behind body copy once the visitor scrolls past the hero.
    const floorAlpha = Math.max(0, 1 - window.scrollY / (h * 0.9));
    const starDim = 0.45 + 0.55 * floorAlpha;

    for (const s of stars) {
      s.z -= speed;
      if (s.z <= 0.02) resetStar(s, 1);
      const px = cx + (s.x / s.z) * fov * 0.5;
      const py = cy + (s.y / s.z) * fov * 0.5;
      if (px < -10 || px > w + 10 || py < -10 || py > h + 10) { if (speed) resetStar(s, 1); continue; }
      const depth = 1 - s.z;
      const r = 0.3 + depth * 1.8;
      ctx.fillStyle = `hsla(${s.hue}, 100%, ${75 + depth * 20}%, ${(0.25 + depth * 0.75) * starDim})`;
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
    }

    // The floor belongs to the hero; fade it out as the visitor scrolls on.
    drawGrid(floorAlpha, cx, h * 0.66 - cam.y * h * 0.05);
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(now - last, 50); last = now;
    // Follow the pointer; drift gently on its own when idle (and on touch screens).
    const idle = now - pointer.lastMove > 2500;
    const tx = idle ? Math.sin(now / 4200) * 0.35 : pointer.x;
    const ty = idle ? Math.cos(now / 5200) * 0.2 : pointer.y;
    cam.x += (tx - cam.x) * 0.06;
    cam.y += (ty - cam.y) * 0.06;
    root.style.setProperty("--mx", cam.x.toFixed(3));
    root.style.setProperty("--my", cam.y.toFixed(3));
    gridOffset = (gridOffset + dt * 0.0005) % 1;
    draw(dt);
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  if (reduceMotion) {
    draw(0);
    window.addEventListener("scroll", () => draw(0), { passive: true });
  } else {
    requestAnimationFrame(frame);
  }
})();
