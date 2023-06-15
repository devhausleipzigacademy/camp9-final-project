import { Navbar } from 'components/shared/navbar/Navbar';
import './globals.css';
import Provider from './provider';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}
) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
        <footer>
          <Navbar variant={'primary'} />
        </footer>
      </body>
    </html>
  );
}
