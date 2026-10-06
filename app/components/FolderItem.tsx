type Props = {
  name: string;
  active?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export default function FolderItem({
  name,
  active = false,
  onEdit,
  onDelete,
}: Props) {
  const hasActions = Boolean(onEdit || onDelete);

  return (
    <div className="folder-row relative">
      <button
        type="button"
        className={`item-hover w-full rounded-xl py-2.5 pl-3 text-left text-base font-bold ${
          hasActions ? "pr-[4.75rem]" : "pr-3"
        } ${
          active
            ? "bg-[var(--hover-bg)] text-[var(--accent)]"
            : "text-[var(--text)]"
        }`}
      >
        <span className="block truncate">{name}</span>
      </button>
      {hasActions && (
        <div className="folder-actions absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-0.5">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              aria-label={`${name} 폴더 이름 수정`}
              className="folder-edit flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-sub)]"
            >
              <svg {...iconProps}>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              aria-label={`${name} 폴더 삭제`}
              className="folder-delete flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-sub)]"
            >
              <svg {...iconProps}>
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
