export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen bg-peach p-8">
      {children}
    </div>
  );
}
