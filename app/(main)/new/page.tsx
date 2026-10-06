import type { Metadata } from "next";
import NewLinkForm from "../../components/NewLinkForm";

export const metadata: Metadata = {
  title: "링크 추가",
  description: "새 링크를 저장하세요.",
  openGraph: { title: "링크 추가", description: "새 링크를 저장하세요." },
};

export default function NewLinkPage() {
  return (
    <section className="flex-1 overflow-y-auto px-5 pt-9 pb-9">
      <div className="mx-auto flex max-w-[640px] flex-col gap-7">
        <h1 className="text-[26px] leading-[1.3] font-bold text-[var(--text)]">
          링크 추가
        </h1>
        <NewLinkForm />
      </div>
    </section>
  );
}
