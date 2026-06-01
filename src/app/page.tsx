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
          y: '105vh',
          x: `random(5, 95)vw`,
          scale: `random(0.5, 1)`,
        });

        gsap.to(balloon, {
          y: '-20vh',
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

  // ゴールドや深紅など、豪華なカラーリングに変更
  const balloonColors = ['bg-[#d4af37]', 'bg-[#8b0000]', 'bg-[#1a2a5e]', 'bg-[#ffb703]'];

  return (
    <main className="min-h-screen bg-[#050914] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. 背景：テント内部の奥行きを感じさせる深い放射状グラデーションと床の光 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1f0508] via-[#050914] to-[#000000] -z-20"></div>
      {/* ステージの床に当たるスポットライト */}
      <div className="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-[150%] h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 to-transparent -z-10 rounded-[100%] blur-3xl"></div>

      {/* 2. テントの天幕（しましまのドレープ） - 立体的な影を多用 */}
      <div 
        className="absolute top-0 left-0 w-full h-16 md:h-24 z-40 shadow-[0_20px_30px_rgba(0,0,0,0.8)] border-b-4 border-[#d4af37]"
        style={{
          // 赤とくすんだ白（ゴールド寄り）のクラシックなサーカスストライプ
          backgroundImage: 'repeating-linear-gradient(90deg, #6b0f1a 0px, #6b0f1a 40px, #e8dcc5 40px, #e8dcc5 80px)',
          borderRadius: '0 0 30% 30% / 0 0 100% 100%' // なだらかなカーブ
        }}
      >
        {/* 天幕の内側の影（立体感） */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent rounded-[inherit]"></div>
      </div>

      {/* 3. 風船のアニメーション */}
      <div ref={balloonsRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-60">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-10 h-14 rounded-full ${balloonColors[i % balloonColors.length]} shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.3),_0_10px_15px_rgba(0,0,0,0.5)]`}
            style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }}
          >
            {/* 風船のハイライト（光沢） */}
            <div className="absolute top-2 left-2 w-2 h-4 bg-white/30 rounded-full transform rotate-12"></div>
            <div className="absolute bottom-[-10px] left-1/2 w-0.5 h-12 bg-white/20 transform -translate-x-1/2"></div>
          </div>
        ))}
      </div>

      {/* 4. メインコンテンツ：立体的で豪華な看板（マーキー） */}
      <div className="relative z-30 px-8 py-14 max-w-2xl w-[90%] rounded-2xl bg-gradient-to-b from-[#1a0508] to-[#0a0203] border-[6px] border-[#d4af37] shadow-[0_30px_60px_rgba(0,0,0,0.9),_inset_0_0_30px_rgba(212,175,55,0.1)] mt-12 flex flex-col items-center">
        
        {/* 看板を吊るすチェーン風の装飾 */}
        <div className="absolute top-[-50px] left-8 w-2 h-[50px] bg-gradient-to-b from-[#8b6508] to-[#d4af37] shadow-[2px_0_5px_rgba(0,0,0,0.5)]"></div>
        <div className="absolute top-[-50px] right-8 w-2 h-[50px] bg-gradient-to-b from-[#8b6508] to-[#d4af37] shadow-[2px_0_5px_rgba(0,0,0,0.5)]"></div>

        {/* 電飾風のドット（看板の縁） */}
        <div className="absolute inset-2 border-2 border-dashed border-[#d4af37]/30 rounded-xl"></div>

        <div className="text-[#d4af37] text-xl md:text-2xl tracking-[0.3em] font-serif mb-4 flex items-center gap-4">
          <span className="text-3xl">✦</span> THE MAGIC OF TIME <span className="text-3xl">✦</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#8b6508] tracking-widest drop-shadow-[0_5px_5px_rgba(0,0,0,1)] font-serif py-2">
          trofa
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-300 font-medium tracking-wider mt-6 mb-10 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          あなたの1日を、最高のアトラクションに。
        </p>
        
        <button className="group relative px-10 py-4 bg-gradient-to-b from-[#8b0000] to-[#4a0000] text-[#fff7d6] border-2 border-[#d4af37] rounded-full font-bold text-lg md:text-xl transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.8),_inset_0_2px_5px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4),_inset_0_2px_5px_rgba(255,255,255,0.3)] hover:-translate-y-1 transform active:translate-y-1 tracking-widest overflow-hidden">
          {/* ボタンの光沢エフェクト */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
          チケットを手に入れる
        </button>
      </div>

    </main>
  );
}