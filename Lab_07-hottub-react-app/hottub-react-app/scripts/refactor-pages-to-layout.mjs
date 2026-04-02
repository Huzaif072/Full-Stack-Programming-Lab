import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const pagesDir = path.join(projectRoot, 'src', 'pages');

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      out.push(...walk(full));
    } else if (item.isFile() && item.name.endsWith('.jsx')) {
      out.push(full);
    }
  }
  return out;
}

function toImportPath(filePath) {
  const fromDir = path.dirname(filePath);
  const toFile = path.join(projectRoot, 'src', 'components', 'layout', 'SiteLayout.jsx');
  let rel = path.relative(fromDir, toFile).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  rel = rel.replace(/\.jsx$/, '');
  return rel;
}

const files = walk(pagesDir).filter((f) => !f.includes(`${path.sep}system${path.sep}`));

let changed = 0;

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');

  if (!source.includes('<main')) continue;

  const nameMatch = source.match(/function\s+([A-Za-z0-9_]+)\s*\(/);
  if (!nameMatch) continue;
  const componentName = nameMatch[1];

  const mainMatch = source.match(/<main[\s\S]*?<\/main>/);
  if (!mainMatch) continue;

  const mainBlock = mainMatch[0]
    .split('\n')
    .map((line) => `      ${line}`)
    .join('\n');

  const importPath = toImportPath(file);

  const next = `import SiteLayout from '${importPath}';\n\nfunction ${componentName}() {\n  return (\n    <SiteLayout>\n${mainBlock}\n    </SiteLayout>\n  );\n}\n\nexport default ${componentName};\n`;

  if (next !== source) {
    fs.writeFileSync(file, next, 'utf8');
    changed += 1;
  }
}

console.log(`Refactored ${changed} page files to use SiteLayout.`);
