'use client'; // Next.jsでGSAPやuseStateを使うためのおまじない

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function TentMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const tentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // メニューが開閉されたときのアニメーション制御
  useEffect(() => {
    if (isOpen) {
      // 開く時：テントが上からバウンドしながら落ちてくる
      gsap.to(tentRef.current, { y: 0, duration: 0.8, ease: "bounce.out" });
      // メニューの文字が少し遅れてフワッと現れる
      gsap.to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
      });
    } else {
      // 閉じる時：文字が消えてからテントが上に引き上げられる
      gsap.to(menuItemsRef.current, { opacity: 0, y: 20, duration: 0.2 });
      gsap.to(tentRef.current, { y: "-100%", duration: 0.5, ease: "power2.in", delay: 0.2 });
    }
  }, [isOpen]);

  // メニューの項目データ
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'trofa', path: '/trofa' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      {/* 右上のハンバーガーボタン（メニューの最前面に配置） */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[60] flex flex-col justify-center items-center w-12 h-12 bg-[#0f1b35] rounded-full border-2 border-[#d4af37] cursor-pointer hover:scale-110 transition-transform"
      >
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
      </button>

      {/* 降りてくるテントの背景 */}
      <div
        ref={tentRef}
        // Tailwindで深い赤色(サーカス風)のストライプっぽさを表現。最初は画面外(上)に配置。
        className="fixed top-0 left-0 w-full h-screen bg-[#6b0f1a] z-50 transform -translate-y-full flex flex-col justify-center items-center shadow-2xl"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #6b0f1a, #6b0f1a 40px, #5a0c15 40px, #5a0c15 80px)'
        }}
      >
        {/* メニューの文字 */}
        <ul className="text-center space-y-8">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              ref={(el) => { menuItemsRef.current[index] = el; }} // GSAPでアニメーションさせるためにRefを登録
              className="opacity-0 translate-y-5" // 初期状態は透明で少し下にズラしておく
            >
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)} // リンクを押したらメニューを閉じる
                className="text-4xl md:text-6xl font-bold text-[#d4af37] hover:text-white transition-colors tracking-widest drop-shadow-md"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}