export default function NewPollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen bg-teal p-8">
      {children}
    </div>
  );
}
