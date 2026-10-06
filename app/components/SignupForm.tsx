"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

function toKoreanError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered"))
    return "이미 가입된 이메일입니다.";
  if (m.includes("password") && m.includes("characters"))
    return "비밀번호는 6자 이상이어야 합니다.";
  if (m.includes("invalid") && m.includes("email"))
    return "올바른 이메일 형식이 아닙니다.";
  if (m.includes("rate limit") || m.includes("security purposes"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  return "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const canSubmit = email.trim() !== "" && password !== "" && confirm !== "";

  async function handleSignup() {
    if (password !== confirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    const { error } = await createClient().auth.signUp({
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
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          autoComplete="new-password"
          value={confirm}
          onChange={setConfirm}
        />
        <button
          type="button"
          disabled={!canSubmit || loading}
          onClick={handleSignup}
          className="btn-primary mt-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white"
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
        <p className="text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
          이미 계정이 있나요?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--accent)] hover:opacity-80"
          >
            로그인
          </Link>
        </p>
      </div>
    </>
  );
}
