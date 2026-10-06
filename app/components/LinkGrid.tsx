"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  loadBookmarks,
  subscribe,
} from "../lib/bookmarkStore";
import LinkCard from "./LinkCard";

export default function LinkGrid() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    loadBookmarks();
  }, []);
  const bookmarks = saved;

  return (
    <section className="flex-1 overflow-y-auto px-5 pt-9 pb-9">
      <div className="mx-auto flex max-w-[640px] flex-col gap-7">
        <h1 className="text-[26px] leading-[1.3] font-bold text-[var(--text)]">
          내 링크
        </h1>
        <div className="flex flex-col gap-3">
          {bookmarks.map((bookmark) => (
            <LinkCard key={bookmark.id} {...bookmark} />
          ))}
        </div>
      </div>
    </section>
  );
}
