"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { LetsTalkButton } from "@/components/LetsTalkButton";
import type { NewsPost } from "@/sanity/queries";

// ─── Shared ───────────────────────────────────────────────────────────────────

function W({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return <span data-word className={`inline-block ${className ?? ""}`} style={style}>{children}</span>;
}

const BIG = "text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-black";

function ArrowIcon() {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
      <path d="M3.77653 1.88826L-5.83637e-08 5.66479L1.33521 7L5.11173 3.2235L5.11173 6.13686L7 6.13686L7 1.70857e-07L0.863115 4.39109e-07L0.863115 1.88826L3.77653 1.88826Z" fill="currentColor" />
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function NewsHero({ count }: { count: number }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const words = sectionRef.current?.querySelectorAll("[data-word]");
    if (!words?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f3f3f3] min-h-[100svh] flex flex-col px-4 md:px-8 pt-32 pb-12 md:pb-20">
      <div className="flex items-center justify-between mb-auto">
        <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ News ]</span>
        <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ {String(count).padStart(2, "0")} Posts ]</span>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <p className={BIG}><W>Keep</W> <W>up</W> <W>with</W></p>
        <p className={`${BIG} md:pl-[10rem]`}><W>my</W> <W>latest</W></p>
        <p className={`${BIG} md:pl-[4rem]`}>
          <W>news</W>{" "}
          <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>&amp;</W>
        </p>
        <p className={`${BIG} md:pl-[14rem]`}><W>achievements</W><W>.</W></p>
        <div className="mt-4">
          <W className="text-sm font-normal uppercase text-[#1f1f1f]">[ Latest Updates — Stories — Milestones ]</W>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3">
        <div className="w-full h-px bg-black/10" />
        <div className="flex items-end justify-between">
          <span className="text-[clamp(4rem,13.75vw,12rem)] font-light tracking-[-0.08em] leading-none text-black/10">
            {String(count).padStart(2, "0")}
          </span>
          <span className="hidden md:block font-mono text-sm font-normal uppercase text-[#1f1f1f] pb-2">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: NewsPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isOffset = index % 2 === 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(cardRef.current, { y: isOffset ? 60 : 0 }, {
          y: isOffset ? 0 : -20,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    });
    return () => ctx.revert();
  }, [isOffset]);

  const inner = (
    <div ref={cardRef} className="group flex flex-col gap-4 cursor-pointer">
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "353/469" }}>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

        {/* Post number badge */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-xs font-normal uppercase text-white bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black/10" />

      {/* Excerpt */}
      <p className="text-sm font-normal tracking-[-0.04em] text-[#1f1f1f] leading-[1.5] transition-opacity duration-300 group-hover:opacity-60">
        {post.excerpt}
      </p>

      {/* Read more */}
      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-black w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          Read more
          <span className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 inline-flex">
            <ArrowIcon />
          </span>
        </a>
      )}
    </div>
  );

  return inner;
}

// ─── Posts Grid ───────────────────────────────────────────────────────────────

function PostsGrid({ posts }: { posts: NewsPost[] }) {
  const left  = posts.filter((_, i) => i % 2 === 0);
  const right = posts.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full bg-[#f3f3f3] py-12 px-4 md:py-20 md:px-8">

      {/* Desktop: two staggered columns */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:items-start">
        <div className="flex flex-col gap-16">
          {left.map((post, i) => (
            <PostCard key={post._id} post={post} index={i * 2} />
          ))}
        </div>
        <div className="flex flex-col gap-16 md:pt-[8rem]">
          {right.map((post, i) => (
            <PostCard key={post._id} post={post} index={i * 2 + 1} />
          ))}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="flex flex-col gap-12 md:hidden">
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <section className="w-full bg-[#f3f3f3] py-32 px-4 md:px-8 flex flex-col items-center gap-6 text-center">
      <span className="font-mono text-sm uppercase text-[#999]">[ No posts yet ]</span>
      <p className="text-[clamp(1.5rem,4vw,3rem)] font-light uppercase tracking-[-0.08em] text-black/20">
        Check back soon.
      </p>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function NewsCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const words = sectionRef.current?.querySelectorAll("[data-word]");
    if (!words?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center 50%",
          scrub: 0.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="w-full h-px bg-black/10" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className={BIG}><W>Want</W> <W>to</W> <W>be</W></p>
            <p className={`${BIG} md:pl-[8rem]`}>
              <W>part</W>{" "}
              <W>of</W>{" "}
              <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>the</W>
            </p>
            <p className={`${BIG} md:pl-[2rem]`}><W>story</W><W>?</W></p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 md:pb-2">
            <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.4] max-w-[22rem]">
              Every great story starts with a collaboration. Let&apos;s create something worth talking about.
            </p>
            <LetsTalkButton variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NewsContent({ posts }: { posts: NewsPost[] }) {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <main>
          <NewsHero count={posts.length} />
          {posts.length > 0 ? <PostsGrid posts={posts} /> : <EmptyState />}
          <NewsCTA />
        </main>
      </div>
      <FooterSection />
    </>
  );
}
