import { createClient } from "../../utils/supabase/client";
import type { Folder } from "./data";

// Client-side cache of the signed-in user's rows in the Supabase `folders` table.
const EMPTY: Folder[] = [];
const listeners = new Set<() => void>();

let folders: Folder[] = EMPTY;

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): Folder[] {
  return folders;
}

export function getServerSnapshot(): Folder[] {
  return EMPTY;
}

type FolderRow = { id: number; name: string };

function toFolder(row: FolderRow): Folder {
  return { id: String(row.id), name: row.name };
}

export async function loadFolders() {
  const { data, error } = await createClient()
    .from("folders")
    .select("id, name")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("폴더 불러오기 실패:", error.message);
    return;
  }
  folders = (data as FolderRow[]).map(toFolder);
  emit();
}

export async function addFolder(name: string) {
  const { data, error } = await createClient()
    .from("folders")
    .insert({ name })
    .select("id, name")
    .single();
  if (error) {
    console.error("폴더 추가 실패:", error.message);
    return;
  }
  folders = [...folders, toFolder(data as FolderRow)];
  emit();
}

export async function renameFolder(id: string, name: string) {
  const { error } = await createClient()
    .from("folders")
    .update({ name })
    .eq("id", Number(id));
  if (error) {
    console.error("폴더 이름 변경 실패:", error.message);
    return;
  }
  folders = folders.map((f) => (f.id === id ? { ...f, name } : f));
  emit();
}

export async function deleteFolder(id: string) {
  const { error } = await createClient()
    .from("folders")
    .delete()
    .eq("id", Number(id));
  if (error) {
    console.error("폴더 삭제 실패:", error.message);
    return;
  }
  folders = folders.filter((f) => f.id !== id);
  emit();
}

export function clearFolders() {
  folders = EMPTY;
  emit();
}
