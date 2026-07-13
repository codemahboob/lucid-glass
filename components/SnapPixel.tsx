"use client";

import Script from "next/script";

const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

// Fires a standard Snap Pixel event, e.g. trackSnapEvent("PURCHASE", { price: 38, currency: "USD" })
export function trackSnapEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { snaptr?: (...args: unknown[]) => void };
  if (typeof w.snaptr === "function") {
    w.snaptr("track", event, params);
  }
}

export default function SnapPixel() {
  if (!SNAP_PIXEL_ID) return null;

  return (
    <Script id="snap-pixel" strategy="afterInteractive">
      {`
        (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
        {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
        a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
        r.src=n;var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);})(window,document,
        'https://sc-static.net/scevent.min.js');
        snaptr('init', '${SNAP_PIXEL_ID}');
        snaptr('track', 'PAGE_VIEW');
      `}
    </Script>
  );
}
