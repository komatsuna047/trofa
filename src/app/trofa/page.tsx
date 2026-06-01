'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TrofaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.carousel-panel');
      const totalWidth = carouselRef.current ? carouselRef.current.scrollWidth - window.innerWidth : 0;

      // 勢いでスクロールしないように、タイムラインで細かく制御
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.5, // 1より少し大きくして、よりなめらかに（慣性を柔らかく）
          start: 'top top',
          // スクロール距離を1.5倍に伸ばすことで、少しゆっくりスクロールさせる
          end: () => `+=${totalWidth * 1.5}`, 
          invalidateOnRefresh: true,
        }
      });

      // 【ポイント】開始時に10%の空白時間（タメ）を作る
      tl.to({}, { duration: 0.1 })
        // 横移動のアニメーション
        .to(sections, { x: () => -totalWidth, ease: 'none', duration: 1 })
        // 終了時にも10%の空白時間（タメ）を作る
        .to({}, { duration: 0.1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'メリーゴーランド・ルーティン',
      subtitle: 'FEATURE 01',
      description: '毎日の退屈な繰り返しタスクが、美しい回転木馬に。完了するたびに馬が進み、あなたのルーティンを華やかに彩ります。',
      icon: '🎠',
      color: 'from-[#d4af37] to-[#8b6508]'
    },
    {
      title: 'ジェットコースター・進捗',
      subtitle: 'FEATURE 02',
      description: '期限が迫るプレッシャーを、スリルと興奮にチェンジ。タスクの山を駆け下りるような、ダイナミックなタイムライン表示。',
      icon: '🎢',
      color: 'from-[#ff4d6d] to-[#8b0000]'
    },
    {
      title: '観覧車・カレンダー',
      subtitle: 'FEATURE 03',
      description: '1ヶ月の予定を高い場所から見渡すように。予定が詰まっている日ほど、ゴンドラが明るくライトアップされます。',
      icon: '🎡',
      color: 'from-[#219ebc] to-[#023047]'
    },
    {
      title: 'マジック・リマインダー',
      subtitle: 'FEATURE 04',
      description: 'まるで手品のように、あなたが必要とする絶妙なタイミングで通知が届きます。もう予定を忘れることはありません。',
      icon: '🎩',
      color: 'from-[#9d4edd] to-[#3c096c]'
    }
  ];

  return (
    <main className="bg-[#050914] text-white overflow-x-hidden font-sans relative">
      
      {/* =========================================
          外装：上のテントと両端の装飾（画面に固定）
      ========================================= */}
      
      {/* 上部の天幕装飾 (fixed に変更して常に表示) */}
      <div 
        className="fixed top-0 left-0 w-full h-16 md:h-24 z-[45] shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-b-4 border-[#d4af37] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #6b0f1a 0px, #6b0f1a 40px, #e8dcc5 40px, #e8dcc5 80px)',
          borderRadius: '0 0 30% 30% / 0 0 100% 100%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent rounded-[inherit]"></div>
      </div>

      {/* --- 左側 --- */}
      <div className="fixed top-0 left-0 h-full w-16 md:w-32 z-50 pointer-events-none flex flex-col filter drop-shadow-[10px_0_15px_rgba(0,0,0,0.8)]">
        <div className="flex-grow-[6] w-full bg-gradient-to-r from-[#4a0810] via-[#d71b3b] to-[#8b0000] relative overflow-hidden" style={{ borderBottomRightRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
        <div className="h-4 md:h-8 w-[80%] bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#8b6508] rounded-full -mt-2 md:-mt-4 ml-[10%] relative z-10 shadow-[0_5px_10px_rgba(0,0,0,0.8)] border border-yellow-200/50"></div>
        <div className="flex-grow-[4] w-[85%] bg-gradient-to-r from-[#4a0810] via-[#d71b3b] to-[#8b0000] -mt-2 md:-mt-4 relative overflow-hidden" style={{ borderTopRightRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
      </div>
      <div className="fixed top-0 left-[40px] md:left-[100px] w-4 md:w-8 h-full bg-[#3a0810] z-40 border-r-[2px] md:border-r-[3px] border-[#d4af37] shadow-[10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        <div className="w-full mx-1 h-full border-x-[2px] md:border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>

      {/* --- 右側 --- */}
      <div className="fixed top-0 right-0 h-full w-16 md:w-32 z-50 pointer-events-none flex flex-col filter drop-shadow-[-10px_0_15px_rgba(0,0,0,0.8)]">
        <div className="flex-grow-[6] w-full bg-gradient-to-l from-[#4a0810] via-[#d71b3b] to-[#8b0000] relative overflow-hidden" style={{ borderBottomLeftRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
        <div className="h-4 md:h-8 w-[80%] bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#8b6508] rounded-full -mt-2 md:-mt-4 mr-[10%] ml-auto relative z-10 shadow-[0_5px_10px_rgba(0,0,0,0.8)] border border-yellow-200/50"></div>
        <div className="flex-grow-[4] w-[85%] bg-gradient-to-l from-[#4a0810] via-[#d71b3b] to-[#8b0000] -mt-2 md:-mt-4 ml-auto relative overflow-hidden" style={{ borderTopLeftRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
      </div>
      <div className="fixed top-0 right-[40px] md:right-[100px] w-4 md:w-8 h-full bg-[#3a0810] z-40 border-l-[2px] md:border-l-[3px] border-[#d4af37] shadow-[-10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        <div className="w-full mx-1 h-full border-x-[2px] md:border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>


      {/* =========================================
          コンテンツ部分
      ========================================= */}

      {/* 導入セクション */}
      <section className="h-screen flex flex-col items-center justify-center relative px-[60px] md:px-[160px] text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0508] via-[#050914] to-[#050914] -z-10"></div>
        
        <div className="text-[#d4af37] text-xl md:text-2xl mb-4 tracking-[0.3em]">★ THE ATTRACTIONS ★</div>
        <h1 className="text-5xl md:text-8xl font-black text-[#d4af37] tracking-widest font-serif drop-shadow-lg mb-8">
          trofaの魔法
        </h1>
        <p className="text-base md:text-2xl text-gray-300 font-medium tracking-widest max-w-2xl leading-relaxed">
          スケジュール管理は、もう退屈な作業ではありません。<br />
          あなたを待っている4つの特別なアトラクションをご紹介します。
        </p>
        
        <div className="absolute bottom-10 animate-bounce">
          <div className="text-[#d4af37] text-xs md:text-sm tracking-widest mb-2 font-serif">SCROLL DOWN</div>
          <div className="w-0.5 h-12 md:h-16 bg-gradient-to-b from-[#d4af37] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* 横スクロール・カルーセルセクション */}
      <section ref={containerRef} className="h-screen w-full relative">
        <div ref={carouselRef} className="h-full flex w-[400vw] md:w-[300vw]">
          
          {features.map((feature, index) => (
            <div 
              key={index} 
              // 左右の幕に隠れないようにパディングを調整
              className="carousel-panel w-screen h-full flex flex-col items-center justify-center relative px-[80px] md:px-[200px]"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px]"></div>
              </div>

              <div className={`relative z-10 w-full max-w-lg md:max-w-3xl aspect-[4/5] md:aspect-video rounded-3xl p-1 bg-gradient-to-br ${feature.color} shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform transition-transform hover:scale-105 duration-500`}>
                <div className="w-full h-full bg-[#050914]/90 backdrop-blur-md rounded-[22px] flex flex-col items-center justify-center p-6 md:p-16 text-center border border-white/10">
                  
                  <div className="text-6xl md:text-9xl mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {feature.icon}
                  </div>
                  
                  <div className="text-[#d4af37] text-sm md:text-lg tracking-[0.4em] mb-4 font-bold">
                    {feature.subtitle}
                  </div>
                  
                  <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 md:mb-8 tracking-widest font-serif">
                    {feature.title}
                  </h2>
                  
                  <p className="text-sm md:text-xl text-gray-300 leading-relaxed tracking-wider">
                    {feature.description}
                  </p>

                </div>
              </div>

              {index !== features.length - 1 && (
                <div className="absolute right-[40px] md:right-[100px] top-1/2 -translate-y-1/2 text-[#d4af37]/30 text-4xl z-20">
                  ✦
                </div>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* 最後の締めくくりセクション */}
      <section className="h-screen flex flex-col items-center justify-center bg-[#050914] text-center px-[60px] md:px-[160px]">
        <h2 className="text-3xl md:text-5xl font-bold text-[#d4af37] mb-8 tracking-widest font-serif">
          さあ、ショーを始めよう。
        </h2>
        <button className="px-12 py-5 bg-gradient-to-b from-[#d4af37] to-[#9c7811] text-[#050914] rounded-full font-bold text-lg hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] tracking-widest relative overflow-hidden group">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
          アプリをダウンロード
        </button>
      </section>

    </main>
  );
}