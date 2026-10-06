import type { Metadata } from "next";
import { Suspense } from "react";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description: "가입한 이메일로 비밀번호 재설정 링크를 받아보세요.",
  openGraph: { title: "비밀번호 찾기", description: "가입한 이메일로 비밀번호 재설정 링크를 받아보세요." },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <span className="text-center text-[26px] leading-[1.3] font-bold text-[var(--accent)]">
        링크
      </span>
      <Suspense>
        <ForgotPasswordForm />
      </Suspense>
    </>
  );
}
