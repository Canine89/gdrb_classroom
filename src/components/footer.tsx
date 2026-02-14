import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[#eee]">
      <div className="mx-auto max-w-[960px] px-4 py-6 text-center text-[12px] text-[#999] sm:px-6 sm:py-8 sm:text-[13px]">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME} · 골든래빗 도서 기반
        </p>
      </div>
    </footer>
  );
}
