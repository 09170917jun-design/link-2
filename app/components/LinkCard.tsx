import type { Bookmark } from "../lib/data";

function getHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ title, url, description }: Bookmark) {
  const host = getHost(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-2 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
    >
      <span className="w-fit rounded-lg bg-[var(--hover-bg)] px-2.5 py-1 text-[13px] font-bold text-[var(--accent)]">
        {host}
      </span>
      <h3 className="link-title text-lg font-bold text-[var(--text)]">
        {title}
      </h3>
      {description && (
        <p className="line-clamp-2 text-[13px] leading-snug text-[var(--text-sub)]">
          {description}
        </p>
      )}
    </a>
  );
}
