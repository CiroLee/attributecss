import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import CleanCSS from 'clean-css';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 定义路径
const srcDir = path.join(__dirname, 'src');
const cssDir = path.join(srcDir, 'css');
const distDir = path.join(__dirname, 'dist');
const entryFile = path.join(cssDir, 'index.css');
const outputFile = path.join(distDir, 'attribute.css');

// 清空dist目录
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 读取入口文件
const entryContent = fs.readFileSync(entryFile, 'utf8');

// 提取@import语句中的文件路径
const importRegex = /@import\s+['"]\.\/([^'"]+)['"];/g;
const importedFiles = [];
let match;
while ((match = importRegex.exec(entryContent)) !== null) {
  importedFiles.push(match[1]);
}

// 读取并处理每个导入的CSS文件
let utilitiesCSS = '';

// 处理每个导入的CSS文件
importedFiles.forEach((file) => {
  const filePath = path.join(cssDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    // 将每个CSS文件内容直接添加到统一的utilities层中
    utilitiesCSS += content + '\n';
  }
});

// 将所有内容包裹在@layer utilities中，并将:root声明放在外部
const finalCSS = `:root {--spacing: 0.25rem}\n@layer utilities {\n${utilitiesCSS}\n}`;

// 使用clean-css库压缩CSS
const minifiedCSS = new CleanCSS({ level: 2 }).minify(finalCSS).styles;

// 将结果写入到dist/attribute.css
fs.writeFileSync(outputFile, minifiedCSS);

console.log(`CSS文件已成功打包并保存到 ${outputFile}`);
console.log(`共处理了 ${importedFiles.length} 个CSS文件：`, importedFiles);
