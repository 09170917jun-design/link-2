export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-9">
      <div className="flex w-full max-w-[420px] flex-col gap-7">{children}</div>
    </main>
  );
}
