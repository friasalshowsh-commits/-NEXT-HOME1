import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Primary brand colors
const DEEP_GREEN = '#07583F';
const WHITE = '#FFFFFF';

// Vector definitions for the NH Monogram and Sparkle
// Hand-crafted high-fidelity paths designed for extreme crispness and professional corporate feel.
const getMonogramPaths = (color) => `
  <!-- Sparkle above the monogram -->
  <path d="M 56.5,12 C 56.5,16.5 54.5,18.5 50,19 C 54.5,19.5 56.5,21.5 56.5,26 C 56.5,21.5 58.5,19.5 63,19 C 58.5,18.5 56.5,16.5 56.5,12 Z" fill="${color}" />
  
  <!-- Intertwined NH Monogram Group -->
  <g fill="${color}">
    <!-- N Left Stem: starts with elegant flared bottom-left serif, goes up and curves over the top into the diagonal -->
    <path d="M 33,85 L 47,85 L 47,81 L 43,81 L 43,48 C 43,36 49,32 58,32 C 63,32 67,35 70,41 L 88,81 L 88,85 L 80,85 L 80,81 L 85,81 L 69,45 C 67,41 64,38 60,38 C 55,38 51,42 51,48 L 51,81 L 47,81 L 47,85 L 33,85 Z" />
    
    <!-- H Left Stem (Middle vertical stem): intertwined with N's diagonal, beautiful top flare -->
    <path d="M 53,85 L 63,85 L 63,81 L 59,81 L 59,42 C 59,38 61,35 65,35 L 65,31 L 51,31 L 51,35 C 55,35 57,38 57,42 L 57,81 L 53,81 Z" />
    
    <!-- H Right Stem: flared top and bottom serifs -->
    <path d="M 73,85 L 83,85 L 83,81 L 79,81 L 79,42 C 79,38 81,35 85,35 L 85,31 L 71,31 L 71,35 C 75,35 77,38 77,42 L 77,81 L 73,81 Z" />
    
    <!-- H Crossbar: connects H's left (middle) and right vertical stems, passing behind or blending beautifully -->
    <path d="M 59,58 L 71,58 L 71,53 L 59,53 Z" />
  </g>
`;

// 1. Icon-only Brand Mark SVG
const nextHomeMarkSvg = (color) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 5 75 90" width="100%" height="100%">
  <title>NEXT HOME | Mark</title>
  ${getMonogramPaths(color)}
</svg>`;

// 2. Primary Horizontal Logo SVG (suited for Header)
const nextHomeLogoHorizontalSvg = (color) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 70" width="100%" height="100%">
  <title>NEXT HOME</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&amp;family=IBM+Plex+Sans+Arabic:wght@700&amp;display=swap');
      .wordmark {
        font-family: 'Cinzel', serif;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.12em;
        fill: ${color};
      }
      .arabic-submark {
        font-family: 'IBM Plex Sans Arabic', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.05em;
        fill: ${color};
      }
    </style>
  </defs>
  <!-- Monogram Part -->
  <g transform="translate(10, -8) scale(0.75)">
    ${getMonogramPaths(color)}
  </g>
  <!-- Text Part -->
  <text x="82" y="34" class="wordmark">NEXT HOME</text>
  <text x="82" y="52" class="arabic-submark">نيكست هوم</text>
</svg>`;

// 3. Stacked Full Logo SVG
const nextHomeLogoStackedSvg = (color) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="100%" height="100%">
  <title>NEXT HOME | Stacked Logo</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&amp;family=IBM+Plex+Sans+Arabic:wght@700&amp;display=swap');
      .wordmark-stacked {
        font-family: 'Cinzel', serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.14em;
        fill: ${color};
        text-anchor: middle;
      }
      .arabic-stacked {
        font-family: 'IBM Plex Sans Arabic', sans-serif;
        font-size: 16px;
        font-weight: 700;
        fill: ${color};
        text-anchor: middle;
      }
    </style>
  </defs>
  <!-- Centered Monogram Part -->
  <g transform="translate(50, 0) scale(1.0)">
    ${getMonogramPaths(color)}
  </g>
  <!-- Stacked Wordmarks -->
  <text x="100" y="112" class="wordmark-stacked">NEXT HOME</text>
  <text x="100" y="142" class="arabic-stacked">نيكست هوم</text>
