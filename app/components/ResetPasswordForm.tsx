"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

function toKoreanError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("same") && m.includes("password"))
    return "이전과 다른 비밀번호를 입력해 주세요.";
  if (m.includes("password") && m.includes("characters"))
    return "비밀번호는 6자 이상이어야 합니다.";
  return "비밀번호를 변경하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleReset() {
    if (password !== confirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    const { error } = await createClient().auth.updateUser({ password });
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
        <h1 className="text-[20px] leading-[1.4] font-bold text-[var(--text)]">
          비밀번호 재설정
        </h1>
        <AuthField
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호를 한 번 더 입력하세요"
          autoComplete="new-password"
          value={confirm}
          onChange={setConfirm}
        />
        <button
          type="button"
          disabled={password === "" || confirm === "" || loading}
          onClick={handleReset}
          className="btn-primary mt-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white"
        >
          {loading ? "변경 중..." : "비밀번호 변경"}
        </button>
      </div>
    </>
  );
}
