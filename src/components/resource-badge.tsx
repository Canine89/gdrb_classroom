import {
  FileSpreadsheet,
  Presentation,
  Brain,
  FileText,
  File,
} from "lucide-react";
import { RESOURCE_TYPE_CONFIG } from "@/lib/constants";
import type { ResourceType } from "@/lib/types";

const ICON_MAP = {
  FileSpreadsheet,
  Presentation,
  Brain,
  FileText,
  File,
} as const;

interface ResourceBadgeProps {
  type: ResourceType;
}

export function ResourceBadge({ type }: ResourceBadgeProps) {
  const config = RESOURCE_TYPE_CONFIG[type];
  const IconComponent = ICON_MAP[config.icon as keyof typeof ICON_MAP];

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.bg} ${config.text}`}
    >
      <IconComponent className="h-3 w-3" />
      {type}
    </span>
  );
}
