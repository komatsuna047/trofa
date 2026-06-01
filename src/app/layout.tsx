import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TentMenu from "@/components/TentMenu"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "trofa | スケジュールを、アトラクションに。",
  description: "スケジュールアプリtrofaの開発会社コーポレートサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-[#050914] text-white`}>
        
        {/* 🌟 全ページ共通の背景：赤色しましまのぼかし 🌟 */}
        <div className="fixed inset-0 z-[-100] pointer-events-none">
          {/* しましま模様 */}
          <div
            className="absolute inset-0 opacity-25 blur-[12px]"
            style={{
              backgroundImage: 'repeating-linear-gradient(105deg, #6b0f1a 0px, #6b0f1a 20px, #1a0205 20px, #1a0205 40px)',
              transform: 'scale(1.1)'
            }}
          ></div>
          {/* ダークグラデーションで文字を見やすくする（のっぺり防止） */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/60 via-[#050914]/80 to-[#050914]"></div>
        </div>

        <TentMenu />
        {children}
      </body>
    </html>
  );
}