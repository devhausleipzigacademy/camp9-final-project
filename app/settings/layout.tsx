export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen bg-yellow-light p-8">
      {children}
    </div>
  );
}
