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
  const hasMultipleBooks = booksData.length > 1;

  return (
    <>
      {/* Book navigation tabs */}
      <nav className="border-b border-[#eee] bg-white">
        <div className="mx-auto max-w-[960px] px-6">
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {booksData.map((bd, idx) => (
              <button
                key={bd.book.id}
                onClick={() => setActiveBookIdx(idx)}
                className={`relative whitespace-nowrap px-5 py-4 text-[15px] font-semibold transition-colors ${
                  idx === activeBookIdx
                    ? "text-[#1a1a1a]"
                    : "text-[#999] hover:text-[#666]"
                }`}
              >
                {bd.book.name}
                {/* Active indicator */}
                {idx === activeBookIdx && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="mx-auto w-full max-w-[960px] px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] font-extrabold leading-[1.3] text-[#1a1a1a] sm:text-[36px]">
              골든래빗 도서와 함께
              <br />
              수업이 더 쉬워집니다
            </h2>
            <p className="mt-3 text-[15px] text-[#999] sm:text-[16px]">
              도서 연계 자료와 참고 링크를 한곳에서 ·{" "}
              <span className="font-semibold text-primary">{current.book.name}</span>
            </p>
          </div>
          <img
            src="/hero-illustration.png"
            alt="슬기로운 교사 생활"
            className="hidden w-[220px] sm:block lg:w-[280px]"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#eee]" />

      {/* Content */}
      <main className="mx-auto w-full max-w-[960px] flex-1 px-6 py-10">
        <BookTabs
          key={current.book.id}
          resources={current.resources}
          references={current.references}
        />
      </main>
    </>
  );
}
