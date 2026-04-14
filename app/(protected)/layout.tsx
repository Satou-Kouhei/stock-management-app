import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LogOutButton from './logOutButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ストック管理アプリ",
  description: "家中のストックを管理します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <header className='flex justify-around container mx-auto sticky top-0 z-10 bg-white'>
          <h1>ストック管理アプリ</h1>
          <nav>
              <ul className='flex flex-row gap-6'>
                <li><a href="/dashboard">ダッシュボード</a></li>
                <li><a href="/list">リスト</a></li>
                <LogOutButton />
              </ul>
          </nav>
        </header>
        <main className='min-h-screen'>
          {children}  
        </main>
      </body>
    </html>
  );
}
