import {cp,mkdir,rm,symlink,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=process.cwd();const stage=path.join(root,'.preview-build');
await rm(stage,{recursive:true,force:true});await mkdir(stage,{recursive:true});
for(const entry of ['app','components','lib','public','next.config.ts','tsconfig.json','package.json','package-lock.json'])await cp(path.join(root,entry),path.join(stage,entry),{recursive:true});
await rm(path.join(stage,'app/api'),{recursive:true,force:true});
// Windows needs admin rights for directory symlinks; a junction works without them.
await symlink(path.join(root,'node_modules'),path.join(stage,'node_modules'),process.platform==='win32'?'junction':'dir');
await writeFile(path.join(stage,'tsconfig.json'),JSON.stringify({compilerOptions:{target:'ES2020',lib:['dom','dom.iterable','esnext'],allowJs:true,skipLibCheck:true,strict:true,noEmit:true,esModuleInterop:true,module:'esnext',moduleResolution:'bundler',resolveJsonModule:true,isolatedModules:true,jsx:'react-jsx',plugins:[{name:'next'}]},include:['next-env.d.ts','**/*.ts','**/*.tsx','.next/types/**/*.ts'],exclude:['node_modules']}));
const r=spawnSync(process.execPath,[path.join(root,'node_modules/next/dist/bin/next'),'build','--webpack'],{cwd:stage,stdio:'inherit',env:{...process.env,PREVIEW_EXPORT:'1',NEXT_PUBLIC_PREVIEW_MODE:'1'}});
if(r.status!==0)process.exit(r.status??1);
await rm(path.join(root,'out'),{recursive:true,force:true});await cp(path.join(stage,'out'),path.join(root,'out'),{recursive:true});console.log('Static preview exported. Full Next.js server build remains in .next/.');
