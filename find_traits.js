const fs = require('fs');
const path = require('path');

function searchKeys(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) searchKeys(full);
    else if (f.endsWith('.js') || f.endsWith('.ts')) {
      const txt = fs.readFileSync(full, 'utf8');
      const matches = txt.matchAll(/t(?:\.num|\.int|\.pick|\.bool|\.jitter|\()\s*\(?\s*["']([^"']+)["']/g);
      for (const m of matches) {
        console.log(m[1], 'in', f);
      }
    }
  }
}

searchKeys('node_modules/blobatar');

