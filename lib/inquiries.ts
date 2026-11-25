import { z } from 'zod';
export const inquirySchema=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(200),phone:z.string().max(50).default(''),intent:z.enum(['Buy','Sell','Relocate','General']),language:z.enum(['English','Español','Português']),timing:z.string().max(100).default(''),timezone:z.string().max(100).default(''),message:z.string().trim().min(10).max(4000),consent:z.literal(true),website:z.string().max(100).default('')}).strict();
export type Inquiry=z.infer<typeof inquirySchema>;
export type DeliveryConfig={apiKey?:string;from?:string;to?:string;origin?:string;trustProxy?:boolean};
export const deliveryReady=(c:DeliveryConfig)=>!!(c.apiKey&&c.from&&c.to);
export function inquiryText(d:Inquiry){return `New real estate inquiry\n\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone||'Not supplied'}\nInterest: ${d.intent}\nPreferred language: ${d.language}\nTiming: ${d.timing||'To discuss'}\nTime zone: ${d.timezone||'To discuss'}\n\n${d.message}\n\nContact permission was explicitly provided.`}
export function createInquiryHandler(config:DeliveryConfig,deliver:typeof fetch=fetch,now=Date.now){
 const limits=new Map<string,{count:number;expires:number}>();
 return async function handle(req:Request){
  const respond=(body:object,status:number,extra:Record<string,string>={})=>Response.json(body,{status,headers:{'Cache-Control':'no-store',...extra}});
  if(req.method!=='POST')return respond({error:'Method not allowed.'},405,{'Allow':'POST'});
  const origin=req.headers.get('origin');let expected:string;try{expected=new URL(config.origin||req.url).origin}catch{return respond({error:'Service configuration unavailable.'},503)}
  if(!origin||origin!==expected)return respond({error:'This request could not be verified.'},403);
  if(!req.headers.get('content-type')?.startsWith('application/json'))return respond({error:'Expected a JSON request.'},415);
  const time=now();for(const [key,value] of limits)if(value.expires<=time)limits.delete(key);
  const key=config.trustProxy?(req.headers.get('x-forwarded-for')?.split(',')[0].trim()||'unknown'):'shared';
  if(limits.size>=10000&&!limits.has(key))return respond({error:'Please try again later.'},429,{'Retry-After':'900'});
  const bucket=limits.get(key)||{count:0,expires:time+900000};bucket.count++;limits.set(key,bucket);
  if(bucket.count>8)return respond({error:'Too many attempts. Please wait or contact Cintia directly.'},429,{'Retry-After':'900'});
  let body:string='';try{const reader=req.body?.getReader();if(!reader)return respond({error:'A request body is required.'},400);const decoder=new TextDecoder();let bytes=0;while(true){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;if(bytes>12000){await reader.cancel();return respond({error:'Your message is too long.'},413)}body+=decoder.decode(chunk.value,{stream:true})}body+=decoder.decode()}catch{return respond({error:'Unable to read your request.'},400)}
  let input:unknown;try{input=JSON.parse(body)}catch{return respond({error:'Invalid request.'},400)}
  const parsed=inquirySchema.safeParse(input);if(!parsed.success)return respond({error:'Check your name, email, message, and contact permission.'},400);
  if(parsed.data.website)return respond({error:'Unable to process this request. Please contact Cintia directly.'},400);
  if(!deliveryReady(config))return respond({error:'Online delivery is not connected. Please use the email option or call Cintia.',code:'DELIVERY_NOT_CONFIGURED'},503);
  try{const result=await deliver('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${config.apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from:config.from,to:[config.to],reply_to:parsed.data.email,subject:`Website inquiry — ${parsed.data.intent}`,text:inquiryText(parsed.data)}),signal:AbortSignal.timeout(12000)});if(!result.ok)return respond({error:'The message was not delivered. Please use email or call Cintia.'},502);const receipt=await result.json();if(!receipt.id)return respond({error:'Delivery could not be confirmed. Please contact Cintia directly.'},502);return respond({ok:true,message:'Your inquiry has been submitted to the email service. Cintia will need to confirm any consultation time.'},200)}catch{return respond({error:'Delivery could not be confirmed. Please use email or call Cintia.'},502)}
 }
}
