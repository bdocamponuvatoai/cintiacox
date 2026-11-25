import type { DeliveryConfig } from './inquiries';
export function getDeliveryConfig():DeliveryConfig{return {apiKey:process.env.RESEND_API_KEY,from:process.env.INQUIRY_FROM,to:process.env.INQUIRY_TO,origin:process.env.APP_ORIGIN,trustProxy:process.env.TRUST_PROXY==='1'}}
