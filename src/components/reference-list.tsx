import { ArrowRight, FolderOpen } from "lucide-react";
import type { ReferenceLink } from "@/lib/types";
import { EmptyState } from "./empty-state";

interface ReferenceListProps {
  references: ReferenceLink[];
}

export function ReferenceList({ references }: ReferenceListProps) {
  if (references.length === 0) {
    return <EmptyState message="등록된 참고 링크가 없습니다." />;
  }

  // Group by category
  const grouped = references.reduce<Record<string, ReferenceLink[]>>(
    (acc, ref) => {
      const key = ref.category || "기타";
      if (!acc[key]) acc[key] = [];
      acc[key].push(ref);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <FolderOpen className="h-[18px] w-[18px] text-primary sm:h-5 sm:w-5" />
            <h3 className="text-[16px] font-extrabold text-[#1a1a1a] sm:text-[18px]">
              {category}
            </h3>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#eee] sm:rounded-[20px]">
            {items.map((item, idx) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex min-h-[44px] items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-[#fafafa] sm:px-6 sm:py-4 ${
                  idx < items.length - 1 ? "border-b border-[#eee]" : ""
                }`}
              >
                <span className="text-[13px] font-medium leading-snug text-[#333] group-hover:text-[#1a1a1a] sm:text-[15px]">
                  {item.title}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#ccc] transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