</svg>`;

// Helper function to write simple ICO binary containing a single 48x48 PNG image
function createIcoFromPng(pngBuffer) {
  const buf = Buffer.alloc(22 + pngBuffer.length);
  // ICO Header
  buf.writeUInt16LE(0, 0); // Reserved
  buf.writeUInt16LE(1, 2); // Image type (1 = ICO)
  buf.writeUInt16LE(1, 4); // Number of images
  
  // Icon Directory Entry
  buf.writeUInt8(48, 6); // Width (48)
  buf.writeUInt8(48, 7); // Height (48)
  buf.writeUInt8(0, 8);  // Color palette
  buf.writeUInt8(0, 9);  // Reserved
  buf.writeUInt16LE(1, 10); // Color planes
  buf.writeUInt16LE(32, 12); // Bits per pixel
  buf.writeUInt32LE(pngBuffer.length, 14); // Image size
  buf.writeUInt32LE(22, 18); // Image offset
  
  pngBuffer.copy(buf, 22);
  return buf;
}

async function run() {
  const brandDir = path.resolve('public/brand');
  const publicDir = path.resolve('public');
  
  // Create directories if they don't exist
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }

  console.log('Writing vector SVG logo system...');

  // Write SVGs to public/brand/
  fs.writeFileSync(path.join(brandDir, 'next-home-mark.svg'), nextHomeMarkSvg(DEEP_GREEN));
  fs.writeFileSync(path.join(brandDir, 'next-home-logo-horizontal.svg'), nextHomeLogoHorizontalSvg(DEEP_GREEN));
  fs.writeFileSync(path.join(brandDir, 'next-home-logo-stacked.svg'), nextHomeLogoStackedSvg(DEEP_GREEN));
  
  fs.writeFileSync(path.join(brandDir, 'next-home-mark-white.svg'), nextHomeMarkSvg(WHITE));
  fs.writeFileSync(path.join(brandDir, 'next-home-logo-horizontal-white.svg'), nextHomeLogoHorizontalSvg(WHITE));
  fs.writeFileSync(path.join(brandDir, 'next-home-logo-stacked-white.svg'), nextHomeLogoStackedSvg(WHITE));

  // Also write favicon.svg as a direct copy of the green mark
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), nextHomeMarkSvg(DEEP_GREEN));

  console.log('Successfully wrote SVG assets! Starting PNG rendering via sharp...');

  // Use sharp to render the green mark SVG to different sized high-quality PNGs
  const markSvgBuffer = Buffer.from(nextHomeMarkSvg(DEEP_GREEN));
  const whiteMarkSvgBuffer = Buffer.from(nextHomeMarkSvg(WHITE));

  // Render PWA icons / Favicon PNGs
  const png48 = await sharp(markSvgBuffer).resize(48, 48).png().toBuffer();
  const png192 = await sharp(markSvgBuffer).resize(192, 192).png().toBuffer();
  
  // For maskable PWA 512x512 icon, use a deep green background with a padded white mark in the center
  const whiteMarkResized = await sharp(whiteMarkSvgBuffer).resize(340, 340).png().toBuffer();
  const png512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: DEEP_GREEN
    }
  })
  .composite([{ input: whiteMarkResized, gravity: 'center' }])
  .png()
  .toBuffer();

  // For apple-touch-icon, let's use the green mark with safe-area padding on white background
  const greenMarkPadded = await sharp(markSvgBuffer).resize(120, 120).png().toBuffer();
  const appleTouchIcon = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: WHITE
    }
  })
  .composite([{ input: greenMarkPadded, gravity: 'center' }])
  .png()
  .toBuffer();

  // Write PNG files to disk
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), png512);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchIcon);

  console.log('PNG files written. Creating favicon.ico...');

  // Write valid ICO from 48x48 PNG
  const icoBuffer = createIcoFromPng(png48);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log('All brand assets successfully generated and verified!');
}

run().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
