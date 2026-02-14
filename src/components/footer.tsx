import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[#eee]">
      <div className="mx-auto max-w-[960px] px-6 py-8 text-center text-[13px] text-[#999]">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME} · 골든래빗 도서 기반
        </p>
      </div>
    </footer>
  );
}
