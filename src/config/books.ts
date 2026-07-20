import type { BookConfig } from "@/lib/types";

export const books: BookConfig[] = [
  {
    id: "canva-ai",
    name: "캔바 AI 수업 활용법",
    sheetId: "1xqsNDu2Rl44mNpoKd9LxlzQfYBtB0jou1SvVpDMVSO8",
    resourcesGid: "0",
    referencesGid: "2013574828",
    // 캔바 책은 프롬프트 탭 미노출 (promptsGid 생략 → fetchPrompts가 빈 배열 반환)
    coverImage: "/book-cover-canva.png",
    isNew: true,
    purchaseLinks: [
      { store: "골든래빗", url: "https://gdrb.kr/0008h" },
      { store: "교보문고", url: "https://gdrb.kr/k000cz" },
      { store: "알라딘", url: "https://gdrb.kr/a000d0" },
      { store: "예스24", url: "https://gdrb.kr/y000d1" },
    ],
  },
  {
    id: "google-classroom",
    name: "구글 클래스룸 수업 활용법",
    sheetId: "1Xa-8NEeFRWHgLSRS8AToRHCSrslqWwD6C5gUhrUOJkI",
    resourcesGid: "0",
    referencesGid: "2013574828",
    promptsGid: "1701772222",
    coverImage: "/book-cover-google-classroom.jpg",
    purchaseLinks: [
      { store: "교보문고", url: "https://bit.ly/4aN3nnx" },
      { store: "예스24", url: "https://bit.ly/4aLa8Gq" },
      { store: "알라딘", url: "https://bit.ly/40axdNX" },
    ],
  },
];
