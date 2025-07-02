import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardSidebar />
      <div className="flex h-screen w-full flex-col gap-4 p-4">{children}</div>
    </>
  );
}
