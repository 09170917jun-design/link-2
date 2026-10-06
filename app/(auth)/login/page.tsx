import type { Metadata } from "next";
import LoginForm from "../../components/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "링크 서비스에 로그인하고 저장한 링크를 확인하세요.",
  openGraph: { title: "로그인", description: "링크 서비스에 로그인하고 저장한 링크를 확인하세요." },
};

export default function LoginPage() {
  return (
    <>
      <span className="text-center text-[26px] leading-[1.3] font-bold text-[var(--accent)]">
        링크
      </span>
      <LoginForm />
    </>
  );
}
