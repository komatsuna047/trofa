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
      // カルーセルの全幅を取得して、横スクロールの移動量を計算
      const sections = gsap.utils.toArray('.carousel-panel');
      const totalWidth = carouselRef.current ? carouselRef.current.scrollWidth - window.innerWidth : 0;

      // 縦スクロールを横スクロールに変換する魔法のアニメーション
      gsap.to(sections, {
        x: () => -totalWidth, // 左に向かって移動させる
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true, // 画面を固定（ピン留め）する
          scrub: 1, // スクロール量に合わせてなめらかに動かす
          start: 'top top',
          end: () => `+=${totalWidth}`, // 横幅と同じだけ縦にスクロールしたら終了
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // アトラクション（機能）のデータ
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
    <main className="bg-[#050914] text-white overflow-hidden font-sans">
      
      {/* 導入セクション（横スクロールに入る前の案内） */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0508] via-[#050914] to-[#050914] -z-10"></div>
        
        <div className="text-[#d4af37] text-2xl mb-4 tracking-[0.3em]">★ THE ATTRACTIONS ★</div>
        <h1 className="text-5xl md:text-8xl font-black text-[#d4af37] tracking-widest font-serif drop-shadow-lg mb-8">
          trofaの魔法
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 font-medium tracking-widest max-w-2xl leading-relaxed">
          スケジュール管理は、もう退屈な作業ではありません。<br />
          あなたを待っている4つの特別なアトラクションをご紹介します。
        </p>
        
        {/* スクロールを促す矢印 */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="text-[#d4af37] text-sm tracking-widest mb-2">SCROLL DOWN</div>
          <div className="w-0.5 h-16 bg-gradient-to-b from-[#d4af37] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* 横スクロール・カルーセルセクション */}
      <section ref={containerRef} className="h-screen w-full relative">
        <div ref={carouselRef} className="h-full flex w-[400vw] md:w-[300vw]">
          
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="carousel-panel w-screen h-full flex flex-col items-center justify-center relative p-8"
            >
              {/* 各パネルの背景装飾 */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px]"></div>
              </div>

              {/* コンテンツカード */}
              <div className={`relative z-10 w-full max-w-lg md:max-w-3xl aspect-[4/5] md:aspect-video rounded-3xl p-1 bg-gradient-to-br ${feature.color} shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform transition-transform hover:scale-105 duration-500`}>
                <div className="w-full h-full bg-[#050914]/90 backdrop-blur-md rounded-[22px] flex flex-col items-center justify-center p-8 md:p-16 text-center border border-white/10">
                  
                  <div className="text-6xl md:text-9xl mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {feature.icon}
                  </div>
                  
                  <div className="text-[#d4af37] text-sm md:text-lg tracking-[0.4em] mb-4 font-bold">
                    {feature.subtitle}
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-widest font-serif">
                    {feature.title}
                  </h2>
                  
                  <p className="text-base md:text-xl text-gray-300 leading-relaxed tracking-wider">
                    {feature.description}
                  </p>

                </div>
              </div>

              {/* パネル間の繋ぎ目の装飾（星） */}
              {index !== features.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#d4af37]/30 text-4xl translate-x-1/2 z-20">
                  ✦
                </div>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* 最後の締めくくりセクション */}
      <section className="h-[70vh] flex flex-col items-center justify-center bg-[#050914] text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-[#d4af37] mb-8 tracking-widest font-serif">
          さあ、ショーを始めよう。
        </h2>
        <button className="px-12 py-5 bg-[#d4af37] text-[#050914] rounded-full font-bold text-lg hover:bg-white transition-colors shadow-[0_0_30px_rgba(212,175,55,0.4)] tracking-widest">
          アプリをダウンロード
        </button>
      </section>

    </main>
  );
}