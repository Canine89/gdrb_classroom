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
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="mb-4 flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <h3 className="text-[18px] font-extrabold text-[#1a1a1a]">
              {category}
            </h3>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-[#eee]">
            {items.map((item, idx) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#fafafa] ${
                  idx < items.length - 1 ? "border-b border-[#eee]" : ""
                }`}
              >
                <span className="text-[15px] font-medium text-[#333] group-hover:text-[#1a1a1a]">
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
