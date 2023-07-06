export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <main className="page h-screen w-screen bg-blue-300">{children}</main>
      </div>
    </>
  );
}
