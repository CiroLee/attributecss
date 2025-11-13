import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import CleanCSS from 'clean-css';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取src/css目录下的所有CSS文件
const cssDir = path.join(__dirname, 'src', 'css');
const distDir = path.join(__dirname, 'dist');

// 确保dist目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 读取CSS目录下的所有CSS文件
const cssFiles = fs.readdirSync(cssDir).filter((file) => path.extname(file) === '.css');

let combinedCSS = '';

// 逐个读取CSS文件内容并合并
cssFiles.forEach((file) => {
  const filePath = path.join(cssDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  combinedCSS += content + '\n';
});

// 删除CSS注释（包括多行注释 /* */ 和单行注释 //）
combinedCSS = combinedCSS.replace(/\/\*[\s\S]*?\*\//g, '');

// 使用clean-css库压缩CSS
const minifiedCSS = new CleanCSS({ level: 2 }).minify(combinedCSS).styles;

// 将合并的内容包装在@layer utilities {}中
const layerCSS = `@layer utilities {\n${minifiedCSS}\n}`;

// 将结果写入到dist/attributecss.css
const outputPath = path.join(distDir, 'attributecss.css');
fs.writeFileSync(outputPath, layerCSS);

console.log(`CSS文件已成功合并、压缩并删除注释，保存到 ${outputPath}`);
console.log(`共合并了 ${cssFiles.length} 个CSS文件：`, cssFiles);
