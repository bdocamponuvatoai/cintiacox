import type { NextConfig } from 'next';
const preview=process.env.PREVIEW_EXPORT==='1';
const config:NextConfig={output:preview?'export':undefined,trailingSlash:true,images:{unoptimized:true},poweredByHeader:false,devIndicators:false};
export default config;
