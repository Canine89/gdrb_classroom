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
      <TabsList className="mb-10 inline-flex h-12 gap-1 rounded-2xl bg-[#f5f5f5] p-1.5">
        <TabsTrigger
          value="resources"
          className="rounded-xl px-6 text-[15px] font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          제공 자료
          {resources.length > 0 && (
            <span className="ml-2 text-[13px] font-bold text-primary">
              {resources.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="references"
          className="rounded-xl px-6 text-[15px] font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          참고 링크
          {references.length > 0 && (
            <span className="ml-2 text-[13px] font-bold text-primary">
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
