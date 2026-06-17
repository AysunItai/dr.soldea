export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-page flex min-h-screen items-center justify-center py-16">
      {children}
    </div>
  );
}
