import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "등록된 자료가 없습니다.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-[#eee] py-20 text-[#999]">
      <Inbox className="mb-4 h-12 w-12 text-[#ccc]" />
      <p className="text-[16px] font-medium">{message}</p>
    </div>
  );
}
