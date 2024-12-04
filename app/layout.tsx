'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from './context/auth-context/provider'


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
