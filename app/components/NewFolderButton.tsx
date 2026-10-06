"use client";

import { useEffect, useState } from "react";
import { addFolder } from "../lib/folderStore";

export default function NewFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const close = () => {
    setOpen(false);
    setName("");
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary rounded-xl bg-[var(--hover-bg)] px-4 py-2 text-sm font-bold text-[var(--accent)]"
      >
        + 새 폴더
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-label="새 폴더"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              const trimmed = name.trim();
              if (!trimmed) return;
              addFolder(trimmed);
              close();
            }}
            className="w-full max-w-sm rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-hover)]"
          >
            <h2 className="mb-4 text-xl leading-[1.4] font-bold text-[var(--text)]">
              새 폴더
            </h2>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="폴더 이름"
              aria-label="폴더 이름"
              className="input-field w-full rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)]"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="btn-secondary rounded-xl bg-[var(--hover-bg)] px-5 py-3 text-base font-bold text-[var(--accent)]"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 text-base font-bold text-white"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
