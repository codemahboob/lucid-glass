"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT, DISCOUNT_PERCENT, REVIEWS } from "@/lib/product";
import { trackMetaEvent } from "@/components/MetaPixel";
import { trackSnapEvent } from "@/components/SnapPixel";

export default function ProductPage() {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);

  function handlePlaceOrder() {
    trackMetaEvent("InitiateCheckout", {
      value: PRODUCT.price,
      currency: PRODUCT.currency,
    });
    trackSnapEvent("START_CHECKOUT", {
      price: PRODUCT.price,
      currency: PRODUCT.currency,
    });
    router.push("/address");
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
            <span aria-hidden>←</span> Back
          </Link>
          <span className="font-display text-lg">Lucid</span>
          <span className="w-10" />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <section className="grid grid-cols-1 gap-10 sm:grid-cols-[260px_1fr]">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-mist/60">
              <Image
                src={PRODUCT.images[activeImage]}
                alt={PRODUCT.name}
                width={800}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="mt-3 flex gap-3">
              {PRODUCT.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-xl border transition ${
                    activeImage === i ? "border-sage-dark" : "border-transparent opacity-60"
                  }`}
                  aria-label={`View photo ${i + 1}`}
                >
                  <Image src={src} alt="" width={80} height={80} className="h-16 w-16 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-sage-dark">In stock</p>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl">{PRODUCT.name}</h1>

            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-mono text-lg text-ink/70">
                {PRODUCT.currencySymbol}
                {PRODUCT.price}
              </span>
              <span className="font-mono text-sm text-ink/35 line-through">
                {PRODUCT.currencySymbol}
                {PRODUCT.originalPrice}
              </span>
              <span className="rounded-full bg-clay/15 px-2.5 py-0.5 font-mono text-xs text-clay">
                {DISCOUNT_PERCENT}% off
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70">
              {PRODUCT.description}
            </p>

            <ul className="mt-6 space-y-2 text-sm text-ink/65">
              {PRODUCT.features.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>

            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition hover:bg-sage-dark sm:w-auto"
            >
              Place order
            </button>

            {/* Trust badges */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-ink/10 pt-6">
              <Badge icon={<ShieldIcon />} label="Secure checkout" />
              <Badge icon={<TruckIcon />} label="Smooth delivery" />
              <Badge icon={<CheckBadgeIcon />} label="Trusted seller" />
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16 border-t border-ink/10 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">What people are saying</h2>
            <span className="font-mono text-xs text-ink/50">
              {(
                REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
              ).toFixed(1)}{" "}
              / 5 · {REVIEWS.length} reviews
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-ink/10 bg-white/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-dark/15 font-mono text-xs text-sage-dark">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <div className="flex gap-0.5 text-xs text-bamboo" aria-label={`${r.rating} out of 5 stars`}>
                      {"★".repeat(r.rating)}
                      <span className="text-ink/20">{"★".repeat(5 - r.rating)}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{r.text}</p>
                {r.photo && (
                  <div className="mt-3 h-24 w-24 overflow-hidden rounded-xl">
                    <Image src={r.photo} alt="Customer photo" width={200} height={200} className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="text-sage-dark">{icon}</div>
      <span className="text-[11px] leading-tight text-ink/60">{label}</span>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 7h11v9H2z" strokeLinejoin="round" />
      <path d="M13 10h4l4 3v3h-8z" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2l2.4 1.2 2.6-.4 1.3 2.3 2.3 1.3-.4 2.6L21.4 11.5 20.2 12l-2.3 1.3.4 2.6-2.3 1.3-1.3 2.3-2.6-.4L12 22l-2.4-1.2-2.6.4-1.3-2.3-2.3-1.3.4-2.6L2.6 12.5 3.8 12l2.3-1.3-.4-2.6 2.3-1.3 1.3-2.3 2.6.4L12 2z" strokeLinejoin="round"/>
      <path d="M8.5 12l2.3 2.3L15.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
