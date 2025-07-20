// starSimple.js
// Draws simple round stars for the nightsky

export function drawSimpleStars(app) {
  console.log('drawSimpleStars called');
  // Simple round star drawing logic
  const starContainer = new PIXI.Container();
  const starCount = 32;
  // Use a conservative estimate for highest building Y
  const bgMaxHeight = 220;
  const bgBaseY = app.screen.height - 120;
  const highestBuildingY = bgBaseY - bgMaxHeight;
  for (let i = 0; i < starCount; i++) {
    const star = new PIXI.Graphics();
    // Random radius: 0.7 to 2.2 px
    const radius = 0.7 + Math.random() * 1.5;
    // Lower brightness: 0.32 to 0.62
    const alpha = 0.32 + Math.random() * 0.3;
    star.beginFill(0xffffff, alpha);
    star.drawCircle(0, 0, radius);
    star.endFill();
    // Random position above highest building
    star.x = Math.random() * app.screen.width;
    // Place in upper sky, always above highest building
    const minY = 0;
    const maxY = highestBuildingY - 8;
    star.y = minY + Math.random() * (maxY - minY);
    starContainer.addChild(star);
  }
  // Add behind everything
  app.stage.addChildAt(starContainer, 0);
  window.backdropStars = starContainer;
}
