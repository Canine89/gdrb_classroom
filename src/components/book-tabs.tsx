"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceGrid } from "./resource-grid";
import { ReferenceList } from "./reference-list";
import type { Resource, ReferenceLink } from "@/lib/types";

interface BookTabsProps {
  resources: Resource[];
  references: ReferenceLink[];
}

export function BookTabs({ resources, references }: BookTabsProps) {
  return (
    <Tabs defaultValue="resources" className="w-full">
      <TabsList className="mb-6 inline-flex h-11 gap-1 rounded-xl bg-[#f5f5f5] p-1 sm:mb-10 sm:h-12 sm:rounded-2xl sm:p-1.5">
        <TabsTrigger
          value="resources"
          className="min-h-[36px] rounded-lg px-4 text-[13px] font-semibold transition-all sm:rounded-xl sm:px-6 sm:text-[15px] data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          제공 자료
          {resources.length > 0 && (
            <span className="ml-1.5 text-[11px] font-bold text-primary sm:ml-2 sm:text-[13px]">
              {resources.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="references"
          className="min-h-[36px] rounded-lg px-4 text-[13px] font-semibold transition-all sm:rounded-xl sm:px-6 sm:text-[15px] data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          참고 링크
          {references.length > 0 && (
            <span className="ml-1.5 text-[11px] font-bold text-primary sm:ml-2 sm:text-[13px]">
              {references.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="resources">
        <ResourceGrid resources={resources} />
      </TabsContent>

      <TabsContent value="references">
        <ReferenceList references={references} />
      </TabsContent>
    </Tabs>
  );
}
