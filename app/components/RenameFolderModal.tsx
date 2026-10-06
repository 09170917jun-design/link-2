"use client";

import { useEffect, useState } from "react";

type Props = {
  currentName: string;
  onCancel: () => void;
  onSave: (name: string) => void;
};

export default function RenameFolderModal({
  currentName,
  onCancel,
  onSave,
}: Props) {
  const [name, setName] = useState(currentName);
  const trimmed = name.trim();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="폴더 이름 수정"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (trimmed) onSave(trimmed);
        }}
        className="w-full max-w-sm rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-hover)]"
      >
        <h2 className="mb-4 text-xl leading-[1.4] font-bold text-[var(--text)]">
          폴더 이름 수정
        </h2>
        <input
          autoFocus
          onFocus={(e) => e.currentTarget.select()}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="폴더 이름"
          aria-label="폴더 이름"
          className="input-field w-full rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)]"
        />
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary rounded-xl bg-[var(--hover-bg)] px-5 py-3 text-base font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!trimmed}
            className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 text-base font-bold text-white"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
