import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
