import { AdminNav } from "@/app/_components/admin/AdminNav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNav />
      <div className="container-page py-10 md:py-12">{children}</div>
    </>
  );
}
