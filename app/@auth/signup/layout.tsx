export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <main className="page flex flex-col h-screen w-screen bg-green-light">
          {children}
        </main>
      </div>
    </>
  );
}
