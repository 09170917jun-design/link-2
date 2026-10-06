"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addBookmark } from "../lib/bookmarkStore";

export default function NewLinkForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await addBookmark(url.trim());
          router.push("/");
        } catch {
          alert("링크를 저장하지 못했습니다. 다시 시도해 주세요.");
        }
      }}
      className="flex gap-2 rounded-2xl bg-[var(--surface)] p-4 shadow-[var(--shadow)]"
    >
      <input
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        aria-label="링크 주소"
        className="min-w-0 flex-1 input-field rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)]"
      />
      <button
        type="submit"
        className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 text-base font-bold text-white"
      >
        저장
      </button>
    </form>
  );
}
