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

  // 無限ループ用に配列を長めに拡張
  const extendedFeatures = [...features, ...features, ...features, ...features, ...features, ...features];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let intervalId: NodeJS.Timeout;

    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        if (carousel) {
          // 子要素（カード1枚分＋余白）の幅を取得して、正確に1コマ分スクロールする
          const firstItem = carousel.children[0] as HTMLElement;
          const itemWidth = firstItem ? firstItem.offsetWidth : 300;
          carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      }, 3500); // テンポよく3.5秒に変更
    };

    startAutoPlay();

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

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft >= maxScroll - 10) {
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = maxScroll / 2;
      carousel.style.scrollBehavior = 'smooth';
    } else if (carousel.scrollLeft <= 0) {
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = maxScroll / 2;
      carousel.style.scrollBehavior = 'smooth';
    }
  };

  return (
    <main className="bg-transparent text-white overflow-x-hidden font-sans relative pb-20">
      
      {/* =========================================
          外装：上のテントと両端の装飾（画面に固定）
      ========================================= */}
      
      {/* 上部の天幕装飾 */}
      <div 
        className="fixed top-0 left-0 w-full h-16 md:h-24 z-[60] shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-b-4 border-[#d4af37] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #6b0f1a 0px, #6b0f1a 40px, #e8dcc5 40px, #e8dcc5 80px)',
          borderRadius: '0 0 30% 30% / 0 0 100% 100%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent rounded-[inherit]"></div>
      </div>

      {/* --- 左側の舞台幕とテープ --- */}
      <div className="fixed top-0 left-0 h-full w-16 md:w-32 z-[55] pointer-events-none flex flex-col filter drop-shadow-[10px_0_15px_rgba(0,0,0,0.8)]">
        <div className="flex-grow-[6] w-full bg-gradient-to-r from-[#4a0810] via-[#d71b3b] to-[#8b0000] relative overflow-hidden" style={{ borderBottomRightRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
        <div className="h-4 md:h-8 w-[80%] bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#8b6508] rounded-full -mt-2 md:-mt-4 ml-[10%] relative z-10 shadow-[0_5px_10px_rgba(0,0,0,0.8)] border border-yellow-200/50"></div>
        <div className="flex-grow-[4] w-[85%] bg-gradient-to-r from-[#4a0810] via-[#d71b3b] to-[#8b0000] -mt-2 md:-mt-4 relative overflow-hidden" style={{ borderTopRightRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
      </div>
      <div className="fixed top-0 left-[40px] md:left-[100px] w-4 md:w-8 h-full bg-[#3a0810] z-[50] border-r-[2px] md:border-r-[3px] border-[#d4af37] shadow-[10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        <div className="w-full mx-1 h-full border-x-[2px] md:border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>

      {/* --- 右側の舞台幕とテープ --- */}
      <div className="fixed top-0 right-0 h-full w-16 md:w-32 z-[55] pointer-events-none flex flex-col filter drop-shadow-[-10px_0_15px_rgba(0,0,0,0.8)]">
        <div className="flex-grow-[6] w-full bg-gradient-to-l from-[#4a0810] via-[#d71b3b] to-[#8b0000] relative overflow-hidden" style={{ borderBottomLeftRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
        <div className="h-4 md:h-8 w-[80%] bg-gradient-to-b from-[#fff7d6] via-[#d4af37] to-[#8b6508] rounded-full -mt-2 md:-mt-4 mr-[10%] ml-auto relative z-10 shadow-[0_5px_10px_rgba(0,0,0,0.8)] border border-yellow-200/50"></div>
        <div className="flex-grow-[4] w-[85%] bg-gradient-to-l from-[#4a0810] via-[#d71b3b] to-[#8b0000] -mt-2 md:-mt-4 ml-auto relative overflow-hidden" style={{ borderTopLeftRadius: '100% 150%' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.4)_15%,transparent_30%)] mix-blend-multiply"></div>
        </div>
      </div>
      <div className="fixed top-0 right-[40px] md:right-[100px] w-4 md:w-8 h-full bg-[#3a0810] z-[50] border-l-[2px] md:border-l-[3px] border-[#d4af37] shadow-[-10px_0_20px_rgba(0,0,0,0.9)] flex justify-center py-2 opacity-95">
        <div className="w-full mx-1 h-full border-x-[2px] md:border-x-[4px] border-dashed border-[#d4af37]/40"></div>
      </div>

      {/* =========================================
          コンテンツセクション
      ========================================= */}
      
      <section className="min-h-[70vh] flex flex-col items-center justify-center relative px-[80px] md:px-[180px] text-center pt-32">
        <div className="text-[#d4af37] text-xl md:text-2xl mb-4 tracking-[0.3em]">★ THE ATTRACTIONS ★</div>
        <h1 className="text-4xl md:text-7xl font-black text-[#d4af37] tracking-widest font-serif drop-shadow-lg mb-8">
          trofaの魔法
        </h1>
        <p className="text-sm md:text-xl text-gray-300 font-medium tracking-widest max-w-2xl leading-relaxed mb-10">
          スケジュール管理は、もう退屈な作業ではありません。<br />
          あなたを待っている特別なアトラクションをご覧ください。
        </p>
      </section>

      {/* フィルムテープ（自動ループ・カルーセル）セクション */}
      <section className="relative w-full flex flex-col items-center z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] my-10">
        
        {/* 上のビデオテープ */}
        <div className="w-full h-8 md:h-10 bg-black border-y-2 border-[#d4af37]/40 relative z-20 shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #050914 0px, #050914 20px, transparent 20px, transparent 40px)' }}></div>
        </div>

        {/* 横スクロール・コマコンテナ (マスクを追加して両端をフェードアウト) */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="w-full flex items-center overflow-x-auto snap-x snap-mandatory py-8 relative bg-[#0a0203] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-[20vw] md:px-[30vw]"
          style={{ 
            scrollBehavior: 'smooth',
            // 🌟 ここがポイント：CSSマスクで両端を黒から透明へグラデーションにしてフェードアウトさせる
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          {extendedFeatures.map((f, i) => (
            <div key={i} className="flex-shrink-0 snap-center flex items-center">
              
              {/* 🌟 カード本体のサイズを小さく調整 (w-[65vw] md:w-[32vw]) */}
              <div className="w-[65vw] md:w-[32vw] max-w-md bg-[#1a0508] border border-[#d4af37]/30 rounded-xl shadow-2xl flex flex-col p-4 mx-2 relative group">
                
                {/* 📸 画像プレースホルダー */}
                <div className="w-full aspect-video bg-[#050914] rounded-lg flex items-center justify-center border-2 border-dashed border-[#d4af37]/50 relative overflow-hidden cursor-pointer">
                  <div className="flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-3xl mb-2">{f.icon}</span>
                    <span className="text-[#d4af37] font-serif tracking-widest text-xs">IMAGE PLACEHOLDER</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* テキストエリア */}
                <div className="w-full text-center mt-4">
                  <div className="text-[#d4af37] text-xs tracking-[0.3em] font-bold mb-1">{f.subtitle}</div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 font-serif text-white">{f.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-2">{f.description}</p>
                </div>
              </div>

              {/* 🌟 赤いテープ（少し細く調整） */}
              {i !== extendedFeatures.length - 1 && (
                <div className="w-[3vw] md:w-[1.5vw] h-16 md:h-24 bg-gradient-to-b from-[#8b0000] via-[#d71b3b] to-[#8b0000] mx-1 md:mx-2 flex flex-col justify-evenly items-center rounded-sm shadow-[inset_0_0_8px_rgba(0,0,0,0.8)] border-x border-[#d4af37]/40 relative">
                  <div className="w-full h-[1px] bg-black/50"></div>
                  <div className="w-full h-[1px] bg-black/50"></div>
                  <div className="w-full h-[1px] bg-black/50"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 下のビデオテープ */}
        <div className="w-full h-8 md:h-10 bg-black border-y-2 border-[#d4af37]/40 relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 20px, #050914 20px, #050914 40px)' }}></div>
        </div>
        
      </section>

    </main>
  );
}