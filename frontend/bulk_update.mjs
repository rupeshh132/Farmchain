import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Replace typography
    content = content.replace(/font-mono/g, 'font-sans font-medium');
    content = content.replace(/uppercase tracking-widest/g, 'tracking-wide');
    content = content.replace(/uppercase tracking-wider/g, 'tracking-wide');
    
    // Replace shapes
    content = content.replace(/rounded-none/g, 'rounded-2xl');
    
    // Replace harsh shadows
    content = content.replace(/shadow-\[[^\]]+\]/g, 'shadow-sm');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated:', filePath);
    }
  }
});
