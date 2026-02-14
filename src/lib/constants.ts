import type { ResourceType } from "./types";

export const SITE_NAME = "슬기로운 교사 생활";

export const RESOURCE_TYPE_CONFIG: Record<
  ResourceType,
  { bg: string; text: string; icon: string }
> = {
  "구글 스프레드시트": {
    bg: "bg-[#e6fcf5]",
    text: "text-[#087f5b]",
    icon: "FileSpreadsheet",
  },
  "구글 슬라이드": {
    bg: "bg-[#fff9db]",
    text: "text-[#e67700]",
    icon: "Presentation",
  },
  노트북LM: {
    bg: "bg-[#f3f0ff]",
    text: "text-[#6741d9]",
    icon: "Brain",
  },
  "실습 파일": {
    bg: "bg-[#e7f5ff]",
    text: "text-[#1971c2]",
    icon: "FileText",
  },
  기타: {
    bg: "bg-[#f1f3f5]",
    text: "text-[#495057]",
    icon: "File",
  },
};
