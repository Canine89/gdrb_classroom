import { BookOpen } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eee] bg-white">
      <div className="mx-auto flex max-w-[960px] items-center px-6 py-4">
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-6 w-6 text-[#1a1a1a]" strokeWidth={2.5} />
          <span className="text-[18px] font-extrabold tracking-tight text-[#1a1a1a]">
            {SITE_NAME}
          </span>
        </div>
      </div>
    </header>
  );
}
