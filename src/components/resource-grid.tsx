import type { Resource } from "@/lib/types";
import { ResourceCard } from "./resource-card";
import { EmptyState } from "./empty-state";

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  if (resources.length === 0) {
    return <EmptyState message="등록된 제공 자료가 없습니다." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      {resources.map((resource, index) => (
        <ResourceCard key={resource.id} resource={resource} index={index} />
      ))}
    </div>
  );
}
