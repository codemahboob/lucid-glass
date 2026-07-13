import { NextRequest, NextResponse } from "next/server";
import { PRODUCT } from "@/lib/product";

export async function POST(_req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay is not configured on the server yet." },
      { status: 500 }
    );
  }

  try {
    const receipt = "lucid_" + Date.now();
    const amountInPaise = PRODUCT.price * 100;

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: PRODUCT.currency,
        receipt,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Razorpay order creation failed", detail);
      return NextResponse.json({ error: "Could not create payment order." }, { status: 502 });
    }

    const order = await res.json();
    return NextResponse.json({ order, keyId });
  } catch (err) {
    console.error("Razorpay order route error", err);
    return NextResponse.json({ error: "Could not create payment order." }, { status: 500 });
  }
}
