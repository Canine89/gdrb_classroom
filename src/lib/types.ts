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

export interface BookConfig {
  id: string;
  name: string;
  sheetId: string;
  resourcesGid: string;
  referencesGid: string;
}
