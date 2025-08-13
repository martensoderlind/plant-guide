import AdminNavbar from "@/features/admin-dashboard/components/admin-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <AdminNavbar />
      {children}
    </div>
  );
}
