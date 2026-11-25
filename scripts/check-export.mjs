import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
async function walk(dir){let files=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())files.push(...await walk(p));else files.push(p)}return files}
const html=(await walk(root)).filter(p=>p.endsWith('.html'));
let links=0;const failures=[];
for(const file of html){const data=await readFile(file,'utf8');const route=path.relative(root,file);if(!data.includes('<h1'))failures.push(`${route}: missing h1`);for(const match of data.matchAll(/(?:href|src)="([^"#]+)"/g)){const ref=match[1].split(/[?#]/)[0];if(!ref.startsWith('/')||ref.startsWith('//'))continue;links++;let target=path.join(root,decodeURIComponent(ref));try{const info=await stat(target);if(info.isDirectory())await stat(path.join(target,'index.html'))}catch{failures.push(`${route}: missing ${ref}`)}}}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Verified ${html.length} HTML pages and ${links} local link/asset references.`);
