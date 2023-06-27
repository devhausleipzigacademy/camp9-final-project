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
    //A root layout is the top-most layout in the root app directory. It is used to define the <html> and <body> tags
    //https://nextjs.org/docs/app/api-reference/file-conventions/layout
    <html lang="en">
      <body className="grid justify-center h-screen items-center">
        {children}
      </body>
    </html>
  );
}
