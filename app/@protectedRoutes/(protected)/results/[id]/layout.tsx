export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container flex flex-col items-center h-screen w-screen justify-between">
        {children}
      </main>
    </>
  );
}
