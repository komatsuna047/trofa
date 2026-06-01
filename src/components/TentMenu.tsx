'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function TentMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 左右の幕のRef
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // メニューの開閉アニメーション
  useEffect(() => {
    const tl = gsap.timeline();

    if (isOpen) {
      // 開く時：左右の幕が中央に向かってなめらかに閉じる
      tl.to([leftCurtainRef.current, rightCurtainRef.current], {
        x: '0%',
        duration: 0.6,
        ease: 'power3.out',
      })
      // メニュー項目が中央にふわっと浮き上がる
      .to(menuContentRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.2 })
      .to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.1');
    } else {
      // 閉じる時（メニューを終わらせる時）：文字を消して、幕を左右の画面外へ退避
      tl.to(menuItemsRef.current, { opacity: 0, y: 20, duration: 0.2 })
        .to(menuContentRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.1 })
        .to(leftCurtainRef.current, { x: '-100%', duration: 0.6, ease: 'power3.inOut' })
        .to(rightCurtainRef.current, { x: '100%', duration: 0.6, ease: 'power3.inOut' }, '<');
    }
  }, [isOpen]);

  // ページ遷移（ステージ移動）の処理
  const handleNavigation = (path: string) => {
    if (path === window.location.pathname) {
      setIsOpen(false);
      return;
    }

    const tl = gsap.timeline();
    // 1. まず文字を消す
    tl.to(menuItemsRef.current, { opacity: 0, y: -20, duration: 0.2 })
      // 2. 幕はすでに中央に閉じているので、そのまま裏でNext.jsのページ遷移を実行
      .call(() => {
        router.push(path);
      })
      // 3. ほんの少しページ読み込みの猶予を置いてから、幕を左右にパッと開く（開演！）
      .delay(0.3)
      .call(() => setIsOpen(false)); // Stateを閉じるにすることで上記の「閉じる側」のアニメーションが走り幕が開く
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'trofa', path: '/trofa' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      {/* 右上のハンバーガーボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[70] flex flex-col justify-center items-center w-14 h-14 bg-[#6b0f1a] rounded-full border-2 border-[#d4af37] cursor-pointer hover:scale-105 transition-transform shadow-lg"
      >
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`block w-6 h-0.5 bg-[#d4af37] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
      </button>

      {/* 左側の舞台幕 */}
      <div
        ref={leftCurtainRef}
        className="fixed top-0 left-0 w-1/2 h-screen bg-[#5a0c15] z-50 transform -translate-x-full border-r border-[#d4af37]/20 shadow-2xl pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(90deg, #4a0810 0%, #5a0c15 80%, #6b0f1a 100%)',
        }}
      />

      {/* 右側の舞台幕 */}
      <div
        ref={rightCurtainRef}
        className="fixed top-0 right-0 w-1/2 h-screen bg-[#5a0c15] z-50 transform translate-x-full border-l border-[#d4af37]/20 shadow-2xl pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(270deg, #4a0810 0%, #5a0c15 80%, #6b0f1a 100%)',
        }}
      />

      {/* 中央のメニュー文字コンテナ */}
      <div
        ref={menuContentRef}
        className="fixed inset-0 z-60 flex flex-col justify-center items-center opacity-0 pointer-events-none"
      >
        {/* テントの中の高級感を出すゴールドの飾り星 */}
        <div className="text-[#d4af37] text-xl mb-6 tracking-[0.5em]">★ ★ ★</div>
        
        <ul className="text-center space-y-8">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              ref={(el) => { menuItemsRef.current[index] = el; }}
              className="opacity-0 translate-y-5"
            >
              <button
                onClick={() => handleNavigation(item.path)}
                className="text-4xl md:text-5xl font-black text-[#d4af37] hover:text-white hover:scale-110 transition-all tracking-widest block w-full font-serif"
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