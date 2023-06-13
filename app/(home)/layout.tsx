export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-between w-full h-full bg-peach p-8">
      {children}
    </div>
  );
}
