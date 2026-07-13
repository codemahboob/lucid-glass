"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCT } from "@/lib/product";
import { trackMetaEvent } from "@/components/MetaPixel";
import { trackSnapEvent } from "@/components/SnapPixel";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "—";

  useEffect(() => {
    trackMetaEvent("Purchase", { value: PRODUCT.price, currency: PRODUCT.currency });
    trackSnapEvent("PURCHASE", { price: PRODUCT.price, currency: PRODUCT.currency });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center text-ink">
      <div className="checkmark-wrap">
        <svg viewBox="0 0 80 80" className="h-24 w-24">
          <circle
            className="checkmark-circle"
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#576A4E"
            strokeWidth="4"
          />
          <path
            className="checkmark-check"
            fill="none"
            stroke="#576A4E"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M24 41 L35 52 L57 28"
          />
        </svg>
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-widest2 text-sage-dark">
        Order confirmed
      </p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">It's on its way to you.</h1>
      <p className="mt-3 text-sm text-ink/65">
        Confirmation {orderId} — we'll reach out on your phone number to confirm delivery.
      </p>

      <Link
        href="/"
        className="mt-9 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition hover:bg-sage-dark"
      >
        Back to home
      </Link>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
