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
      className="group flex flex-col overflow-hidden rounded-[20px] border border-[#eee] bg-white transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
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
            <span className="text-[32px] font-extrabold text-white/70">
              {resource.displayTitle.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {/* Badge */}
        <ResourceBadge type={resource.type} />

        {/* Title */}
        <h3 className="line-clamp-2 text-[16px] font-bold leading-[1.4] text-[#1a1a1a]">
          {resource.displayTitle}
        </h3>

        {/* Chapter */}
        {resource.chapter && (
          <p className="text-[13px] text-[#999]">{resource.chapter}</p>
        )}

        {/* Arrow */}
        <div className="mt-auto flex items-center gap-1 pt-2 text-[13px] font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          자료 열기
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
}
