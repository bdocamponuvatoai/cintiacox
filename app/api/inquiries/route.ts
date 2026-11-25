import { createInquiryHandler } from '../../../lib/inquiries';
import { getDeliveryConfig } from '../../../lib/delivery-config';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const handler=createInquiryHandler(getDeliveryConfig());
export async function POST(request:Request){return handler(request)}
