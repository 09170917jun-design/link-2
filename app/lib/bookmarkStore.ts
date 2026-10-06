import { createClient } from "../../utils/supabase/client";
import type { Bookmark } from "./data";

// Client-side cache of rows from the Supabase `links` table.
const EMPTY: Bookmark[] = [];
const listeners = new Set<() => void>();

let saved: Bookmark[] = EMPTY;

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): Bookmark[] {
  return saved;
}

export function getServerSnapshot(): Bookmark[] {
  return EMPTY;
}

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  folder_id: number | null;
};

function toBookmark(row: LinkRow): Bookmark {
  return {
    id: String(row.id),
    title: row.title ?? row.url,
    url: row.url,
    description: row.description ?? "",
    folderId: row.folder_id == null ? "" : String(row.folder_id),
  };
}

export async function loadBookmarks() {
  const { data, error } = await createClient()
    .from("links")
    .select("id, url, title, description, folder_id")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("링크 불러오기 실패:", error.message);
    return;
  }
  saved = (data as LinkRow[]).map(toBookmark);
  emit();
}

export async function addBookmark(url: string) {
  let title = url;
  try {
    title = new URL(url).hostname;
  } catch {}
  const { data, error } = await createClient()
    .from("links")
    .insert({ url, title })
    .select("id, url, title, description, folder_id")
    .single();
  if (error) {
    console.error("링크 저장 실패:", error.message);
    throw error;
  }
  saved = [toBookmark(data as LinkRow), ...saved];
  emit();
}

export function clearBookmarks() {
  saved = EMPTY;
  emit();
}
