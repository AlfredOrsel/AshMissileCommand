// moon.js
// Draws the moon for the nightsky

export function drawMoon(app) {
  console.log('drawMoon called');
  // Moon drawing logic copied from original nightsky code
  const moonContainer = new PIXI.Container();
  // Position: top right, with some margin
  const margin = Math.min(app.screen.width, app.screen.height) * 0.07;
  const moonRadius = Math.min(app.screen.width, app.screen.height) * 0.035;
  const moonX = app.screen.width - margin - moonRadius;
  const moonY = margin + moonRadius;
  // Glow
  const moonGlow = new PIXI.Graphics();
  for (let r = moonRadius * 1.7; r > moonRadius; r -= 1.2) {
    const t = (r - moonRadius) / (moonRadius * 0.7);
    const alpha = 0.18 * Math.pow(1 - t, 2.5);
    if (alpha < 0.01) continue;
    moonGlow.beginFill(0xffffff, alpha);
    moonGlow.drawCircle(0, 0, r);
    moonGlow.endFill();
  }
  moonGlow.x = 0;
  moonGlow.y = 0;
  moonContainer.addChild(moonGlow);
  // Core (main moon disk)
  const moonCore = new PIXI.Graphics();
  moonCore.beginFill(0xffffff, 0.98);
  moonCore.drawCircle(0, 0, moonRadius);
  moonCore.endFill();
  moonCore.x = 0;
  moonCore.y = 0;
  moonContainer.addChild(moonCore);
  // Place moon
  moonContainer.x = moonX;
  moonContainer.y = moonY;
  app.stage.addChildAt(moonContainer, 0);
  window.moon = moonContainer;
}
