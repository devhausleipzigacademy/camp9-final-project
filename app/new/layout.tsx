export default function NewPollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-teal p-8">
      {children}
    </div>
  );
}
