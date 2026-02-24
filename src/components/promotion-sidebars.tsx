"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PromotionPanel } from "./promotion-panel";
import type { PromotionItem } from "@/lib/types";

interface PromotionSidebarsProps {
  promotions: PromotionItem[];
  variant: "mobile" | "left" | "right";
}

const AUTO_SCROLL_INTERVAL = 3500;
const USER_PAUSE_DURATION = 6000;

function ScrollDots({
  count,
  active,
  onDotClick,
}: {
  count: number;
  active: number;
  onDotClick: (idx: number) => void;
}) {
  return (
    <div className="flex justify-center gap-1.5 pt-2.5">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i + 1}번째 광고`}
          onClick={() => onDotClick(i)}
          className={`block h-1.5 rounded-full transition-all duration-300 ${
            i === active ? "w-5 bg-primary" : "w-1.5 bg-[#ddd]"
          }`}
        />
      ))}
    </div>
  );
}

export function PromotionSidebars({ promotions, variant }: PromotionSidebarsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToIndex = useCallback(
    (idx: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0 || idx >= children.length) return;
      const gap = 12;
      const target = children[idx].offsetLeft - 16;
      el.scrollTo({ left: target, behavior: "smooth" });
    },
    []
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const children = Array.from(el.children) as HTMLElement[];
    if (children.length === 0) return;
    const cardWidth = children[0].offsetWidth + 12;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, promotions.length - 1));
  }, [promotions.length]);

  const pauseAutoScroll = useCallback(() => {
    userInteractedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      userInteractedRef.current = false;
    }, USER_PAUSE_DURATION);
  }, []);

  // 스크롤 이벤트 바인딩
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || variant !== "mobile") return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll, variant]);

  // 터치 시 자동 스크롤 일시정지
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || variant !== "mobile") return;
    const onTouch = () => pauseAutoScroll();
    el.addEventListener("touchstart", onTouch, { passive: true });
    return () => el.removeEventListener("touchstart", onTouch);
  }, [pauseAutoScroll, variant]);

  // 자동 스크롤
  useEffect(() => {
    if (variant !== "mobile" || promotions.length <= 1) return;
    const timer = setInterval(() => {
      if (userInteractedRef.current) return;
      setActiveIdx((prev) => {
        const next = (prev + 1) % promotions.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [variant, promotions.length, scrollToIndex]);

  // 도트 클릭 시 해당 카드로 이동
  const handleDotClick = useCallback(
    (idx: number) => {
      pauseAutoScroll();
      scrollToIndex(idx);
      setActiveIdx(idx);
    },
    [pauseAutoScroll, scrollToIndex]
  );

  if (promotions.length === 0) return null;

  if (variant === "mobile") {
    return (
      <div className="mx-4 mt-4 rounded-2xl bg-[#fafaf8] px-3 pb-3 pt-3 lg:hidden">
        <div
          ref={scrollRef}
          className="snap-x-proximity scroll-smooth-touch flex gap-3 overflow-x-auto scrollbar-none"
        >
          {promotions.map((item) => (
            <div
              key={item.id}
              className="w-[55vw] max-w-[220px] shrink-0"
            >
              <PromotionPanel item={item} compact />
            </div>
          ))}
          {/* 마지막 카드 뒤 여백 */}
          <div className="w-1 shrink-0" aria-hidden />
        </div>
        {promotions.length > 1 && (
          <ScrollDots
            count={promotions.length}
            active={activeIdx}
            onDotClick={handleDotClick}
          />
        )}
      </div>
    );
  }

  const panels = variant === "left" ? promotions.slice(0, 2) : promotions.slice(2, 4);

  return (
    <aside
      aria-label="추천 도서"
      className={`flex shrink-0 flex-col gap-4 px-4 pt-6 ${
        variant === "left" ? "lg:w-52 xl:w-60" : "lg:w-52 xl:w-60"
      }`}
    >
      {panels.map((item) => (
        <PromotionPanel key={item.id} item={item} />
      ))}
    </aside>
  );
}
