"use client";

import { useState } from "react";
import { BookTabs } from "./book-tabs";
import type { BookConfig, Resource, ReferenceLink } from "@/lib/types";

interface BookData {
  book: BookConfig;
  resources: Resource[];
  references: ReferenceLink[];
}

interface BookContentProps {
  booksData: BookData[];
}

export function BookContent({ booksData }: BookContentProps) {
  const [activeBookIdx, setActiveBookIdx] = useState(0);
  const current = booksData[activeBookIdx];

  return (
    <>
      {/* Book navigation tabs */}
      <nav className="border-b border-[#eee] bg-white">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="-mb-px flex gap-0 overflow-x-auto scrollbar-none">
            {booksData.map((bd, idx) => (
              <button
                key={bd.book.id}
                onClick={() => setActiveBookIdx(idx)}
                className={`relative min-h-[44px] whitespace-nowrap px-4 py-3 text-[14px] font-semibold transition-colors sm:px-5 sm:py-4 sm:text-[15px] ${
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
      <section className="mx-auto w-full max-w-[960px] px-4 pt-8 pb-5 sm:px-6 sm:pt-10 sm:pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[24px] font-extrabold leading-[1.3] text-[#1a1a1a] sm:text-[30px] lg:text-[36px]">
              골든래빗 도서와 함께
              <br />
              수업이 더 쉬워집니다
            </h2>
            <p className="mt-2 text-[13px] text-[#999] sm:mt-3 sm:text-[15px]">
              도서 연계 자료와 참고 링크를 한곳에서 ·{" "}
              <span className="font-semibold text-primary">{current.book.name}</span>
            </p>
          </div>
          <img
            src="/hero-illustration.png"
            alt="슬기로운 교사 생활"
            className="hidden w-[180px] sm:block lg:w-[260px]"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#eee]" />

      {/* Content */}
      <main className="mx-auto w-full max-w-[960px] flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <BookTabs
          key={current.book.id}
          resources={current.resources}
          references={current.references}
        />
      </main>
    </>
  );
}
