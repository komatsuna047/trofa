export default function Home() {
  return (
    // 背景を深いネイビー（夜の遊園地風）に設定
    <main className="min-h-screen bg-[#0a1128] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 背景のうっすらとしたスポットライト効果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a2a5e] to-[#0a1128] -z-10"></div>

      {/* メインコンテンツ */}
      <div className="text-center space-y-8 z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-[#d4af37] tracking-widest drop-shadow-2xl">
          Welcome to trofa
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 font-medium tracking-wider">
          あなたの1日を、最高のアトラクションに。
        </p>
        
        <div className="pt-10">
          <button className="bg-[#d4af37] text-[#0a1128] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            ショーを開演する (アプリDL)
          </button>
        </div>
      </div>

    </main>
  );
}