// enemyRocket.js
// Handles creation and animation of enemy rockets

export function createEnemyRocket(app, rockets, centerX, buildingCenters, buildingWidth, bottomY, buildingHeight, speed = 0.75) {
  const rocket = new PIXI.Graphics();
  rocket.beginFill(0xFF2222); // Red for enemy rocket
  rocket.drawCircle(0, 0, 3);
  rocket.endFill();
  // Position at middle top of screen
  rocket.x = centerX;
  rocket.y = 0;
  // Set velocity - moving downward toward building
  rocket.vx = 0;
  rocket.vy = speed;
  rocket.trail = [];
  rocket.maxTrailLength = 50; // Doubled from 25 to compensate for slower speed
  rockets.push(rocket);
  app.stage.addChild(rocket);
  return rocket;
}

export function spawnEnemyRocket(app, rockets, buildingCenters, buildingWidth, buildingHeight, bottomY, speed = 0.75) {
  // Pick a random building
  console.log("Spawning enemy rocket");
  const buildingIdx = Math.floor(Math.random() * buildingCenters.length);
  const buildingCenterX = buildingCenters[buildingIdx] + buildingWidth / 2;
  const buildingTopY = bottomY - buildingHeight;
  // Spawn rocket at random X at top
  const rocketStartX = Math.random() * app.screen.width;
  const rocketStartY = 0;
  // Calculate velocity to aim at building
  const dx = buildingCenterX - rocketStartX;
  const dy = buildingTopY - rocketStartY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const vx = dx / dist * speed;
  const vy = dy / dist * speed;
  // Create rocket
  const rocket = new PIXI.Graphics();
  rocket.beginFill(0xFF2222); // Red for enemy rocket
  rocket.drawCircle(0, 0, 3);
  rocket.endFill();
  rocket.x = rocketStartX;
  rocket.y = rocketStartY;
  rocket.vx = vx;
  rocket.vy = vy;
  rocket.trail = [];
  rocket.maxTrailLength = 50; // Doubled from 25 to compensate for slower speed
  rocket.targetBuildingIdx = buildingIdx;
  rocket.targetX = buildingCenterX;
  rocket.targetY = buildingTopY;
  rockets.push(rocket);
  app.stage.addChild(rocket);
  return rocket;
}
