export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-between w-full h-full bg-peach-light p-8">
      {children}
    </div>
  );
}
