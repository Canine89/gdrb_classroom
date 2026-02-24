"use client";

import { useState, useMemo } from "react";
import { Copy, Search, Check, ChevronDown } from "lucide-react";
import type { PromptItem } from "@/lib/types";
import { EmptyState } from "./empty-state";

interface PromptCollectionProps {
  prompts: PromptItem[];
}

function matchText(text: string, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return text.toLowerCase().includes(q);
}

export function PromptCollection({ prompts }: PromptCollectionProps) {
  const [search, setSearch] = useState("");
  const [tocFilter, setTocFilter] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const uniqueTocs = useMemo(() => {
    const set = new Set(prompts.map((p) => p.toc).filter(Boolean));
    return Array.from(set).sort();
  }, [prompts]);

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch =
        matchText(p.title, search) ||
        matchText(p.prompt, search) ||
        matchText(p.toc, search) ||
        matchText(p.tip, search) ||
        matchText(p.practiceNo, search);
      const matchesToc = !tocFilter || p.toc === tocFilter;
      return matchesSearch && matchesToc;
    });
  }, [prompts, search, tocFilter]);

  const handleCopy = async (item: PromptItem, key: string) => {
    const text = item.prompt || `${item.title}${item.tip ? `\n\n${item.tip}` : ""}`.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // fallback
    }
  };

  if (prompts.length === 0) {
    return <EmptyState message="등록된 프롬프트가 없습니다." />;
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Search & Filter - 모바일: 세로 배치, 데스크톱: 가로 배치 */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-4">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:left-4" aria-hidden />
          <input
            type="search"
            placeholder="검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-base text-[#1a1a1a] placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-12 sm:rounded-2xl sm:pl-11 sm:pr-4 sm:text-[15px]"
            aria-label="프롬프트 검색"
          />
        </div>
        <div className="relative sm:w-[220px]">
          <select
            value={tocFilter}
            onChange={(e) => setTocFilter(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-border bg-background px-3.5 pr-9 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-12 sm:rounded-2xl sm:px-4 sm:pr-10 sm:text-[15px]"
            aria-label="목차 필터"
          >
            <option value="">목차 전체</option>
            {uniqueTocs.map((toc) => (
              <option key={toc} value={toc}>
                {toc}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:right-4" aria-hidden />
        </div>
      </div>

      {/* Result count */}
      <p className="text-[13px] text-muted-foreground sm:text-[14px]">
        <span className="font-semibold text-foreground">{filtered.length}</span>개
        {filtered.length !== prompts.length && (
          <span> / 총 {prompts.length}개</span>
        )}
      </p>

      {/* Prompt cards */}
      <div className="space-y-3 sm:space-y-4">
        {filtered.map((item, idx) => {
          const mainContent = item.prompt || item.title;
          const itemKey = `${item.id}-${item.toc}-${item.title}-${idx}`;

          return (
            <article
              key={itemKey}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md sm:rounded-[20px]"
            >
              <div className="p-3.5 sm:p-6">
                {/* Header: title, meta, copy */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {item.title && (
                      <h3 className="text-[14px] font-bold leading-snug text-foreground sm:text-[16px]">
                        {item.title}
                      </h3>
                    )}
                    {(item.toc || item.page || item.practiceNo) && (
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground sm:gap-2 sm:text-[13px]">
                        {item.toc && (
                          <span className="rounded-md bg-muted px-2 py-0.5 font-medium sm:rounded-lg sm:px-2.5 sm:py-1">
                            {item.toc}
                          </span>
                        )}
                        {item.page && (
                          <span>p.{item.page}</span>
                        )}
                        {item.practiceNo && (
                          <span className="font-semibold text-primary">
                            실습 {item.practiceNo}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item, itemKey)}
                    className="touch-press flex min-h-[40px] min-w-[40px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[13px] font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-[44px] sm:min-w-[44px] sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-[14px]"
                    title="프롬프트 복사"
                    aria-label={copiedKey === itemKey ? "복사됨" : "프롬프트 복사"}
                  >
                    {copiedKey === itemKey ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="hidden sm:inline">복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span className="hidden sm:inline">복사</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Prompt content */}
                <div className="mt-3 rounded-lg bg-muted/50 px-3.5 py-2.5 sm:mt-4 sm:rounded-xl sm:px-5 sm:py-4">
                  <pre className="whitespace-pre-wrap break-words font-sans text-[13px] leading-[1.65] text-foreground sm:text-[14px]">
                    {mainContent}
                  </pre>
                </div>

                {item.tip && (
                  <div className="mt-2.5 rounded-lg border border-amber-200/60 bg-amber-50/80 px-3.5 py-2 text-[12px] leading-relaxed text-amber-900 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-100 sm:mt-3 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-[14px]">
                    <span className="font-semibold">💡 꿀팁:</span> {item.tip}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-12 text-center sm:rounded-2xl sm:py-16">
          <p className="text-[14px] text-muted-foreground sm:text-[15px]">
            검색 결과가 없습니다.
          </p>
          <p className="mt-1 text-[12px] text-muted-foreground/80 sm:text-[13px]">
            다른 검색어나 목차를 선택해 보세요.
          </p>
        </div>
      )}
    </div>
  );
}
