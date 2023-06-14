export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container flex flex-col items-center justify-between min-h-screen bg-peach p-8">
      {children}
    </main>
  );
}
