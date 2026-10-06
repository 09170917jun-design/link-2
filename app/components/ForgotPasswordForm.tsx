"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

function toKoreanError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid") && m.includes("email"))
    return "올바른 이메일 형식이 아닙니다.";
  if (m.includes("rate limit") || m.includes("security purposes"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  return "메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ForgotPasswordForm() {
  const expired = useSearchParams().get("error") === "expired";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(
    expired ? "링크가 만료되었거나 올바르지 않습니다. 다시 요청해 주세요." : "",
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleSend() {
    setLoading(true);
    const { error } = await createClient().auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${location.origin}/auth/callback?next=/reset-password` },
    );
    setLoading(false);
    if (error) {
      setToast(toKoreanError(error.message));
      return;
    }
    setSent(true);
  }

  return (
    <>
      {toast && <Toast message={toast} />}
      <div className="flex flex-col gap-[14px] rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
        <h1 className="text-[20px] leading-[1.4] font-bold text-[var(--text)]">
          비밀번호 찾기
        </h1>
        <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
          가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드려요.
        </p>
        <AuthField
          label="이메일"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <button
          type="button"
          disabled={email.trim() === "" || loading}
          onClick={handleSend}
          className="btn-primary mt-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white"
        >
          {loading ? "보내는 중..." : "비밀번호 리셋 링크 발송"}
        </button>
        {sent && (
          <p className="text-center text-[13px] leading-[1.4] font-bold text-[var(--accent)]">
            메일을 보냈습니다. 메일함에서 링크를 확인해 주세요.
          </p>
        )}
        <p className="text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
          <Link
            href="/login"
            className="font-bold text-[var(--accent)] hover:opacity-80"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </>
  );
}
