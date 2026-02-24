import { BookOpen } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eee] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[960px] items-center px-4 py-2.5 sm:px-6 sm:py-4">
        <div className="flex min-h-[44px] items-center gap-2">
          <BookOpen className="h-5 w-5 shrink-0 text-[#1a1a1a] sm:h-6 sm:w-6" strokeWidth={2.5} />
          <span className="text-[15px] font-extrabold tracking-tight text-[#1a1a1a] sm:text-[18px]">
            {SITE_NAME}
          </span>
        </div>
      </div>
    </header>
  );
}
