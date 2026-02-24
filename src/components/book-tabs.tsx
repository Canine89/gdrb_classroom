"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceGrid } from "./resource-grid";
import { ReferenceList } from "./reference-list";
import { PromptCollection } from "./prompt-collection";
import type { Resource, ReferenceLink, PromptItem } from "@/lib/types";

interface BookTabsProps {
  resources: Resource[];
  references: ReferenceLink[];
  prompts: PromptItem[];
}

export function BookTabs({ resources, references, prompts }: BookTabsProps) {
  const hasPrompts = prompts.length > 0;

  return (
    <Tabs defaultValue="resources" className="w-full">
      <div className="-mx-4 -mb-px min-w-0 overflow-x-auto border-b border-[#eee] px-4 scroll-smooth-touch scrollbar-none sm:-mx-6 sm:px-6">
        <TabsList variant="line" className="inline-flex h-11 min-h-[44px] flex-nowrap gap-0 border-0 bg-transparent p-0 sm:h-14">
          <TabsTrigger
            value="resources"
            className="relative min-h-[44px] shrink-0 rounded-none border-0 bg-transparent px-3 py-2.5 text-[13px] font-semibold text-[#999] shadow-none transition-colors hover:text-[#666] data-[state=active]:bg-transparent data-[state=active]:text-[#1a1a1a] data-[state=active]:shadow-none sm:px-5 sm:py-4 sm:text-[15px] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full data-[state=active]:after:bg-primary"
          >
            제공 자료
            {resources.length > 0 && (
              <span className="ml-1 font-bold text-primary sm:ml-2">
                {resources.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="references"
            className="relative min-h-[44px] shrink-0 rounded-none border-0 bg-transparent px-3 py-2.5 text-[13px] font-semibold text-[#999] shadow-none transition-colors hover:text-[#666] data-[state=active]:bg-transparent data-[state=active]:text-[#1a1a1a] data-[state=active]:shadow-none sm:px-5 sm:py-4 sm:text-[15px] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full data-[state=active]:after:bg-primary"
          >
            참고 링크
            {references.length > 0 && (
              <span className="ml-1 font-bold text-primary sm:ml-2">
                {references.length}
              </span>
            )}
          </TabsTrigger>
          {hasPrompts && (
            <TabsTrigger
              value="prompts"
              className="relative min-h-[44px] shrink-0 rounded-none border-0 bg-transparent px-3 py-2.5 text-[13px] font-semibold text-[#999] shadow-none transition-colors hover:text-[#666] data-[state=active]:bg-transparent data-[state=active]:text-[#1a1a1a] data-[state=active]:shadow-none sm:px-5 sm:py-4 sm:text-[15px] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-full data-[state=active]:after:bg-primary"
            >
              프롬프트
              <span className="ml-1 font-bold text-primary sm:ml-2">
                {prompts.length}
              </span>
            </TabsTrigger>
          )}
        </TabsList>
      </div>

      <TabsContent value="resources" className="pt-5 sm:pt-10">
        <ResourceGrid resources={resources} />
      </TabsContent>

      <TabsContent value="references" className="pt-5 sm:pt-10">
        <ReferenceList references={references} />
      </TabsContent>

      {hasPrompts && (
        <TabsContent value="prompts" className="pt-5 sm:pt-10">
          <PromptCollection prompts={prompts} />
        </TabsContent>
      )}
    </Tabs>
  );
}
