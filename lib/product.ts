export const PRODUCT = {
  name: "The Everyday Jar — 16oz",
  price: 499,
  originalPrice: 1000,
  currency: "INR",
  currencySymbol: "₹",
  description:
    "16oz of borosilicate glass with a sealed bamboo lid and a reusable bent glass straw. One build, no variants — this is the jar as it's meant to be: hot-and-cold safe, dishwasher safe, and free of anything that isn't glass or bamboo.",
  features: [
    "16oz capacity · fits standard cupholders",
    "Silicone-sealed bamboo lid",
    "Bent glass straw included",
    "Ships in 3–5 business days",
  ],
  images: ["/bottle-clean.jpg", "/bottle-mint.jpg"],
};

export const DISCOUNT_PERCENT = Math.round(
  ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100
);

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export type DeliveryDetails = {
  fullName: string;
  phone: string;
  address: string;
  landmark?: string;
  state: string;
  city: string;
  pincode: string;
};

export const REVIEWS = [
  {
    name: "Ananya S.",
    initials: "AS",
    rating: 5,
    text: "The glass feels so much sturdier than I expected, and the bamboo lid genuinely doesn't sweat in my hand like the plastic ones did.",
    photo: "/bottle-mint.jpg",
  },
  {
    name: "Rohit K.",
    initials: "RK",
    rating: 5,
    text: "Ordered this for my morning cold brew — the straw is a nice touch and cleanup is one rinse, not a scrub session.",
    photo: null,
  },
  {
    name: "Meera T.",
    initials: "MT",
    rating: 4,
    text: "Exactly as pictured, arrived well packed with zero chips. Wish it came in a bigger size too.",
    photo: "/bottle-clean.jpg",
  },
  {
    name: "Vikram P.",
    initials: "VP",
    rating: 5,
    text: "Was skeptical about a glass straw but it's held up fine for three weeks of daily use so far.",
    photo: null,
  },
];
