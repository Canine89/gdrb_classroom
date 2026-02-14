import type { BookConfig } from "@/lib/types";

export const books: BookConfig[] = [
  {
    id: "google-classroom",
    name: "구글 클래스룸 수업활용법",
    sheetId: process.env.GOOGLE_SHEET_ID ?? "",
    resourcesGid: process.env.RESOURCES_GID ?? "0",
    referencesGid: process.env.REFERENCES_GID ?? "2013574828",
  },
];
