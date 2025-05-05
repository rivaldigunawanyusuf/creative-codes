const canvasSketch = require('canvas-sketch');

// Define the settings for the canvas
const settings = {
  dimensions: [ 1080, 1080 ] // Set the dimensions of the canvas
};

// Define the sketch function
const sketch = () => {
  return ({ context, width, height }) => {
    // Set the background color to white
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Set the line width for drawing
    context.lineWidth = width * 0.01;

    // Define the size and spacing of the rectangles
    const w 	= width  * 0.10;
    const h 	= height * 0.10;
    const gap = width  * 0.03;
    const ix 	= width  * 0.17;
    const iy 	= height * 0.17;
    const off = width  * 0.02;

    let x, y;

    // Loop to create a grid of rectangles
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        // Draw the outer rectangle
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        // Randomly draw an inner rectangle
        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

// Start the sketch with the defined settings
canvasSketch(sketch, settings);
