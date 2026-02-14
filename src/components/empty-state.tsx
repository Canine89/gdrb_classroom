import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "등록된 자료가 없습니다.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#eee] py-14 text-[#999] sm:rounded-[20px] sm:py-20">
      <Inbox className="mb-3 h-10 w-10 text-[#ccc] sm:mb-4 sm:h-12 sm:w-12" />
      <p className="text-[14px] font-medium sm:text-[16px]">{message}</p>
    </div>
  );
}
