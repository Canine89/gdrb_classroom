import { ArrowRight } from "lucide-react";
import { ResourceBadge } from "./resource-badge";
import { driveUrlToThumbnail, getPlaceholderGradient } from "@/lib/image-utils";
import type { Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export function ResourceCard({ resource, index }: ResourceCardProps) {
  const thumbnailUrl = driveUrlToThumbnail(resource.imageUrl);

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#eee] bg-white transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:rounded-[20px]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={resource.displayTitle}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getPlaceholderGradient(index)}`}
          >
            <span className="text-[28px] font-extrabold text-white/70 sm:text-[32px]">
              {resource.displayTitle.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:gap-2 sm:p-5">
        {/* Badge */}
        <ResourceBadge type={resource.type} />

        {/* Title */}
        <h3 className="line-clamp-2 text-[14px] font-bold leading-[1.4] text-[#1a1a1a] sm:text-[16px]">
          {resource.displayTitle}
        </h3>

        {/* Chapter */}
        {resource.chapter && (
          <p className="text-[12px] text-[#999] sm:text-[13px]">{resource.chapter}</p>
        )}

        {/* Arrow */}
        <div className="mt-auto flex items-center gap-1 pt-1 text-[12px] font-semibold text-primary sm:pt-2 sm:text-[13px] sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
          자료 열기
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      </div>
    </a>
  );
}
