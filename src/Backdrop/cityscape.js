// cityscape.js
// Modularized cityscape background drawing for PixiJS

export function drawCityscapeBackground(app) {
  console.log("Drawing cityscape background");
  const bgContainer = new PIXI.Container();
  // Parameters for background buildings
  const bgBuildingCount = 12;
  const bgMinWidth = 60, bgMaxWidth = 160;
  const bgMinHeight = 80, bgMaxHeight = 220;
  const bgBaseY = app.screen.height - 120;
  const bgColors = [0x1a1a2e, 0x23234a, 0x2a2a3a, 0x1a2a3a];
  const windowColors = [0x99e6ff, 0x66b3ff, 0xcccccc, 0x99ffe6];
  // Generate random background buildings
  let bgBuildings = [];
  for (let i = 0; i < bgBuildingCount; i++) {
    const w = bgMinWidth + Math.random() * (bgMaxWidth - bgMinWidth);
    const h = bgMinHeight + Math.random() * (bgMaxHeight - bgMinHeight);
    const x = Math.random() * (app.screen.width - w);
    const y = bgBaseY - h + Math.random() * 40;
    const color = bgColors[Math.floor(Math.random() * bgColors.length)];
    bgBuildings.push({ x, y, w, h, color, z: y + h });
  }
  // Sort by z (back to front)
  bgBuildings.sort((a, b) => a.z - b.z);
  // Draw each building with windows and details, no alpha stacking
  for (const b of bgBuildings) {
    const g = new PIXI.Graphics();
    // Building body (no alpha stacking, faint color)
    g.beginFill(b.color, 1.0);
    g.drawRect(0, 0, b.w, b.h);
    g.endFill();
    // Windows: grid, faint, some random lit
    const rows = Math.floor(b.h / 18);
    const cols = Math.floor(b.w / 16);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() < 0.6) continue; // Only some windows lit
        const wx = 6 + col * ((b.w - 12) / cols);
        const wy = 8 + row * ((b.h - 16) / rows);
        const ww = Math.max(6, (b.w - 12) / cols - 4);
        const wh = Math.max(8, (b.h - 16) / rows - 4);
        g.beginFill(windowColors[Math.floor(Math.random() * windowColors.length)], 0.22 + Math.random() * 0.18);
        g.drawRect(wx, wy, ww, wh);
        g.endFill();
      }
    }
    // Rooftop details: faint antenna
    if (Math.random() < 0.5) {
      g.lineStyle(2, 0x99e6ff, 0.13);
      g.moveTo(b.w * (0.2 + 0.6 * Math.random()), 0);
      g.lineTo(b.w * (0.2 + 0.6 * Math.random()), -12 - Math.random() * 18);
    }
    g.x = b.x;
    g.y = b.y;
    bgContainer.addChild(g);
  }
  // Composite into a render texture
  const rt = PIXI.RenderTexture.create({ width: app.screen.width, height: app.screen.height });
  app.renderer.render(bgContainer, { renderTexture: rt });
  const bgSprite = new PIXI.Sprite(rt);
  bgSprite.alpha = 0.32;
  app.stage.addChildAt(bgSprite, 0);
}
