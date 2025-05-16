const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = () => {
  // Pre-generate some random values for consistency
  const pregenArcs = [];
  const pregenRects = [];
  const num = 40;

  for (let i = 0; i < num; i++) {
    pregenArcs.push({
      radius: random.range(0.7, 1.3),
      start: random.range(1, -8),
      end: random.range(1, 5),
      width: random.range(5, 20),
      hue: random.range(190, 240)
    });

    pregenRects.push({
      scaleX: random.range(0.1, 2),
      scaleY: random.range(0.2, 0.5),
      offsetY: random.range(0, -0.5),
      hue: random.range(180, 220)
    });
  }

  return ({ context, width, height, time }) => {
    // Darker background for reactor effect
    context.fillStyle = '#111';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;

    const baseW = width * 0.01;
    const baseH = height * 0.1;
    let x, y;

    const num = 40;
    const baseRadius = width * 0.3;

    // Animation speed control
    const spinSpeed = 0.05;
    const pulseSpeed = 0.8;

    // Draw outer glow
    const outerGlow = context.createRadialGradient(cx, cy, baseRadius * 0.5, cx, cy, baseRadius * 1.5);
    outerGlow.addColorStop(0, 'rgba(30, 160, 255, 0.2)');
    outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = outerGlow;
    context.fillRect(0, 0, width, height);

    // Draw central core
    context.save();
    context.translate(cx, cy);

    // Pulsing core
    const coreSize = width * 0.15 + Math.sin(time * 2) * width * 0.01;
    const coreGradient = context.createRadialGradient(0, 0, 0, 0, 0, coreSize);
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    coreGradient.addColorStop(0.4, 'rgba(120, 220, 255, 0.8)');
    coreGradient.addColorStop(0.7, 'rgba(30, 160, 255, 0.3)');
    coreGradient.addColorStop(1, 'rgba(5, 90, 255, 0)');

    context.fillStyle = coreGradient;
    context.beginPath();
    context.arc(0, 0, coreSize, 0, Math.PI * 2);
    context.fill();
    context.restore();

    // Draw radiating elements
    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      // Add time-based rotation to the entire structure
      const animatedAngle = angle + time * spinSpeed;

      // Calculate position with animation
      x = cx + baseRadius * Math.sin(animatedAngle);
      y = cy + baseRadius * Math.cos(animatedAngle);

      // Pulsing effect for rectangles
      const pulse = Math.sin(time * pulseSpeed + i * 0.2) * 0.2 + 0.8;

      // Rectangle elements
      context.save();
      context.translate(x, y);
      context.rotate(-animatedAngle);
      context.scale(
        pregenRects[i].scaleX * pulse,
        pregenRects[i].scaleY * pulse
      );

      // Color variation with time
      const rectHue = (pregenRects[i].hue + time * 10) % 360;
      const brightness = 50 + Math.sin(time * 2 + i * 0.5) * 20;
      context.fillStyle = `hsl(${rectHue}, 80%, ${brightness}%)`;

      context.beginPath();
      context.rect(
        -baseW * 0.5,
        baseH * pregenRects[i].offsetY,
        baseW,
        baseH
      );
      context.fill();
      context.restore();

      // Arc elements with animation
      context.save();
      context.translate(cx, cy);
      context.rotate(-animatedAngle);

      // Pulsing line width
      const arcPulse = Math.sin(time * pulseSpeed + i * 0.3) * 0.3 + 0.7;
      context.lineWidth = pregenArcs[i].width * arcPulse;

      // Animated color
      const arcHue = (pregenArcs[i].hue + time * 15) % 360;
      context.strokeStyle = `hsla(${arcHue}, 80%, 60%, ${0.2 + arcPulse * 0.3})`;

      // Dynamic radius with breathing effect
      const arcRadius = baseRadius * pregenArcs[i].radius * (0.9 + Math.sin(time + i) * 0.1);

      // Animated start and end angles
      const startAngle = slice * pregenArcs[i].start + time * 0.2;
      const endAngle = slice * pregenArcs[i].end + time * 0.3;

      context.beginPath();
      context.arc(0, 0, arcRadius, startAngle, endAngle);
      context.stroke();

      context.restore();
    }

    // Add central reactor element
    context.save();
    context.translate(cx, cy);

    // Inner bright core
    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(0, 0, width * 0.05, 0, Math.PI * 2);
    context.fill();

    // Rotating inner elements
    const innerElements = 8;
    for (let i = 0; i < innerElements; i++) {
      context.save();
      const innerAngle = (Math.PI * 2 * i) / innerElements + time * 0.5;
      context.rotate(innerAngle);

      const elementPulse = Math.sin(time * 2 + i) * 0.2 + 0.8;
      context.fillStyle = `rgba(140, 220, 255, ${elementPulse})`;

      // Small circles orbiting the core
      context.beginPath();
      context.arc(width * 0.03, 0, width * 0.01 * elementPulse, 0, Math.PI * 2);
      context.fill();

      context.restore();
    }

    context.restore();
  };
};

canvasSketch(sketch, settings);
