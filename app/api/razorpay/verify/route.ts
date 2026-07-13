import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendOrderEmail } from "@/lib/sendOrderEmail";
import { DeliveryDetails } from "@/lib/product";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      delivery,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      delivery: DeliveryDetails;
    } = body ?? {};

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Razorpay is not configured." }, { status: 500 });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    if (!delivery?.fullName || !delivery?.phone || !delivery?.address) {
      return NextResponse.json({ error: "Missing delivery details." }, { status: 400 });
    }

    const orderId = "LUCID-" + Date.now().toString().slice(-6);

    await sendOrderEmail({
      orderId,
      delivery,
      paymentMethod: "UPI",
      paymentId: razorpay_payment_id,
    });

    return NextResponse.json({ orderId }, { status: 200 });
  } catch (err) {
    console.error("Razorpay verify route error", err);
    return NextResponse.json({ error: "Could not verify payment." }, { status: 500 });
  }
}
