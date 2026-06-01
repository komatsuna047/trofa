'use client';

import { useEffect, useRef } from 'react';

export default function TrofaPage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: 'メリーゴーランド・ルーティン',
      subtitle: 'FEATURE 01',
      description: '毎日の退屈な繰り返しタスクが、美しい回転木馬に。完了するたびに馬が進みます。',
      icon: '🎠',
    },
    {
      title: 'ジェットコースター・進捗',
      subtitle: 'FEATURE 02',
      description: '期限が迫るプレッシャーを、スリルと興奮にチェンジ。ダイナミックなタイムライン表示。',
      icon: '🎢',
    },
    {
      title: '観覧車・カレンダー',
      subtitle: 'FEATURE 03',
      description: '1ヶ月の予定を高い場所から見渡すように。予定が詰まっている日ほど明るく光ります。',
      icon: '🎡',
    },
    {
      title: 'マジック・リマインダー',
      subtitle: 'FEATURE 04',
      description: 'まるで手品のように、絶妙なタイミングで通知が届きます。もう予定を忘れません。',
      icon: '🎩',
    }
  ];

  // 無限ループに見せるため、配列を複数回繰り返して「長いフィルム」を作る
  const extendedFeatures = [...features, ...features, ...features, ...features, ...features];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let intervalId: NodeJS.Timeout;

    // 自動スクロールの開始
    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        if (carousel) {
          // PCなら画面の50%、スマホなら85%の幅（カード1枚分）を自動で横にスクロール
          const scrollWidth = window.innerWidth > 768 ? window.innerWidth * 0.5 : window.innerWidth * 0.85;
          carousel.scrollBy({ left: scrollWidth, behavior: 'smooth' });
        }
      }, 4000); // 4秒ごとに次のコマへ
    };

    startAutoPlay();

    // マウスホバー時や、ユーザーが触っている時は自動再生を一時停止
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('touchstart', () => clearInterval(intervalId));
    carousel.addEventListener('touchend', startAutoPlay);

    return () => {
      clearInterval(intervalId);
      carousel.removeEventListener('mouseenter', () => clearInterval(intervalId));
      carousel.removeEventListener('mouseleave', startAutoPlay);
      carousel.removeEventListener('touchstart', () => clearInterval(intervalId));
      carousel.removeEventListener('touchend', startAutoPlay);
    };
  }, []);

  // 無限ループの裏技：端までスクロールしたら、アニメーションなしで中央付近にコッソリ戻す
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft >= maxScroll - 10) {
      carousel.style.scrollBehavior = 'auto'; // 一瞬だけスムーズ移動をオフ
      carousel.scrollLeft = maxScroll / 2;    // 中央に戻す
      carousel.style.scrollBehavior = 'smooth'; // スムーズ移動をオンに戻す
    } else if (carousel.scrollLeft <= 0) {
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = maxScroll / 2;
      carousel.style.scrollBehavior = 'smooth';
    }
  };

  return (
    // 背景は layout.tsx に任せるため bg-transparent に設定
    <main className="bg-transparent text-white overflow-x-hidden font-sans relative pb-20">
      
      {/* 導入セクション */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative px-6 text-center pt-32">
        <div className="text-[#d4af37] text-xl md:text-2xl mb-4 tracking-[0.3em]">★ THE ATTRACTIONS ★</div>
        <h1 className="text-5xl md:text-8xl font-black text-[#d4af37] tracking-widest font-serif drop-shadow-lg mb-8">
          trofaの魔法
        </h1>
        <p className="text-base md:text-2xl text-gray-300 font-medium tracking-widest max-w-2xl leading-relaxed mb-20">
          スケジュール管理は、もう退屈な作業ではありません。<br />
          あなたを待っている特別なアトラクションをご覧ください。
        </p>
      </section>

      {/* =========================================
          フィルムテープ（自動ループ・カルーセル）セクション
      ========================================= */}
      <section className="relative w-full flex flex-col items-center z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* 上のビデオテープ（パーフォレーション穴） */}
        <div className="w-full h-8 md:h-12 bg-black border-y-2 border-[#d4af37]/40 relative z-20 shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <div 
            className="absolute inset-0 opacity-80" 
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, #050914 0px, #050914 20px, transparent 20px, transparent 40px)' }}
          ></div>
        </div>

        {/* 横スクロール・コマコンテナ */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          // [&::-webkit-scrollbar]:hidden 等でスクロールバーを非表示にしつつスクロール可能にする
          className="w-full flex items-center overflow-x-auto snap-x snap-mandatory py-10 relative bg-[#0a0203] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: 'smooth' }}
        >
          {extendedFeatures.map((f, i) => (
            <div key={i} className="flex-shrink-0 snap-center flex items-center">
              
              {/* カード本体（フィルムの1コマ） */}
              <div className="w-[85vw] md:w-[50vw] bg-[#1a0508] border border-[#d4af37]/30 rounded-xl shadow-2xl flex flex-col p-4 md:p-6 mx-2">
                
                {/* 📸 画像を入れるプレースホルダー（枠） */}
                <div className="w-full aspect-video bg-[#050914] rounded-lg flex items-center justify-center border-2 border-dashed border-[#d4af37]/50 relative overflow-hidden group cursor-pointer">
                  {/* ここに将来 <img src="..." /> を入れます */}
                  <div className="flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-4xl mb-2">{f.icon}</span>
                    <span className="text-[#d4af37] font-serif tracking-widest text-sm">IMAGE PLACEHOLDER</span>
                  </div>
                  {/* 画像に被せる薄い光沢エフェクト */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* テキストエリア */}
                <div className="w-full text-center mt-6">
                  <div className="text-[#d4af37] text-xs md:text-sm tracking-[0.3em] font-bold mb-2">{f.subtitle}</div>
                  <h3 className="text-xl md:text-3xl font-bold mb-3 font-serif text-white">{f.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed px-2">{f.description}</p>
                </div>
              </div>

              {/* 赤いテープ（コマとコマを繋ぐ装飾） */}
              {i !== extendedFeatures.length - 1 && (
                <div className="w-[4vw] md:w-[3vw] h-20 md:h-32 bg-gradient-to-b from-[#8b0000] via-[#d71b3b] to-[#8b0000] mx-1 md:mx-3 flex flex-col justify-evenly items-center rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] border-x border-[#d4af37]/40 relative">
                  {/* テープの継ぎ目（ステッチ）表現 */}
                  <div className="w-full h-[2px] bg-black/50"></div>
                  <div className="w-full h-[2px] bg-black/50"></div>
                  <div className="w-full h-[2px] bg-black/50"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 下のビデオテープ（パーフォレーション穴） */}
        <div className="w-full h-8 md:h-12 bg-black border-y-2 border-[#d4af37]/40 relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.8)]">
          <div 
            className="absolute inset-0 opacity-80" 
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 20px, #050914 20px, #050914 40px)' }}
          ></div>
        </div>
        
      </section>

    </main>
  );
}