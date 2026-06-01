'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const balloonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 風船をフワフワとランダムに浮かばせるアニメーション
    if (balloonsRef.current) {
      const balloons = balloonsRef.current.children;
      Array.from(balloons).forEach((balloon) => {
        gsap.set(balloon, {
          y: '105vh',
          x: `random(10, 90)vw`,
          scale: `random(0.6, 1.2)`,
        });

        // 無限ループで下から上へ昇らせる
        gsap.to(balloon, {
          y: '-10vh',
          duration: `random(12, 20)`,
          repeat: -1,
          ease: 'power1.inOut',
          delay: `random(0, 10)`,
        });

        // 左右に少し揺らす（リアルな風船の動き）
        gsap.to(balloon, {
          x: '+=30',
          duration: `random(2, 4)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  // ランダムな風船の色
  const balloonColors = ['bg-[#ff4d6d]', 'bg-[#ffb703]', 'bg-[#219ebc]', 'bg-[#ff70a6]', 'bg-[#70e000]'];

  return (
    <main className="min-h-screen bg-[#0a1128] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. サーカステントの天井・入り口風の豪華な飾り枠（ボーダー装飾） */}
      <div className="absolute inset-0 border-[12px] md:border-[24px] border-[#d4af37] z-40 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
        {/* テント上部のガーランド風装飾（簡易表現） */}
        <div className="absolute top-0 left-0 w-full h-6 md:h-12 bg-repeat-x" 
             style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #6b0f1a 50%, transparent 55%)', backgroundSize: '40px 100%' }}></div>
      </div>

      {/* 2. 背景の薄暗いライト効果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1f326d] via-[#0a1128] to-[#050917] -z-10"></div>

      {/* 3. フワフワ浮かぶ風船のコンテナ */}
      <div ref={balloonsRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-12 h-16 rounded-full opacity-70 ${balloonColors[i % balloonColors.length]}`}
            style={{
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' // 風船らしい形
            }}
          >
            {/* 風船の紐 */}
            <div className="absolute bottom-[-15px] left-1/2 w-0.5 h-16 bg-gray-400 opacity-40 transform -translate-x-1/2 origin-top rotate-[2deg]"></div>
            {/* 風船の結び目 */}
            <div className={`absolute bottom-[-3px] left-1/2 w-2 h-2 transform -translate-x-1/2 rotate-45 ${balloonColors[i % balloonColors.length]}`}></div>
          </div>
        ))}
      </div>

      {/* 4. メインの入り口（アーチゲート風デザインのコンテンツ囲み） */}
      <div className="text-center space-y-8 z-30 px-6 py-12 max-w-xl rounded-3xl border-4 border-dashed border-[#d4af37]/40 bg-[#0f1b35]/80 backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] m-4">
        
        {/* サーカスロゴ風の星飾り */}
        <div className="text-[#d4af37] text-2xl tracking-widest">★ ★ ★ SHOWTIME ★ ★ ★</div>

        <h1 className="text-4xl md:text-6xl font-black text-[#d4af37] tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-serif">
          THE trofa
        </h1>
        
        <p className="text-lg md:text-xl text-amber-100 font-medium tracking-wider">
          あなたの1日を、最高のアトラクションに。
        </p>
        
        <div className="pt-6">
          <button className="bg-[#6b0f1a] text-[#d4af37] border-2 border-[#d4af37] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#d4af37] hover:text-[#6b0f1a] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] tracking-widest transform active:scale-95">
            入場チケットを受け取る
          </button>
        </div>
      </div>

    </main>
  );
}