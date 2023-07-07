import { getServerSession } from 'next-auth';
import React from 'react';
import './globals.css';
import Provider from './provider';

// \/ metadata is embedded in page headers
export const metadata = {
  title: "d'Accord",
  description: 'Vote secretly, reveal conditionally',
};

type RootLayoutProps = {
  children: React.ReactNode;
  auth: React.ReactNode;
  protectedRoutes: React.ReactNode;
};

export default async function RootLayout({
  auth,
  protectedRoutes,
}: RootLayoutProps) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <div className="fixed w-full">
          <Provider>{session ? protectedRoutes : auth}</Provider>
        </div>
      </body>
    </html>
  );
}
