'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const balloonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (balloonsRef.current) {
      const balloons = balloonsRef.current.children;
      Array.from(balloons).forEach((balloon) => {
        gsap.set(balloon, {
          y: '100vh',
          x: `random(5, 95)vw`,
          scale: `random(0.4, 0.8)`,
        });

        gsap.to(balloon, {
          y: '-10vh',
          duration: `random(15, 25)`,
          repeat: -1,
          ease: 'none',
          delay: `random(0, 10)`,
        });

        gsap.to(balloon, {
          x: '+=40',
          duration: `random(3, 5)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  const balloonColors = ['bg-[#d4af37]', 'bg-[#8b0000]', 'bg-[#1a2a5e]', 'bg-[#ffb703]'];

  return (
    <main className="min-h-screen bg-[#050914] text-white font-sans relative">
      
      {/* =========================================
          共通装飾：両端のビデオフィルム（チケット）風の縁
      ========================================= */}
      {/* 左側の縁 */}
      <div className="fixed top-0 left-0 w-6 md:w-8 h-full bg-[#3a0810] z-40 border-r-[3px] border-[#d4af37] shadow-[10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        {/* フィルムの穴（パーフォレーション）を表現した点線 */}
        <div className="w-full mx-1 h-full border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>

      {/* 右側の縁 */}
      <div className="fixed top-0 right-0 w-6 md:w-8 h-full bg-[#3a0810] z-40 border-l-[3px] border-[#d4af37] shadow-[-10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        <div className="w-full mx-1 h-full border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>

      {/* =========================================
          1. ヒーローセクション（トップ画面）
      ========================================= */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* 上部の装飾：サーカステントの天幕（復刻） */}
        <div 
          className="absolute top-0 left-0 w-full h-16 md:h-24 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-b-4 border-[#d4af37]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #6b0f1a 0px, #6b0f1a 40px, #e8dcc5 40px, #e8dcc5 80px)',
            borderRadius: '0 0 30% 30% / 0 0 100% 100%'
          }}
        >
          {/* テント内部の暗がり（立体感） */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent rounded-[inherit]"></div>
        </div>

        {/* 背景：ぼかした巨大なサーカステントと夜空のグラデーション */}
        <div className="absolute inset-0 z-0 px-8"> {/* 左右の縁に被らないよう余白を確保 */}
          <div 
            className="absolute inset-0 opacity-30 blur-[8px]"
            style={{
              backgroundImage: 'repeating-linear-gradient(105deg, #4a0810 0%, #4a0810 5%, #1a0205 5%, #1a0205 10%)',
              transform: 'scale(1.1)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/40 via-[#050914]/70 to-[#050914]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 to-transparent rounded-[100%] blur-3xl mix-blend-screen"></div>
        </div>

        {/* 風船 */}
        <div ref={balloonsRef} className="absolute inset-0 pointer-events-none z-10 opacity-50 px-8">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-10 h-14 rounded-full ${balloonColors[i % balloonColors.length]} shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.5)]`}
              style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }}
            >
              <div className="absolute top-2 left-2 w-2 h-4 bg-white/20 rounded-full transform rotate-12"></div>
              <div className="absolute bottom-[-10px] left-1/2 w-0.5 h-12 bg-white/20 transform -translate-x-1/2"></div>
            </div>
          ))}
        </div>

        {/* メインテキスト */}
        <div className="relative z-20 flex flex-col items-center text-center px-8 mt-10">
          <div className="text-[#d4af37] text-lg md:text-xl tracking-[0.4em] font-serif mb-6 flex items-center gap-4 opacity-90">
            <span className="text-2xl text-[#d4af37]/70">✦</span> 
            THE MAGIC OF TIME 
            <span className="text-2xl text-[#d4af37]/70">✦</span>
          </div>

          <h1 className="text-7xl md:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#aa7c11] tracking-widest drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] font-serif py-2 mb-4 leading-none">
            trofa
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-200 font-medium tracking-[0.2em] mt-4 mb-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
            あなたの1日を、<br className="md:hidden" />最高のアトラクションに。
          </p>
          
          <a href="#about" className="group relative px-12 py-5 bg-gradient-to-b from-[#d4af37] to-[#9c7811] text-[#050914] rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:-translate-y-1 tracking-widest overflow-hidden inline-block">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            入場する
          </a>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-[#d4af37] text-xs tracking-widest mb-2 font-serif">SCROLL</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
        </div>
      </section>

      {/* =========================================
          2. ABOUTセクション
      ========================================= */}
      <section id="about" className="relative w-full py-32 px-12 flex flex-col items-center bg-[#050914] z-10">
        <div className="max-w-4xl w-full text-center">
          
          <div className="text-[#d4af37] text-4xl mb-6">🎪</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-12 tracking-widest font-serif drop-shadow-md">
            ABOUT
          </h2>
          
          <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-light tracking-wider text-justify md:text-center">
            <p>
              私たちは、スケジュールアプリ「<strong className="text-[#d4af37] font-bold">trofa</strong>」を開発・運営しています。
            </p>
            <p>
              仕事、勉強、プライベート。<br />
              日々の予定をこなすことは、時に退屈で、単調な作業になりがちです。
            </p>
            <p>
              もしも、毎日のタスクが遊園地のアトラクションだったら？<br />
              もしも、カレンダーを開くたびにサーカスの幕が上がるようなワクワクを感じられたら？
            </p>
            <p>
              「trofa」は、ただ時間を管理するだけのツールではありません。<br />
              あなたの日常をエンターテインメントに変え、<br />
              毎日のパフォーマンスを最大化するための魔法のチケットです。
            </p>
          </div>
          
        </div>
      </section>

    </main>
  );
}