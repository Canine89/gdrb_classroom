"use client";

import { ExternalLink } from "lucide-react";
import type { PromotionItem } from "@/lib/types";

interface PromotionPanelProps {
  item: PromotionItem;
  compact?: boolean;
}

const isKakaoAd = (copy: string) =>
  copy.includes("카카오톡") || copy.includes("카톡");

const isGidapyeongAd = (copy: string) => copy.includes("기대평");

const isYes24LectureAd = (copy: string) =>
  copy.includes("예스24") || copy.includes("yes24");

const isKyoboLectureAd = (copy: string) =>
  copy.includes("교보") || copy.includes("교보문고");

export function PromotionPanel({ item, compact }: PromotionPanelProps) {
  const showKakaoLogo = isKakaoAd(item.copy);
  const showGidapyeongImage = isGidapyeongAd(item.copy);
  const showYes24Image = isYes24LectureAd(item.copy);
  const showKyoboImage = isKyoboLectureAd(item.copy);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="touch-press group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg sm:rounded-2xl"
    >
      {showKakaoLogo && (
        <div className="hidden items-center justify-center bg-[#FEE500] p-4 lg:flex lg:p-5">
          <img
            src="/kakao-talk-logo.png"
            alt="카카오톡"
            className="h-12 w-auto sm:h-14"
          />
        </div>
      )}
      {showGidapyeongImage && (
        <div className="relative hidden aspect-[4/3] overflow-hidden bg-[#FEE500] lg:block">
          <img
            src="/event-gidapyeong.png"
            alt="기대평 이벤트"
            className="h-full w-full object-contain"
          />
        </div>
      )}
      {showYes24Image && (
        <div className="relative hidden aspect-[4/3] overflow-hidden lg:block">
          <img
            src="/event-yes24-lecture.png"
            alt="예스24 무료 특강"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {showKyoboImage && (
        <div className="relative hidden aspect-[4/3] overflow-hidden lg:block">
          <img
            src="/event-kyobo-lecture.png"
            alt="교보문고 무료 특강"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className={compact ? "p-3.5" : "p-4 sm:p-5"}>
        <p className={`font-semibold leading-snug text-foreground ${compact ? "text-[13px]" : "text-[14px] sm:text-[15px]"}`}>
          {item.copy}
        </p>
        {item.date && (
          <p className="mt-1 text-[11px] text-muted-foreground sm:mt-1.5 sm:text-[13px]">
            {item.date}
          </p>
        )}
        <span className={`mt-2 inline-flex items-center gap-1 font-semibold text-primary sm:mt-3 sm:gap-1.5 ${compact ? "text-[12px]" : "text-[13px] sm:text-[14px]"}`}>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          바로가기
        </span>
      </div>
    </a>
  );
}
