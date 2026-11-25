import { deliveryReady } from '../../../lib/inquiries';
import { getDeliveryConfig } from '../../../lib/delivery-config';
export const dynamic='force-dynamic';
export function GET(){return Response.json({enabled:deliveryReady(getDeliveryConfig())},{headers:{'Cache-Control':'no-store'}})}
