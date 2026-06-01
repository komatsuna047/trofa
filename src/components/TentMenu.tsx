'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function TentMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  
  // 初回ロード判定用フラグ
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // ▼ 初回アクセス・リロード時の「開演」アニメーション
    if (isFirstLoad.current) {
      // 0.3秒だけタメてから、左右にサッと幕を開く
      tl.delay(0.3)
        .to(leftCurtainRef.current, { x: '-100%', duration: 0.8, ease: 'power3.inOut' })
        .to(rightCurtainRef.current, { x: '100%', duration: 0.8, ease: 'power3.inOut' }, '<');
      
      isFirstLoad.current = false;
      return; // 初回処理が終わったらここでストップ
    }

    // ▼ 通常のメニュー開閉アニメーション
    if (isOpen) {
      tl.to([leftCurtainRef.current, rightCurtainRef.current], {
        x: '0%',
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(menuContentRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.2 })
      .to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.1');
    } else {
      tl.to(menuItemsRef.current, { opacity: 0, y: 20, duration: 0.2 })
        .to(menuContentRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.1 })
        .to(leftCurtainRef.current, { x: '-100%', duration: 0.6, ease: 'power3.inOut' })
        .to(rightCurtainRef.current, { x: '100%', duration: 0.6, ease: 'power3.inOut' }, '<');
    }
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    if (path === window.location.pathname) {
      setIsOpen(false);
      return;
    }

    const tl = gsap.timeline();
    tl.to(menuItemsRef.current, { opacity: 0, y: -20, duration: 0.2 })
      .call(() => {
        router.push(path);
      })
      .delay(0.3)
      .call(() => setIsOpen(false));
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'trofa', path: '/trofa' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[70] flex flex-col justify-center items-center w-14 h-14 bg-[#3a0810] rounded-full border-2 border-[#d4af37] cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.8)]"
      >
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
      </button>

      {/* 初期状態を translate-x-0（閉じた状態）に変更し、画面を覆っておく 
        重厚感を出すためにシャドウを強く設定
      */}
      <div
        ref={leftCurtainRef}
        className="fixed top-0 left-0 w-1/2 h-screen bg-[#5a0c15] z-50 transform translate-x-0 border-r-4 border-[#d4af37]/40 shadow-[20px_0_50px_rgba(0,0,0,0.8)] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(90deg, #2a0408 0%, #4a0810 70%, #6b0f1a 100%)',
        }}
      />

      <div
        ref={rightCurtainRef}
        className="fixed top-0 right-0 w-1/2 h-screen bg-[#5a0c15] z-50 transform translate-x-0 border-l-4 border-[#d4af37]/40 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(270deg, #2a0408 0%, #4a0810 70%, #6b0f1a 100%)',
        }}
      />

      <div
        ref={menuContentRef}
        className="fixed inset-0 z-60 flex flex-col justify-center items-center opacity-0 pointer-events-none"
      >
        <div className="text-[#d4af37] text-xl mb-6 tracking-[0.5em] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">★ ★ ★</div>
        
        <ul className="text-center space-y-8">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              ref={(el) => { menuItemsRef.current[index] = el; }}
              className="opacity-0 translate-y-5"
            >
              <button
                onClick={() => handleNavigation(item.path)}
                className="text-4xl md:text-5xl font-black text-[#d4af37] hover:text-white hover:scale-110 transition-all tracking-widest block w-full font-serif drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}