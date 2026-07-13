"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PRODUCT, INDIAN_STATES } from "@/lib/product";

export default function AddressPage() {
  const router = useRouter();

  function handleContinueToPayment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const delivery = Object.fromEntries(form.entries());

    sessionStorage.setItem("lucid_delivery", JSON.stringify(delivery));
    router.push("/payment");
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
          <Link href="/product" className="flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
            <span aria-hidden>←</span> Back
          </Link>
          <span className="font-display text-lg">Lucid</span>
          <span className="w-10" />
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest2 text-sage-dark">
          Step 2 of 3
        </p>
        <h1 className="font-display text-2xl sm:text-3xl">Delivery address</h1>
        <p className="mt-2 text-sm text-ink/60">Tell us where the jar should go.</p>

        <form onSubmit={handleContinueToPayment} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name" name="fullName" required autoComplete="name" className="sm:col-span-2" />
          <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" className="sm:col-span-2" />

          <div className="sm:col-span-2">
            <label htmlFor="address" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/50">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              autoComplete="street-address"
              placeholder="House / flat no., building, street, area"
              className="w-full rounded-xl border border-ink/15 bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-sage-dark"
            />
          </div>

          <Field label="Landmark (optional)" name="landmark" className="sm:col-span-2" placeholder="Near..." />

          <div>
            <label htmlFor="state" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/50">
              State
            </label>
            <select
              id="state"
              name="state"
              required
              defaultValue=""
              className="w-full rounded-xl border border-ink/15 bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-sage-dark"
            >
              <option value="" disabled>
                Select state
              </option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <Field label="City" name="city" required autoComplete="address-level2" />
          <Field
            label="Pincode"
            name="pincode"
            required
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoComplete="postal-code"
          />

          <div className="sm:col-span-2 mt-2 flex items-center justify-between rounded-xl bg-mist/60 px-5 py-4 text-sm">
            <span className="text-ink/60">Order total</span>
            <span className="font-mono text-base">
              {PRODUCT.currencySymbol}
              {PRODUCT.price}
            </span>
          </div>

          <button
            type="submit"
            className="sm:col-span-2 mt-2 w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition hover:bg-sage-dark"
          >
            Continue to payment
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  inputMode,
  pattern,
  maxLength,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        className="w-full rounded-xl border border-ink/15 bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-sage-dark"
      />
    </div>
  );
}
