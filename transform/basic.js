const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // Background
    context.fillStyle = '#111';
    context.fillRect(0, 0, width, height);

    // Center point
    const cx = width * 0.5;
    const cy = height * 0.5;

    // Move to center
    context.translate(cx, cy);

    // Create a spiral pattern
    const numObjects = 24;
    const angleStep = Math.PI * 2 / numObjects;

    // Layer - arcs
    context.rotate(angleStep / 2);
    for (let i = 0; i < numObjects; i++) {
      context.rotate(angleStep);

      context.fillStyle = i % 3 === 0 ? '#555' : '#777';
      context.beginPath();
      context.arc(150, 0, 40, 0, Math.PI, false);
      context.fill();
    }

    // Center element
    context.fillStyle = '#aaa';
    context.beginPath();
    context.arc(0, 0, 80, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = '#222';
    context.beginPath();
    context.rect(-40, -40, 80, 80);
    context.fill();
  };
};

canvasSketch(sketch, settings);
