# Creative Codes

My collection of Creative Coding is dedicated to learning and hopefully helping people learn too


## Authors

- [@rivaldigunawanyusuf](https://www.github.com/rivaldigunawanyusuf)

## Attribution

- [canvas-sketch](https://github.com/mattdesl/canvas-sketch) - canvas-sketch is a loose collection of tools, modules, and resources for creating generative art in JavaScript and the browser. Created by [mattdesl](https://github.com/mattdesl). Click the link to access [How to use Canvas Sketch](#how-to-use-canvas-sketch) in this project.
- [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util) - A collection of utilities for working with canvas-sketch, including math helpers, random number generators, and more. Created by [mattdesl](https://github.com/mattdesl).
- [@ffmpeg-installer/ffmpeg](https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg) - Platform independent binary installer of FFmpeg for node projects. Used for recording canvas-sketch animations to video. Click the link to access [Recording Canvas Sketch to Video](#recording-canvas-sketch-to-video) in this project.

## How to use Canvas Sketch

Run the following command in the terminal to start a specific sketch:
```bash
# Command for terminal
npx canvas-sketch sketches/sketch-filename.js
```

## Recording Canvas Sketch to Video

To record your canvas-sketch animations, use the stream output feature:

```bash
# Command to start canvas-sketch with recording capability
npx canvas-sketch folder/file.js --output=folder_output/sub_folder_output --stream
```

**Recording Controls:**
- **Start Recording**: `Ctrl + Shift + S` (Windows/Linux) or `Cmd + Shift + S` (Mac)
- **Stop Recording**: `Ctrl + Shift + S` (Windows/Linux) or `Cmd + Shift + S` (Mac)

The recorded video will be saved to the specified output folder.

## License

This project is licensed under the CC0-1.0 License (Creative Commons Zero v1.0 Universal).
- **No Copyright**: Creator waives all copyright and related rights
- **Public Domain**: Work is effectively placed in the public domain
- **No Restrictions**: Anyone can freely use, modify, and distribute the work
- **No Attribution Required**: You don't need to credit the original creator
- **Commercial Use Allowed**: Can be used for commercial purposes without permission
- **No Warranties**: The work is provided "as is"
