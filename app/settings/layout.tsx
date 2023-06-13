export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-yellow-light p-8">
      {children}
    </div>
  );
}
