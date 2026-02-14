import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "슬기로운 교사 생활",
  description:
    "골든래빗 출판 도서의 연계 자료와 유용한 참고 링크를 한곳에서 만나보세요.",
  openGraph: {
    title: "슬기로운 교사 생활",
    description:
      "골든래빗 출판 도서의 연계 자료와 유용한 참고 링크를 한곳에서 만나보세요.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
