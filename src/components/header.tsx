import { BookOpen, ExternalLink } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eee] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-4 py-2.5 sm:px-6 sm:py-4">
        <div className="flex min-h-[44px] items-center gap-2">
          <BookOpen className="h-5 w-5 shrink-0 text-[#1a1a1a] sm:h-6 sm:w-6" strokeWidth={2.5} />
          <span className="text-[15px] font-extrabold tracking-tight text-[#1a1a1a] sm:text-[18px]">
            {SITE_NAME}
          </span>
        </div>
        <a
          href="https://goldenrabbit.co.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="touch-press flex min-h-[36px] items-center gap-1 rounded-full border border-[#e0e0e0] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#555] transition-colors hover:border-primary hover:bg-primary hover:text-white sm:px-3.5 sm:py-2 sm:text-[13px]"
        >
          골든래빗
          <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </a>
      </div>
    </header>
  );
}
