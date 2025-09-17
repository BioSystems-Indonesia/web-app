const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '..', 'src', 'assets', 'img', 'line');

if (!fs.existsSync(folder)) {
  console.error('Folder not found:', folder);
  process.exit(1);
}

const files = fs.readdirSync(folder).filter((f) => f.endsWith('.svg'));
let changed = 0;

files.forEach((file) => {
  const filePath = path.join(folder, file);
  let src = fs.readFileSync(filePath, 'utf8');

  // Remove self-closing <circle .../> tags and <circle>...</circle> blocks
  const newSrc = src
    .replace(/<circle\s[^>]*\/?>/gi, '')
    .replace(/<circle[^>]*>[\s\S]*?<\/circle>/gi, '');

  if (newSrc !== src) {
    fs.writeFileSync(filePath, newSrc, 'utf8');
    console.log('Updated', file);
    changed++;
  }
});

console.log(`Done. Files changed: ${changed}`);
