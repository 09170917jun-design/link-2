"use client";

import { useEffect } from "react";

type Props = {
  folderName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  folderName,
  onCancel,
  onConfirm,
}: Props) {
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
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="폴더 삭제 확인"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-hover)]"
      >
        <h2 className="text-xl leading-[1.4] font-bold text-[var(--text)]">
          폴더를 삭제할까요?
        </h2>
        <p className="mt-2 text-[13px] leading-snug text-[var(--text-sub)]">
          <b className="text-[var(--text)]">{folderName}</b> 폴더가 삭제돼요.
          이 작업은 되돌릴 수 없어요.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            autoFocus
            className="btn-secondary rounded-xl bg-[var(--hover-bg)] px-5 py-3 text-base font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger rounded-xl bg-[var(--error)] px-6 py-3 text-base font-bold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
