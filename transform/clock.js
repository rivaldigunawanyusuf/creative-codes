const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, time }) => {
    // Background
    context.fillStyle = '#111';
    context.fillRect(0, 0, width, height);

    // Center point
    const cx = width * 0.5;
    const cy = height * 0.5;

    // Move to center
    context.translate(cx, cy);

    // Clock face
    context.save();
    context.fillStyle = '#222';
    context.beginPath();
    context.arc(0, 0, 350, 0, Math.PI * 2);
    context.fill();

    // Outer rim
    context.fillStyle = '#333';
    context.beginPath();
    context.arc(0, 0, 320, 0, Math.PI * 2);
    context.fill();
    context.restore();

    // Hour markers - 12 rectangles around the clock
    context.save();
    for (let i = 0; i < 12; i++) {
      context.save();
      // Position each hour marker
      context.rotate((Math.PI * 2 * i) / 12);
      context.translate(0, -280);

      // Hour marker
      context.fillStyle = i % 3 === 0 ? '#c4a77d' : '#f0f0f0';
      context.beginPath();
      context.rect(-15, -40, 30, 80);
      context.fill();
      context.restore();
    }
    context.restore();

    // Get current time
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Second hand
    context.save();
    context.rotate((Math.PI * 2 * seconds) / 60);
    context.fillStyle = '#e74c3c';
    context.beginPath();
    context.rect(-2, 0, 4, -240);
    context.fill();
    context.restore();

    // Minute hand
    context.save();
    context.rotate((Math.PI * 2 * minutes) / 60 + (Math.PI * 2 * seconds) / (60 * 60));
    context.fillStyle = '#f5f5f5';
    context.beginPath();
    context.rect(-4, 0, 8, -200);
    context.fill();
    context.restore();

    // Hour hand
    context.save();
    context.rotate(
      (Math.PI * 2 * hours) / 12 +
      (Math.PI * 2 * minutes) / (12 * 60)
    );
    context.fillStyle = '#f5f5f5';
    context.beginPath();
    context.rect(-6, 0, 12, -140);
    context.fill();
    context.restore();

    // Center cap
    context.fillStyle = '#f0f0f0';
    context.beginPath();
    context.arc(0, 0, 15, 0, Math.PI * 2);
    context.fill();
  };
};

canvasSketch(sketch, settings);
