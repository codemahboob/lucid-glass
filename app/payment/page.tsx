"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { PRODUCT, DeliveryDetails } from "@/lib/product";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

type PaymentMethod = "upi" | "cod";

export default function PaymentPage() {
  const router = useRouter();
  const [delivery, setDelivery] = useState<DeliveryDetails | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lucid_delivery");
    if (!raw) {
      router.replace("/address");
      return;
    }
    setDelivery(JSON.parse(raw));
  }, [router]);

  async function payWithUpi() {
    if (!delivery) return;
    setSubmitting(true);
    setError(null);

    try {
      const orderRes = await fetch("/api/razorpay/order", { method: "POST" });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Could not start payment");

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Lucid",
        description: PRODUCT.name,
        order_id: orderData.order.id,
        prefill: {
          name: delivery.fullName,
          contact: delivery.phone,
        },
        theme: { color: "#14201A" },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, delivery }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || "Payment verification failed");

            sessionStorage.removeItem("lucid_delivery");
            router.push(`/success?orderId=${encodeURIComponent(verifyData.orderId)}`);
          } catch (err) {
            setError("Payment succeeded but we couldn't confirm the order. Please contact us.");
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      });

      rzp.open();
    } catch (err) {
      setError("Something went wrong starting payment. Please try again.");
      setSubmitting(false);
    }
  }

  async function payWithCod() {
    if (!delivery) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delivery }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order could not be placed");

      sessionStorage.removeItem("lucid_delivery");
      router.push(`/success?orderId=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      setError("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  }

  function handleConfirm() {
    if (method === "upi") payWithUpi();
    else payWithCod();
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <header className="border-b border-ink/10 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
          <Link href="/address" className="flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
            <span aria-hidden>←</span> Back
          </Link>
          <span className="font-display text-lg">Lucid</span>
          <span className="w-10" />
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest2 text-sage-dark">
          Step 3 of 3
        </p>
        <h1 className="font-display text-2xl sm:text-3xl">Payment</h1>
        <p className="mt-2 text-sm text-ink/60">Choose how you'd like to pay.</p>

        <div className="mt-8 space-y-3">
          <label
            className={`flex cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 transition ${
              method === "upi" ? "border-sage-dark bg-mist/50" : "border-ink/15 bg-white/40"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="method"
                checked={method === "upi"}
                onChange={() => setMethod("upi")}
                className="accent-sage-dark"
              />
              <span>
                <span className="block text-sm font-medium">UPI</span>
                <span className="block text-xs text-ink/55">Pay instantly via any UPI app — Razorpay</span>
              </span>
            </span>
          </label>

          <label
            className={`flex cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 transition ${
              method === "cod" ? "border-sage-dark bg-mist/50" : "border-ink/15 bg-white/40"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="method"
                checked={method === "cod"}
                onChange={() => setMethod("cod")}
                className="accent-sage-dark"
              />
              <span>
                <span className="block text-sm font-medium">Cash on Delivery</span>
                <span className="block text-xs text-ink/55">Pay in cash when your jar arrives</span>
              </span>
            </span>
          </label>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl bg-mist/60 px-5 py-4 text-sm">
          <span className="text-ink/60">Order total</span>
          <span className="font-mono text-base">
            {PRODUCT.currencySymbol}
            {PRODUCT.price}
          </span>
        </div>

        {error && <p className="mt-4 text-sm text-clay">{error}</p>}

        <button
          onClick={handleConfirm}
          disabled={submitting || !delivery}
          className="mt-6 w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition hover:bg-sage-dark disabled:opacity-60"
        >
          {submitting
            ? "Processing…"
            : method === "upi"
            ? `Pay ${PRODUCT.currencySymbol}${PRODUCT.price} with UPI`
            : "Place order — Cash on Delivery"}
        </button>
      </div>
    </main>
  );
}
