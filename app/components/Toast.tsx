export default function Toast({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="fixed top-6 left-1/2 z-50 max-w-[calc(100vw-40px)] -translate-x-1/2 rounded-xl bg-[var(--error)] px-5 py-3 text-center text-base font-bold text-white shadow-[var(--shadow-hover)]"
    >
      {message}
    </div>
  );
}
