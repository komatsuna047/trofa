'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const balloonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
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

      gsap.from('.about-animate', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%', 
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleEnterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(window, { duration: 1.2, scrollTo: '#about', ease: 'power3.inOut' });
  };

  const balloonColors = ['bg-[#d4af37]', 'bg-[#8b0000]', 'bg-[#1a2a5e]', 'bg-[#ffb703]'];

  return (
    <main ref={mainRef} className="min-h-screen bg-[#050914] text-white font-sans relative overflow-x-hidden">
      
      {/* =========================================
          外装：赤い舞台幕（手前 z-50）とビデオテープ（奥 z-40）
      ========================================= */}
      
      {/* --- 左側 --- */}
      {/* 1. 左の赤い舞台幕（ドレープ） */}
      <div className="fixed top-0 left-0 h-full w-16 md:w-32 z-50 pointer-events-none flex flex-col filter drop-shadow-[10px_0_15px_rgba(0,0,0,0.8)]">
        {/* 幕の上部 */}
        <div 
          className="flex-grow-[6] w-full bg-gradient-to-r from-[#4a0810] via-[#d71b3b] to-[#8b0000] relative overflow-hidden"
          style={{ borderBottomRightRadius: '100% 150%' }}
        >
          {/* 布のシワ（陰影） */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
        {/* 結び目（ゴールドのタッセル） */}
        <div className="h-4 md:h-8 w-[80%] bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#8b6508] rounded-full -mt-2 md:-mt-4 ml-[10%] relative z-10 shadow-[0_5px_10px_rgba(0,0,0,0.8)] border border-yellow-200/50"></div>
        {/* 幕の下部 */}
        <div 
          className="flex-grow-[4] w-[85%] bg-gradient-to-r from-[#4a0810] via-[#d71b3b] to-[#8b0000] -mt-2 md:-mt-4 relative overflow-hidden"
          style={{ borderTopRightRadius: '100% 150%' }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
      </div>

      {/* 2. 左のビデオテープ（幕の内側に少し隠れるように配置） */}
      <div className="fixed top-0 left-[40px] md:left-[100px] w-4 md:w-8 h-full bg-[#3a0810] z-40 border-r-[2px] md:border-r-[3px] border-[#d4af37] shadow-[10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        <div className="w-full mx-1 h-full border-x-[2px] md:border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>


      {/* --- 右側 --- */}
      {/* 1. 右の赤い舞台幕（ドレープ） */}
      <div className="fixed top-0 right-0 h-full w-16 md:w-32 z-50 pointer-events-none flex flex-col filter drop-shadow-[-10px_0_15px_rgba(0,0,0,0.8)]">
        <div 
          className="flex-grow-[6] w-full bg-gradient-to-l from-[#4a0810] via-[#d71b3b] to-[#8b0000] relative overflow-hidden"
          style={{ borderBottomLeftRadius: '100% 150%' }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
        <div className="h-4 md:h-8 w-[80%] bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#8b6508] rounded-full -mt-2 md:-mt-4 mr-[10%] ml-auto relative z-10 shadow-[0_5px_10px_rgba(0,0,0,0.8)] border border-yellow-200/50"></div>
        <div 
          className="flex-grow-[4] w-[85%] bg-gradient-to-l from-[#4a0810] via-[#d71b3b] to-[#8b0000] -mt-2 md:-mt-4 ml-auto relative overflow-hidden"
          style={{ borderTopLeftRadius: '100% 150%' }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
      </div>

      {/* 2. 右のビデオテープ */}
      <div className="fixed top-0 right-[40px] md:right-[100px] w-4 md:w-8 h-full bg-[#3a0810] z-40 border-l-[2px] md:border-l-[3px] border-[#d4af37] shadow-[-10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        <div className="w-full mx-1 h-full border-x-[2px] md:border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>


      {/* =========================================
          コンテンツセクション
      ========================================= */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* 上部の天幕装飾 (z-30) 舞台幕の後ろを通り抜けるように */}
        <div 
          className="absolute top-0 left-0 w-full h-16 md:h-24 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-b-4 border-[#d4af37]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #6b0f1a 0px, #6b0f1a 40px, #e8dcc5 40px, #e8dcc5 80px)',
            borderRadius: '0 0 30% 30% / 0 0 100% 100%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent rounded-[inherit]"></div>
        </div>

        {/* 背景 */}
        <div className="absolute inset-0 z-0">
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
        <div ref={balloonsRef} className="absolute inset-0 pointer-events-none z-10 opacity-50">
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

        {/* メインテキスト（左右の幕を避けるため padding を大きく確保） */}
        <div className="relative z-20 flex flex-col items-center text-center px-[60px] md:px-[160px] mt-10 w-full">
          <div className="text-[#d4af37] text-sm md:text-xl tracking-[0.4em] font-serif mb-6 flex items-center gap-2 md:gap-4 opacity-90">
            <span className="text-xl md:text-2xl text-[#d4af37]/70">✦</span> 
            THE MAGIC OF TIME 
            <span className="text-xl md:text-2xl text-[#d4af37]/70">✦</span>
          </div>

          <h1 className="text-6xl md:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#aa7c11] tracking-widest drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] font-serif py-2 mb-4 leading-none">
            trofa
          </h1>
          
          <p className="text-sm md:text-3xl text-gray-200 font-medium tracking-[0.2em] mt-4 mb-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
            あなたの1日を、<br className="md:hidden" />最高のアトラクションに。
          </p>
          
          <button 
            onClick={handleEnterClick} 
            className="group relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-b from-[#d4af37] to-[#9c7811] text-[#050914] rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:-translate-y-1 tracking-widest overflow-hidden inline-block cursor-pointer"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            入場する
          </button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-[#d4af37] text-xs tracking-widest mb-2 font-serif">SCROLL</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
        </div>
      </section>

      {/* 2. ABOUTセクション */}
      <section id="about" className="relative w-full py-40 px-[60px] md:px-[160px] flex flex-col items-center bg-[#050914] z-10">
        <div className="max-w-4xl w-full text-center">
          
          <div className="about-animate text-[#d4af37] text-4xl mb-6">🎪</div>
          <h2 className="about-animate text-3xl md:text-5xl font-bold text-[#d4af37] mb-12 tracking-widest font-serif drop-shadow-md">
            ABOUT
          </h2>
          
          <div className="space-y-8 text-base md:text-xl text-gray-300 leading-relaxed font-light tracking-wider text-justify md:text-center">
            <p className="about-animate">
              私たちは、スケジュールアプリ「<strong className="text-[#d4af37] font-bold">trofa</strong>」を開発・運営しています。
            </p>
            <p className="about-animate">
              仕事、勉強、プライベート。<br />
              日々の予定をこなすことは、時に退屈で、単調な作業になりがちです。
            </p>
            <p className="about-animate">
              もしも、毎日のタスクが遊園地のアトラクションだったら？<br />
              もしも、カレンダーを開くたびにサーカスの幕が上がるようなワクワクを感じられたら？
            </p>
            <p className="about-animate">
              「trofa」は、ただ時間を管理するだけのツールではありません。<br />
              あなたの日常をエンターテインメントに変え、<br />
              毎日のパフォーマンスを最大化するための魔法のチケットです!
            </p>
          </div>
          
        </div>
      </section>

    </main>
  );
}