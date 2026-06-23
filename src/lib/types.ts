export type ResourceType =
  | "구글 스프레드시트"
  | "구글 슬라이드"
  | "노트북LM"
  | "실습 파일"
  | "기타";

export interface Resource {
  id: number;
  chapter: string;
  title: string;
  link: string;
  imageUrl: string;
  type: ResourceType;
  displayTitle: string;
}

export interface ReferenceLink {
  id: number;
  category: string;
  title: string;
  link: string;
}

export interface PromptItem {
  id: number;
  toc: string;       // 목차
  page: string;      // 페이지
  title: string;     // 제목
  practiceNo: string; // 실습 번호
  prompt: string;    // 프롬프트
  tip: string;       // 꿀팁
}

export interface PurchaseLink {
  store: string;
  url: string;
}

export interface BookConfig {
  id: string;
  name: string;
  sheetId: string;
  resourcesGid: string;
  referencesGid: string;
  promptsGid?: string;
  purchaseLinks?: PurchaseLink[];
  coverImage?: string;
  isNew?: boolean;
}

export interface PromotionItem {
  id: number;
  copy: string;   // B열: 광고 카피
  date: string;   // C열: 일시
  link: string;   // D열: 접속 링크
}
