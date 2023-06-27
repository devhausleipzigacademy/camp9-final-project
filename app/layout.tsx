import './globals.css';

export const metadata = {
  title: "d'Accord",
  description: 'Vote secretly, reveal conditionally',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid justify-center h-screen items-center">
        {children}
      </body>
    </html>
  );
}
