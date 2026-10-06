"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  deleteFolder,
  getServerSnapshot,
  getSnapshot,
  loadFolders,
  renameFolder,
  subscribe,
} from "../lib/folderStore";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import FolderItem from "./FolderItem";
import RenameFolderModal from "./RenameFolderModal";
import SidebarAuthButtons from "./SidebarAuthButtons";

export default function Sidebar() {
  const folders = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    loadFolders();
  }, []);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const pending = folders.find((f) => f.id === pendingId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = folders.find((f) => f.id === editingId);

  return (
    <aside className="hidden w-60 shrink-0 flex-col overflow-y-auto bg-[var(--surface)] p-4 shadow-[1px_0_0_rgba(0,0,0,0.06)] md:flex">
      <nav className="flex flex-col gap-1">
        <FolderItem name="All" active />
        <p className="mt-6 mb-2 px-3 text-[13px] font-bold text-[var(--text-sub)]">
          폴더
        </p>
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            name={folder.name}
            onEdit={() => setEditingId(folder.id)}
            onDelete={() => setPendingId(folder.id)}
          />
        ))}
      </nav>
      <SidebarAuthButtons />

      {editing && (
        <RenameFolderModal
          currentName={editing.name}
          onCancel={() => setEditingId(null)}
          onSave={(name) => {
            renameFolder(editing.id, name);
            setEditingId(null);
          }}
        />
      )}

      {pending && (
        <ConfirmDeleteModal
          folderName={pending.name}
          onCancel={() => setPendingId(null)}
          onConfirm={() => {
            deleteFolder(pending.id);
            setPendingId(null);
          }}
        />
      )}
    </aside>
  );
}
