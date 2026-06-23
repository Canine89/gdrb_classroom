"use client";

import { useState } from "react";
import { BookTabs } from "./book-tabs";
import { PromotionSidebars } from "./promotion-sidebars";
import { ShoppingCart } from "lucide-react";
import type { BookConfig, Resource, ReferenceLink, PromptItem, PromotionItem } from "@/lib/types";

interface BookData {
  book: BookConfig;
  resources: Resource[];
  references: ReferenceLink[];
  prompts: PromptItem[];
}

interface BookContentProps {
  booksData: BookData[];
  promotions: PromotionItem[];
}

export function BookContent({ booksData, promotions = [] }: BookContentProps) {
  const [activeBookIdx, setActiveBookIdx] = useState(0);
  const current = booksData[activeBookIdx];

  const hasPromotions = promotions.length > 0;

  return (
    <>
      {/* Book navigation tabs */}
      <nav className="border-b border-[#eee] bg-white">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="-mb-px flex gap-0 overflow-x-auto scroll-smooth-touch scrollbar-none pt-4">
            {booksData.map((bd, idx) => (
              <button
                key={bd.book.id}
                onClick={() => setActiveBookIdx(idx)}
                className={`relative min-h-[44px] whitespace-nowrap px-3.5 py-3 text-[13px] font-semibold transition-colors sm:px-5 sm:py-4 sm:text-[15px] ${
                  idx === activeBookIdx
                    ? "text-[#1a1a1a]"
                    : "text-[#999] hover:text-[#666]"
                }`}
              >
                {bd.book.name}
                {bd.book.isNew && (
                  <span className="pointer-events-none absolute -right-3 -top-1.5 z-10 inline-flex animate-[newPop_1.6s_ease-in-out_infinite] items-center rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold leading-none text-white shadow-[0_3px_10px_rgba(255,146,43,0.5)] sm:-right-4 sm:text-[11px]">
                    {/* 말풍선 꼬리 - 글자 뒤(아래 레이어)에서 왼쪽 아래로 향함 */}
                    <span className="absolute -bottom-[3px] left-2 z-0 h-2.5 w-2.5 rotate-45 rounded-[1px] bg-primary" />
                    <span className="relative z-10">NEW!</span>
                  </span>
                )}
                {idx === activeBookIdx && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative mx-auto w-full max-w-[960px] overflow-visible px-4 pt-5 pb-4 sm:px-6 sm:pt-10 sm:pb-6">
        {/* 와글와글 캐릭터들 - 카피 오른쪽 빈 공간 */}
        <img src="/avatar-1.png" alt="" aria-hidden className="pointer-events-none absolute right-[53%] top-45 hidden w-[42px] -rotate-[6deg] animate-[floatA_3s_ease-in-out_infinite] lg:block" />
        <img src="/avatar-2.png" alt="" aria-hidden className="pointer-events-none absolute right-[56%] top-24 hidden w-[42px] rotate-[5deg] animate-[floatB_3.5s_ease-in-out_0.3s_infinite] lg:block" />
        <img src="/avatar-3.png" alt="" aria-hidden className="pointer-events-none absolute right-[45%] top-18 hidden w-[42px] -rotate-[4deg] animate-[floatC_4s_ease-in-out_0.6s_infinite] lg:block" />
        <img src="/avatar-4.png" alt="" aria-hidden className="pointer-events-none absolute right-[44%] top-42 hidden w-[42px] rotate-[8deg] animate-[floatA_3.2s_ease-in-out_0.5s_infinite] lg:block" />
        <img src="/avatar-5.png" alt="" aria-hidden className="pointer-events-none absolute right-[50%] top-32 hidden w-[42px] -rotate-[7deg] animate-[floatB_3.8s_ease-in-out_0.8s_infinite] lg:block" />

        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[22px] font-extrabold leading-[1.35] text-[#1a1a1a] sm:text-[30px] lg:text-[36px]">
              골든래빗 도서와 함께
              <br />
              수업이{" "}
              <span className="relative inline-block">
                <span className="relative z-10">더 쉬워집니다</span>
                <img
                  src="/chalk-underline.png"
                  alt=""
                  className="pointer-events-none absolute bottom-[2px] w-[108%] object-cover opacity-[0.45]"
                />
              </span>
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#999] sm:mt-3 sm:text-[15px]">
              도서 연계 자료와 참고 링크를 한곳에서 ·{" "}
              <span className="font-semibold text-primary">{current.book.name}</span>
            </p>

            {/* 도서 구매 링크 */}
            {current.book.purchaseLinks && current.book.purchaseLinks.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4">
                <span className="flex items-center gap-1 text-[12px] font-bold text-[#1a1a1a] sm:text-[13px]">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  바로 구매
                </span>
                {current.book.purchaseLinks.map((link, i) => (
                  <a
                    key={link.store}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-wiggle touch-press inline-flex animate-[fadeSlideIn_0.5s_ease_both] items-center rounded-full border border-[#e0e0e0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#555] shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white hover:shadow-md sm:px-3.5 sm:py-2 sm:text-[13px]"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {link.store}
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* 도서 표지 */}
          {current.book.coverImage ? (
            <img
              src={current.book.coverImage}
              alt={current.book.name}
              className="hidden w-[140px] shrink-0 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:block lg:w-[180px]"
            />
          ) : (
            <img
              src="/hero-illustration.png"
              alt="슬기로운 교사 생활"
              className="hidden w-[180px] shrink-0 sm:block lg:w-[260px]"
            />
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#eee]" />

      {/* Content with chalk pattern background */}
      <div className="relative flex-1 overflow-x-clip">
        {/* Large chalk background decorations */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
          <img src="/chalk-zigzag.png" alt="" className="absolute -left-[5%] top-[20px] w-[480px] rotate-[5deg] opacity-[0.12]" />
          <img src="/chalk-loop.png" alt="" className="absolute -right-[3%] top-[180px] w-[380px] -rotate-[12deg] opacity-[0.10]" />
          <img src="/chalk-deco.png" alt="" className="absolute -left-[8%] top-[500px] w-[620px] rotate-[2deg] opacity-[0.06]" />
          <img src="/chalk-loop2.png" alt="" className="absolute -right-[5%] top-[750px] w-[360px] rotate-[15deg] opacity-[0.10]" />
          <img src="/chalk-zigzag2.png" alt="" className="absolute -left-[4%] top-[1000px] w-[450px] -rotate-[8deg] opacity-[0.12]" />
          <img src="/chalk-loop.png" alt="" className="absolute -right-[6%] top-[1300px] w-[340px] rotate-[25deg] opacity-[0.10]" />
        </div>

        {/* Mobile: 홍보 패널 가로 스크롤 */}
        {hasPromotions && (
          <div className="relative xl:hidden">
            <PromotionSidebars promotions={promotions} variant="mobile" />
          </div>
        )}

        {/* 3-column layout (xl+) / single column (below xl) */}
        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex">
            {/* Left sidebar */}
            {hasPromotions && (
              <div className="hidden xl:block">
                <div className="sticky top-[60px] pt-6">
                  <PromotionSidebars promotions={promotions} variant="left" />
                </div>
              </div>
            )}

            {/* Main content */}
            <div className="min-w-0 flex-1">
              <div className="mx-auto max-w-[960px] px-4 py-4 sm:px-6 sm:py-10">
                <BookTabs
                  key={current.book.id}
                  resources={current.resources}
                  references={current.references}
                  prompts={current.prompts}
                />
              </div>
            </div>

            {/* Right sidebar */}
            {hasPromotions && (
              <div className="hidden xl:block">
                <div className="sticky top-[60px] pt-6">
                  <PromotionSidebars promotions={promotions} variant="right" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
