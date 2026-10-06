import type { Metadata } from "next";
import SignupForm from "../../components/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "링크 서비스에 가입하고 링크를 저장해 보세요.",
  openGraph: { title: "회원가입", description: "링크 서비스에 가입하고 링크를 저장해 보세요." },
};

export default function SignupPage() {
  return (
    <>
      <span className="text-center text-[26px] leading-[1.3] font-bold text-[var(--accent)]">
        링크
      </span>
      <SignupForm />
    </>
  );
}
