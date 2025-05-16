const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // Set background
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, width, height);

    // Move to center of canvas
    const cx = width * 0.5;
    const cy = height * 0.5;

    // Draw shape patterns
    const shapes = 12;
    const radius = width * 0.3;

    // Save the original state
    context.save();

    // Move to center
    context.translate(cx, cy);

    // Draw outer ring
    for (let i = 0; i < shapes; i++) {
      context.save();
      context.rotate((Math.PI * 2 * i) / shapes);
      context.translate(radius, 0);

      // Draw rectangle
      context.fillStyle = i % 2 === 0 ? '#2D4263' : '#C84B31';
      context.beginPath();
      context.rect(-30, -15, 60, 30);
      context.fill();

      // Draw arc
      context.fillStyle = i % 2 === 0 ? '#191919' : '#ECDBBA';
      context.beginPath();
      context.arc(0, -50, 20, 0, Math.PI, false);
      context.fill();

      context.restore();
    }

    // Draw inner pattern
    const innerShapes = 8;
    const innerRadius = width * 0.15;

    for (let i = 0; i < innerShapes; i++) {
      context.save();
      context.rotate((Math.PI * 2 * i) / innerShapes + Math.PI / innerShapes);

      // Draw connected rectangles
      context.fillStyle = '#2D4263';
      context.beginPath();
      context.rect(-10, 0, 20, innerRadius);
      context.fill();

      // Draw arc at the end
      context.translate(0, innerRadius);
      context.fillStyle = '#ECDBBA';
      context.beginPath();
      context.arc(0, 0, 25, 0, Math.PI * 2);
      context.fill();

      context.restore();
    }

    // Draw center element
    context.fillStyle = '#C84B31';
    context.beginPath();
    context.arc(0, 0, width * 0.05, 0, Math.PI * 2);
    context.fill();

    // Restore original state
    context.restore();
  };
};

canvasSketch(sketch, settings);
