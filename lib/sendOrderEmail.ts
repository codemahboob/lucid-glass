import { Resend } from "resend";
import { DeliveryDetails, PRODUCT } from "@/lib/product";

type OrderEmailArgs = {
  orderId: string;
  delivery: DeliveryDetails;
  paymentMethod: "UPI" | "Cash on Delivery";
  paymentId?: string;
};

export async function sendOrderEmail({ orderId, delivery, paymentMethod, paymentId }: OrderEmailArgs) {
  if (!process.env.RESEND_API_KEY) return;

  const { fullName, phone, address, landmark, city, state, pincode } = delivery;

  const addressBlock = [
    address,
    landmark ? `Landmark: ${landmark}` : null,
    `${city}, ${state} — ${pincode}`,
    "India",
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.ORDERS_FROM_EMAIL || "orders@lucidglass.co",
    to: process.env.ORDERS_TO_EMAIL || "orders@lucidglass.co",
    subject: `New order ${orderId} — ${PRODUCT.name} (${paymentMethod})`,
    text: `New order received

Order: ${orderId}
Product: ${PRODUCT.name}
Price: ${PRODUCT.currencySymbol}${PRODUCT.price}
Payment method: ${paymentMethod}${paymentId ? `\nRazorpay payment ID: ${paymentId}` : ""}

Customer: ${fullName}
Phone: ${phone}

Delivery address:
${addressBlock}`,
  });
}
