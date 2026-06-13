import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Capacitor Insight | Build Diagnostics',
  description: 'AI-driven build health and project scrutinizer for Capacitor applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 selection:text-primary">
        <div className="scan-line" />
        {children}
      </body>
    </html>
  );
}