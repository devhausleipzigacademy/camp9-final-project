import React from 'react';
import '../globals.css';
import Provider from '../provider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
