// friendlyRocket.js
// Handles creation and animation of friendly (player) rockets

export function createFriendlyRocket(app, rockets, centerX, bottomY, bunkerHeight, mouseX, mouseY, nextExplosionId, MAX_FRIENDLY_ROCKETS, rocketIconsState, availableFriendlyRockets, drawRocketIcons, startRocketCooldown, speed = 6) {
  // Bunker roof center
  const bunkerTopX = centerX;
  const bunkerTopY = bottomY - bunkerHeight - 10;
  // Calculate velocity to aim at mouse
  const dx = mouseX - bunkerTopX;
  const dy = mouseY - bunkerTopY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const vx = dx / dist * speed;
  const vy = dy / dist * speed;
  // Create green rocket
  const rocket = new PIXI.Graphics();
  rocket.beginFill(0x00ff44);
  rocket.drawCircle(0, 0, 3);
  rocket.endFill();
  rocket.x = bunkerTopX;
  rocket.y = bunkerTopY;
  rocket.vx = vx;
  rocket.vy = vy;
  rocket.trail = [];
  rocket.maxTrailLength = 50; // Doubled from 25 for longer, more visible trails
  rocket.isPlayerRocket = true;
  rocket.targetX = mouseX;
  rocket.targetY = mouseY;
  rocket.explosionId = nextExplosionId;
  rockets.push(rocket);
  app.stage.addChild(rocket);
  // Update rocket icon state: leftmost green turns red and start cooldown for that slot
  for (let i = 0; i < MAX_FRIENDLY_ROCKETS; i++) {
    if (rocketIconsState[i]) {
      rocketIconsState[i] = false;
      availableFriendlyRockets--;
      drawRocketIcons();
      startRocketCooldown(i);
      break;
    }
  }
  return rocket;
}
