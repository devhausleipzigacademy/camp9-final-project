export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen bg-yellow p-8">
      {children}
    </div>
  );
}
