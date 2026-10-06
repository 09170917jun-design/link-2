import Link from "next/link";

export default function AddLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white"
    >
      + 링크 추가
    </Link>
  );
}
