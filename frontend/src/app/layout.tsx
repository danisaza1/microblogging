// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import './globals.css';
import { Inter, Josefin_Sans, Montserrat } from 'next/font/google';

// Inter for global (body)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Josefin for titles
const josefin = Josefin_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-josefin' });

// Montserrat for paragraphs
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-montserrat' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${josefin.variable} ${montserrat.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
