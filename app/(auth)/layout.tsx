import React from 'react';
import '../globals.css';
import Provider from '../provider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="w-full flex flex-col justify-between h-screen">
      <Provider>{children}</Provider>
    </body>
  );
}
