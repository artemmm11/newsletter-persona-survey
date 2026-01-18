import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Discover Your Work Persona | Newsletter Survey',
  description: 'Take our 7-step survey to discover your unique work persona and get personalized insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {children}
      </body>
    </html>
  );
}
