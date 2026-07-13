import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/sendOrderEmail";
import { DeliveryDetails } from "@/lib/product";

// Cash on Delivery orders land here — no payment to verify, just notify the store.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const delivery: DeliveryDetails = body?.delivery;

    if (!delivery?.fullName || !delivery?.phone || !delivery?.address || !delivery?.city || !delivery?.state || !delivery?.pincode) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const orderId = "LUCID-" + Date.now().toString().slice(-6);

    await sendOrderEmail({
      orderId,
      delivery,
      paymentMethod: "Cash on Delivery",
    });

    return NextResponse.json({ orderId }, { status: 200 });
  } catch (err) {
    console.error("Order submission failed", err);
    return NextResponse.json({ error: "Could not process order." }, { status: 500 });
  }
}
