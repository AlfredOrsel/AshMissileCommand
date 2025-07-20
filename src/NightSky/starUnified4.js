// starUnified4.js
// Draws 4-spiked unified stars for the nightsky

export function drawUnifiedStar4(app) {
  // 4-spiked unified star drawing logic
  function makeUnifiedStar() {
    const star = new PIXI.Container();
    // Glow
    const glow = new PIXI.Graphics();
    const glowRadius = Math.min(app.screen.width, app.screen.height) * 0.027;
    const coreRadius = Math.max(0.5, glowRadius * 0.09);
    for (let r = glowRadius; r > 0; r -= 0.5) {
      const t = r / glowRadius;
      const alpha = 0.13 * Math.pow(1 - t, 2.5);
      if (alpha < 0.003) continue;
      glow.beginFill(0xffffff, alpha);
      glow.drawCircle(0, 0, r);
      glow.endFill();
    }
    glow.x = 0;
    glow.y = 0;
    star.addChild(glow);
    // Core
    const core = new PIXI.Graphics();
    core.beginFill(0xffffff, 0.32);
    core.drawCircle(0, 0, coreRadius);
    core.endFill();
    core.x = 0;
    core.y = 0;
    star.addChild(core);
    // Spikes (4 directions)
    const spikeLength = glowRadius * 2.45 * 2 * 0.75;
    const spikeLengthH = spikeLength * 2.08;
    const spikeLengthV = spikeLength * 0.54;
    const spikeWidth = Math.max(1.2, glowRadius * 0.13);
    const fadeStepsH = 18;
    const fadeStepsV = 38;
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const [dx, dy] of directions) {
      const perp = [-dy, dx];
      const isHorizontal = dx !== 0 && dy === 0;
      const fadeSteps = isHorizontal ? fadeStepsH : fadeStepsV;
      for (let i = 0; i < fadeSteps; i++) {
        const t = i / fadeSteps;
        const alpha = isHorizontal
          ? 0.06 * (1 - t) * (1 - t)
          : 0.06 * Math.pow(1 - t, 2.7);
        if (alpha < 0.005) continue;
        const g = new PIXI.Graphics();
        g.beginFill(0xffffff, alpha);
        let startLen = isHorizontal ? coreRadius : coreRadius * 0.85;
        let len = startLen + t * ((isHorizontal ? spikeLengthH : spikeLengthV) - startLen);
        let w = spikeWidth * (1 - t * 0.7);
        let x0 = dx * startLen + perp[0] * (-w / 2);
        let y0 = dy * startLen + perp[1] * (-w / 2);
        let x1 = dx * startLen + perp[0] * (w / 2);
        let y1 = dy * startLen + perp[1] * (w / 2);
        let x2 = dx * len + perp[0] * (w / 2);
        let y2 = dy * len + perp[1] * (w / 2);
        let x3 = dx * len + perp[0] * (-w / 2);
        let y3 = dy * len + perp[1] * (-w / 2);
        if (isHorizontal) {
          x0 *= app.screen.height / app.screen.width;
          x1 *= app.screen.height / app.screen.width;
          x2 *= app.screen.height / app.screen.width;
          x3 *= app.screen.height / app.screen.width;
        }
        if (dy !== 0 && dx === 0) {
          y0 *= app.screen.width / app.screen.height;
          y1 *= app.screen.width / app.screen.height;
          y2 *= app.screen.width / app.screen.height;
          y3 *= app.screen.width / app.screen.height;
        }
        g.moveTo(x0, y0);
        g.lineTo(x1, y1);
        g.lineTo(x2, y2);
        g.lineTo(x3, y3);
        g.closePath();
        g.endFill();
        g.x = 0;
        g.y = 0;
        star.addChild(g);
      }
    }
    // Ring
    const ring = new PIXI.Graphics();
    const ringInner = coreRadius * 0.33;
    const ringOuter = coreRadius * 0.33 + Math.max(1.0, glowRadius * 0.07);
    for (let r = ringOuter; r > ringInner; r -= 0.3) {
      const t = (r - ringInner) / (ringOuter - ringInner);
      const alpha = 0.13 * (1 - t) + 0.03 * t;
      ring.beginFill(0xffffff, alpha);
      ring.drawCircle(0, 0, r);
      ring.endFill();
    }
    ring.x = 0;
    ring.y = 0;
    star.addChild(ring);
    star.pivot.set(0, 0);
    return star;
  }
  // Place 4-5 randomly scattered 4-spiked stars in the sky
  const numStars = 4 + Math.floor(Math.random() * 2);
  const starObjs = [];
  const bgMaxHeight = 220;
  const bgBaseY = app.screen.height - 120;
  const highestBuildingY = bgBaseY - bgMaxHeight;
  for (let i = 0; i < numStars; i++) {
    const star = makeUnifiedStar();
    star.x = Math.random() * app.screen.width;
    const minY = 0;
    const maxY = highestBuildingY - 16;
    star.y = minY + Math.random() * (maxY - minY);
    star.rotation = Math.random() * Math.PI * 2;
    app.stage.addChildAt(star, 0);
    starObjs.push(star);
  }
  window.skyStars4 = starObjs;
}
