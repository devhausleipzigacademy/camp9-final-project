export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen bg-green-light p-8">
      {children}
    </div>
  );
}
