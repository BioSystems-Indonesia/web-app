const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'assets', 'img', 'line');
console.log('Scanning folder:', dir);

const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));
let changed = 0;

files.forEach(file => {
  const p = path.join(dir, file);
  let text = fs.readFileSync(p, 'utf8');

  const svgOpenMatch = text.match(/<svg[^>]*>/i);
  const svgCloseMatch = text.match(/<\/svg>\s*$/i);
  if (!svgOpenMatch || !svgCloseMatch) return;

  const header = svgOpenMatch[0];
  const footer = '</svg>';
  const innerStart = text.indexOf(svgOpenMatch[0]) + svgOpenMatch[0].length;
  const innerEnd = text.lastIndexOf('</svg>');
  const inner = text.slice(innerStart, innerEnd).trim();

  // Find first <path .../> (or <path ...></path>) and first <circle .../>
  const pathRegex = /<path[\s\S]*?>\s*(?:<\/path>)?/i;
  const circleRegex = /<circle[\s\S]*?\/>/i;

  const firstPathMatch = inner.match(pathRegex);
  const firstCircleMatch = inner.match(circleRegex);

  if (!firstPathMatch) return; // nothing to do

  const firstPath = firstPathMatch[0];
  const firstCircle = firstCircleMatch ? firstCircleMatch[0] : null;

  // Remove only the first occurrences
  let rest = inner;
  rest = rest.replace(pathRegex, '').trim();
  if (firstCircle) {
    rest = rest.replace(circleRegex, '').trim();
  }

  // Build new inner content: path, circle (if present), then rest
  let newInner = firstPath + '\n';
  if (firstCircle) newInner += firstCircle + '\n';
  if (rest) newInner += rest + '\n';

  const newText = text.slice(0, innerStart) + '\n' + newInner + text.slice(innerEnd);

  if (newText !== text) {
    fs.writeFileSync(p, newText, 'utf8');
    changed++;
    console.log('Updated', file);
  }
});

console.log('Done. Files changed:', changed);
