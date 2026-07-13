# Lucid — Premium Glass Bottle Site

A Next.js 14 (App Router) storefront for a single product: a 16oz glass jar
with a bamboo lid and glass straw. Each step of the purchase flow is its
own page.

- **`/`** — full-screen looping hero video with "Order now" CTA.
- **`/product`** — photos, discounted price (with strikethrough original),
  description, trust badges (secure checkout / smooth delivery / trusted
  seller), and a reviews section → **Place order**.
- **`/address`** — delivery address form (full name, phone, address,
  landmark, state — dropdown of all Indian states/UTs, city, pincode) →
  **Continue to payment**. Saved to `sessionStorage`, not sent yet.
- **`/payment`** — choose **UPI** (via Razorpay) or **Cash on Delivery** →
  places the order.
- **`/success`** — animated checkmark + order confirmation.
- **`/api/order`** — Cash on Delivery orders land here.
- **`/api/razorpay/order`** + **`/api/razorpay/verify`** — creates a
  Razorpay order server-side, then verifies the payment signature after
  checkout before emailing the order.
- Every completed order (UPI or COD) is emailed to you only (via
  **Resend**) with the customer's name, phone, delivery address, and
  payment method/ID.
- **Meta Pixel** and **Snapchat Pixel** are both wired in, firing
  `InitiateCheckout`/`START_CHECKOUT` when Place Order is clicked and
  `Purchase`/`PURCHASE` on the success page.
- **Meta Pixel** (`components/MetaPixel.tsx`) and **Snapchat Pixel**
  (`components/SnapPixel.tsx`) are both wired in, firing `PageView` /
  `InitiateCheckout` / `Purchase` and `PAGE_VIEW` / `START_CHECKOUT` /
  `PURCHASE` respectively.

## 1. Run locally

```bash
npm install
cp .env.example .env.local   # fill in your keys (optional for local testing)
npm run dev
```

Open http://localhost:3000.

Without `RESEND_API_KEY` set, orders still complete end-to-end in the UI —
the email step is simply skipped, so you can build/test freely before wiring
up real credentials.

## 2. Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) used to send order emails |
| `ORDERS_FROM_EMAIL` | Verified sending address in Resend (e.g. `orders@yourdomain.com`) |
| `ORDERS_TO_EMAIL` | Inbox that should receive new-order notifications |
| `NEXT_PUBLIC_META_PIXEL_ID` | Your Meta Pixel ID from Events Manager |
| `NEXT_PUBLIC_SNAP_PIXEL_ID` | Your Snapchat Pixel ID from Ads Manager |
| `RAZORPAY_KEY_ID` | Razorpay key ID (test or live) from your Razorpay dashboard |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret — keep this server-side only, never expose it with `NEXT_PUBLIC_` |

## 3. Deploy to Vercel

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create lucid-glass --public --source=. --push
```

Then on [vercel.com](https://vercel.com):

1. **New Project → Import** your GitHub repo.
2. Add the environment variables above under **Settings → Environment
   Variables**.
3. Deploy — Vercel auto-detects Next.js, no config needed.

## 4. Swap in your own product

- Replace `/public/hero.mp4` and the images in `/public` with your own media.
- Edit product name/price/description/features in `lib/product.ts`.
- The reviews on `/product` (`REVIEWS` in `lib/product.ts`) are sample
  placeholder content — swap in real customer names, ratings, text, and
  photos once you have them.
- Page copy lives in `app/page.tsx`, `app/product/page.tsx`,
  `app/address/page.tsx`, and `app/success/page.tsx`.

## Notes on the design

- Palette: deep botanical ink (`#14201A`), warm paper (`#EFEDE4`), pale glass
  mist (`#E4EEE7`), bamboo tan (`#B8925A`), muted sage (`#7C9070`).
- Type: Fraunces (display), Inter (body), IBM Plex Mono (labels/prices) —
  set in `app/layout.tsx`.
- The success page's checkmark is a hand-tuned SVG stroke-draw animation
  (`.checkmark-circle` / `.checkmark-check` in `app/globals.css`), not a gif
  or Lottie file — keeps the bundle small and matches the rest of the type.
