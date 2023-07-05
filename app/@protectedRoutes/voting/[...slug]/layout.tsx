export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen w-screen">
        <main className="page flex flex-col justify-between gap-5 h-full bg-[#9FCC95]">
          {children}
        </main>
      </div>
    </>
  );
}
