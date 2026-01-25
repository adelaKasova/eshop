import type { Metadata } from 'next';
import './globals.css';
import '@carbon/styles/css/styles.css';

export const metadata: Metadata = {
  title: 'Notebooky | E-Shop',
  description: 'Prohlédněte si nabídku notebooků - Macbook, herní, kancelářské a další',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
