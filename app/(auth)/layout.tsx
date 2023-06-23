import React from 'react';
import '../globals.css';
import Provider from '../provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col justify-between h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}