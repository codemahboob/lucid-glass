import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-ink text-paper">
      {/* Full-screen looping hero video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Looping footage of the Lucid glass jar in use"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/70" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <span className="font-display text-xl tracking-tight text-paper">Lucid</span>
      </header>

      {/* Hero copy */}
      <section className="relative z-10 flex h-[calc(100%-88px)] flex-col items-start justify-end px-6 pb-14 sm:px-10 sm:pb-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest2 text-paper/70">
          New — The Everyday Jar
        </p>
        <h1 className="max-w-md font-display text-4xl leading-[1.08] tracking-tight text-paper sm:max-w-lg sm:text-5xl">
          Premium glass bottle,
          <br />
          <span className="italic text-bamboo-light">made for what you put in it.</span>
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/75 sm:text-base">
          Borosilicate glass, a bamboo lid, and a glass straw. Nothing plastic
          between you and your drink.
        </p>

        <Link
          href="/product"
          className="group mt-9 inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 text-sm font-medium text-ink transition hover:bg-bamboo-light"
        >
          Order now
          <span className="transition group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </main>
  );
}
