import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/favicon.svg');
const publicDir = path.resolve('public');

async function generate() {
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Generate PNGs of different sizes
  console.log('Generating favicon-48x48.png...');
  const png48 = await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);

  console.log('Generating favicon-192x192.png...');
  const png192 = await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), png192);

  console.log('Generating favicon-512x512.png...');
  const png512 = await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), png512);

  console.log('Generating apple-touch-icon.png (180x180)...');
  const appleTouch = await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

  // 2. Generate standard favicon.ico containing the 48x48 PNG
  console.log('Generating favicon.ico (containing 48x48 PNG)...');
  const icoHeader = Buffer.alloc(22);
  // Header
  icoHeader.writeUInt16LE(0, 0);     // Reserved
  icoHeader.writeUInt16LE(1, 2);     // Type (1 = ICO)
  icoHeader.writeUInt16LE(1, 4);     // Image count (1)

  // Directory Entry
  icoHeader.writeUInt8(48, 6);       // Width (48)
  icoHeader.writeUInt8(48, 7);       // Height (48)
  icoHeader.writeUInt8(0, 8);        // Palette colors (0)
  icoHeader.writeUInt8(0, 9);        // Reserved (0)
  icoHeader.writeUInt16LE(1, 10);    // Color planes (1)
  icoHeader.writeUInt16LE(32, 12);   // Bits per pixel (32)
  icoHeader.writeUInt32LE(png48.length, 14); // Image data size
  icoHeader.writeUInt32LE(22, 18);   // Offset to image data (22)

  const icoBuffer = Buffer.concat([icoHeader, png48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log('All favicons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
