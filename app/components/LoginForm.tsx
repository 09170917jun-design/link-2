"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

function toKoreanError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (m.includes("email not confirmed"))
    return "이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.";
  if (m.includes("invalid") && m.includes("email"))
    return "올바른 이메일 형식이 아닙니다.";
  if (m.includes("rate limit") || m.includes("security purposes"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const canSubmit = email.trim() !== "" && password !== "";

  async function handleLogin() {
    setLoading(true);
    const { error } = await createClient().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      setToast(toKoreanError(error.message));
      return;
    }
    router.push("/");
    router.refresh();
  }

  async function handleKakaoLogin() {
    const { error } = await createClient().auth.signInWithOAuth({
      // 기본 kakao 제공자는 account_email을 강제 요청해서, 이메일 없이 쓸 수 있는
      // 커스텀 OIDC 제공자(Supabase 대시보드에서 생성)를 사용한다.
      provider: "custom:kakao",
      options: { redirectTo: `${location.origin}/auth/callback?next=/` },
    });
    if (error) setToast("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
  }

  return (
    <>
      {toast && <Toast message={toast} />}
      <div className="flex flex-col gap-[14px] rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
        <AuthField
          label="이메일"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <AuthField
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
        />
        <button
          type="button"
          disabled={!canSubmit || loading}
          onClick={handleLogin}
          className="btn-primary mt-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        <button
          type="button"
          onClick={handleKakaoLogin}
          aria-label="카카오로 로그인"
          className="kakao-btn flex items-center justify-center gap-2 rounded-xl bg-[#fee500] px-6 py-3.5 text-base font-bold text-[#191919]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#191919"
              d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.87 5.37 4.68 6.78l-.96 3.52a.4.4 0 0 0 .61.43L10.5 19.1c.49.06.99.1 1.5.1 5.52 0 10-3.58 10-8S17.52 3 12 3Z"
            />
          </svg>
          카카오 로그인
        </button>
        <Link
          href="/forgot-password"
          className="text-center text-[13px] leading-[1.4] font-bold text-[var(--accent)] hover:opacity-80"
        >
          비밀번호를 잊으셨나요?
        </Link>
        <p className="text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
          아직 계정이 없나요?{" "}
          <Link
            href="/signup"
            className="font-bold text-[var(--accent)] hover:opacity-80"
          >
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
}
