"use client";

import { useState } from "react";
import { BookTabs } from "./book-tabs";
import { PromotionSidebars } from "./promotion-sidebars";
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

  return (
    <>
      {/* Book navigation tabs */}
      <nav className="border-b border-[#eee] bg-white">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="-mb-px flex gap-0 overflow-x-auto scroll-smooth-touch scrollbar-none">
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
                {idx === activeBookIdx && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="mx-auto w-full max-w-[960px] px-4 pt-5 pb-4 sm:px-6 sm:pt-10 sm:pb-6">
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
          </div>
          <img
            src="/hero-illustration.png"
            alt="슬기로운 교사 생활"
            className="hidden w-[180px] shrink-0 sm:block lg:w-[260px]"
          />
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

        <div className="relative flex flex-col lg:flex-row">
          {/* Mobile: 홍보 패널 가로 스크롤 */}
          {promotions.length > 0 && (
            <PromotionSidebars promotions={promotions} variant="mobile" />
          )}

          {/* Desktop: 좌측 2개 | 메인 | 우측 2개 */}
          <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
            {promotions.length > 0 && (
              <div className="hidden lg:block">
                <PromotionSidebars promotions={promotions} variant="left" />
              </div>
            )}
            <div className="flex min-w-0 flex-1 justify-center">
              <main className="w-full max-w-[960px] px-4 py-4 sm:px-6 sm:py-10">
                <BookTabs
                  key={current.book.id}
                  resources={current.resources}
                  references={current.references}
                  prompts={current.prompts}
                />
              </main>
            </div>
            {promotions.length > 0 && (
              <div className="hidden lg:block">
                <PromotionSidebars promotions={promotions} variant="right" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
