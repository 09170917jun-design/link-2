import type { Metadata } from "next";
import ResetPasswordForm from "../../components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
  description: "새 비밀번호를 설정하세요.",
  openGraph: { title: "비밀번호 재설정", description: "새 비밀번호를 설정하세요." },
};

export default function ResetPasswordPage() {
  return (
    <>
      <span className="text-center text-[26px] leading-[1.3] font-bold text-[var(--accent)]">
        링크
      </span>
      <ResetPasswordForm />
    </>
  );
}
