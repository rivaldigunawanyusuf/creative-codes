const canvasSketch = require('canvas-sketch');
const { math, random } = require('canvas-sketch-util');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = () => {
  // Create an array to hold our loading bars
  const loadingBars = [];
  const numBars = 12;

  // Setup the loading bars with initial properties
  for (let i = 0; i < numBars; i++) {
    const angle = (Math.PI * 2 * i) / numBars;
    loadingBars.push({
      angle,
      scale: random.range(0.5, 1),
      speed: random.range(0.5, 1.5)
    });
  }

  return ({ context, width, height, time }) => {
    // Background
    context.fillStyle = '#111';
    context.fillRect(0, 0, width, height);

    // Center point
    const cx = width * 0.5;
    const cy = height * 0.5;

    // Move to center
    context.translate(cx, cy);

    // Draw background circle
    context.save();
    context.fillStyle = '#222';
    context.beginPath();
    context.arc(0, 0, width * 0.25, 0, Math.PI * 2);
    context.fill();
    context.restore();

    // Draw loading bars
    context.save();

    // Global rotation for the whole loading wheel
    context.rotate(time * 0.2);

    loadingBars.forEach((bar, i) => {
      context.save();

      // Rotate to the bar's position
      context.rotate(bar.angle);

      // Pulsing effect using sine wave
      const pulse = Math.sin(time * bar.speed + i * 0.3) * 0.5 + 0.5;
      const scale = math.lerp(0.5, 1.5, pulse);

      // Translate to positioning point
      context.translate(0, -width * 0.18);

      // Change color based on pulse
      const hue = math.lerp(200, 260, pulse);
      context.fillStyle = `hsl(${hue}, 80%, 60%)`;

      // Draw loading bar rectangle with pulsing size
      context.beginPath();
      context.rect(-15 * scale, -40 * scale, 30 * scale, 80 * scale);
      context.fill();

      context.restore();
    });

    context.restore();

    // Draw center circle with cutout
    context.save();

    // Outer circle
    context.fillStyle = '#222';
    context.beginPath();
    context.arc(0, 0, width * 0.08, 0, Math.PI * 2);
    context.fill();

    // Inner circle - create cutout effect
    context.fillStyle = '#111';
    context.beginPath();
    context.arc(0, 0, width * 0.05, 0, Math.PI * 2);
    context.fill();

    // Arc segments showing progress
    const progressSegments = 8;
    const arcAngle = Math.PI * 2 / progressSegments;

    for (let i = 0; i < progressSegments; i++) {
      const progress = (time * 0.5 + i) % progressSegments;

      if (progress < progressSegments - 1) {
        context.save();
        context.rotate(i * arcAngle);

        context.fillStyle = '#4285F4';
        context.beginPath();
        context.arc(0, 0, width * 0.065, -arcAngle * 0.4, arcAngle * 0.4);
        context.arc(0, 0, width * 0.055, arcAngle * 0.4, -arcAngle * 0.4, true);
        context.fill();

        context.restore();
      }
    }

    context.restore();
  };
};

canvasSketch(sketch, settings);
