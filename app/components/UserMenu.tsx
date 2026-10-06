"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { clearBookmarks } from "../lib/bookmarkStore";
import { clearFolders } from "../lib/folderStore";
import { useUser } from "../lib/useUser";

export default function UserMenu() {
  const router = useRouter();
  const user = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="max-w-[200px] truncate text-[13px] font-bold text-[var(--text-sub)]">
        {user.email}
      </span>
      <button
        type="button"
        onClick={async () => {
          await createClient().auth.signOut();
          clearBookmarks();
          clearFolders();
          router.push("/");
          router.refresh();
        }}
        className="btn-secondary rounded-xl bg-[var(--hover-bg)] px-4 py-2 text-[13px] font-bold text-[var(--accent)]"
      >
        로그아웃
      </button>
    </div>
  );
}
