export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-green-light p-8">
      {children}
    </div>
  );
}
