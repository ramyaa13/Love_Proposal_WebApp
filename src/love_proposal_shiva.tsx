import React, { useState, useEffect } from 'react';
import { Heart, Music, Sparkles } from 'lucide-react';

export default function LoveProposal() {
  const [section, setSection] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; rotation: number }[]>([]);


  useEffect(() => {
    const heartInterval = setInterval(() => {
      if (section > 0) {
        setHearts(prev => [...prev, {
          id: Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2
        }].slice(-15));
      }
    }, 800);

    return () => clearInterval(heartInterval);
  }, [section]);

  useEffect(() => {
    if (section === 1) {
      const petalInterval = setInterval(() => {
        setPetals(prev => [...prev, {
          id: Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 3,
          rotation: Math.random() * 360
        }].slice(-20));
      }, 400);

      return () => clearInterval(petalInterval);
    }
  }, [section]);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  const sections = [
    {
      title: "For My Beloved Shivu",
      content: "Click to begin our love story...",
      bgGradient: "from-pink-300 via-rose-300 to-red-300"
    },
    {
      title: "A Garden of Our Memories",
      content: "Every moment with you is a beautiful flower in the garden of my heart",
      bgGradient: "from-rose-200 via-pink-300 to-red-200"
    },
    {
      title: "My Heart Speaks",
      content: "Open the letter to read what my heart wants to say...",
      bgGradient: "from-pink-200 via-rose-300 to-pink-300"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${sections[section].bgGradient} relative overflow-hidden transition-all duration-1000`}>
      {/* Floating Hearts */}
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          className="absolute text-red-400 opacity-60 pointer-events-none animate-float"
          style={{
            left: `${heart.left}%`,
            top: '-5%',
            animationDelay: `${heart.delay}s`,
            animationDuration: '6s'
          }}
          size={24}
        />
      ))}

      {/* Floating Rose Petals */}
      {section === 1 && petals.map(petal => (
        <div
          key={petal.id}
          className="absolute w-3 h-4 bg-rose-400 rounded-full opacity-70 pointer-events-none animate-fall"
          style={{
            left: `${petal.left}%`,
            top: '-5%',
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
            animationDuration: '8s'
          }}
        />
      ))}

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/30 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-110"
      >
        {musicPlaying ? (
          <Music className="text-rose-600" size={24} />
        ) : (
          <div className="relative">
            <Music className="text-rose-600" size={24} />
            <div className="absolute inset-0 border-2 border-rose-600 rotate-45 rounded-full"></div>
          </div>
        )}
      </button>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        {section === 0 && (
          <div className="text-center animate-fadeIn">
            <Sparkles className="mx-auto text-rose-500 mb-6 animate-pulse" size={48} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-rose-700 mb-6 drop-shadow-lg">
              {sections[0].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-rose-600 mb-12 font-medium">
              {sections[0].content}
            </p>
            <button
              onClick={() => setSection(1)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce"
            >
              Begin Our Journey ❤️
            </button>
          </div>
        )}

        {section === 1 && (
          <div className="text-center max-w-4xl mx-auto animate-fadeIn">
            <div className="mb-8 relative">
              <div className="text-6xl sm:text-7xl md:text-8xl animate-pulse">🌹</div>
              <Heart className="absolute top-0 left-1/4 text-red-400 animate-ping" size={32} />
              <Heart className="absolute top-0 right-1/4 text-pink-400 animate-ping" size={32} style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-700 mb-6 drop-shadow-lg">
              {sections[1].title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-rose-600 mb-8 leading-relaxed px-4">
              {sections[1].content}
            </p>
            <div className="flex justify-center gap-4 text-4xl sm:text-5xl md:text-6xl mb-12 animate-bounce">
              💕 💖 💝
            </div>
            <button
              onClick={() => setSection(2)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              Continue to My Letter 💌
            </button>
          </div>
        )}

        {section === 2 && !letterOpen && (
          <div className="text-center max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-700 mb-8 drop-shadow-lg">
              {sections[2].title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-rose-600 mb-12 px-4">
              {sections[2].content}
            </p>
            <div
              onClick={() => setLetterOpen(true)}
              className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg shadow-2xl border-4 border-rose-300 flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <div className="text-6xl mb-4">💌</div>
                  <p className="text-rose-600 font-semibold text-lg">Click to Open</p>
                </div>
              </div>
              <Heart className="absolute -top-4 -right-4 text-red-500 animate-bounce" size={40} />
              <Heart className="absolute -bottom-4 -left-4 text-pink-500 animate-bounce" size={40} style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}

        {section === 2 && letterOpen && (
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 border-rose-200 animate-fadeIn">
            <div className="text-center mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold text-rose-700 mb-4">My Dearest Shiva,</h3>
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="text-red-500 fill-red-500 animate-pulse" size={20} style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            
            <div className="text-rose-800 space-y-6 text-base sm:text-lg leading-relaxed">
              <p className="indent-8">
                Every day with you feels like a dream I never want to wake up from. Your smile lights up my world like the first rays of sunshine after a storm. Your laughter is the melody that makes my heart dance with joy.
              </p>
              
              <p className="indent-8">
                In your arms, I've found my home. In your eyes, I see my future. In your heart, I've discovered a love so pure and beautiful that words fail to capture its essence.
              </p>
              
              <p className="indent-8">
                You are not just my husband; you are my best friend, my partner in every adventure, my comfort in every storm, and my greatest blessing. Thank you for being the incredible person you are.
              </p>
              
              <p className="indent-8">
                I promise to love you more with each passing day, to stand by your side through every joy and challenge, to cherish every moment we share, and to build a beautiful life together filled with laughter, love, and countless memories.
              </p>
              
              <div className="text-center mt-12 pt-8 border-t-2 border-rose-200">
                <p className="text-2xl font-bold text-rose-600 mb-4">
                  Forever and Always Yours,
                </p>
                <div className="text-5xl mb-4">💕</div>
                <p className="text-rose-700 italic">Your Loving Wife</p>
                <p className="text-rose-700 italic">Ramya Shivashankar💕</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setSection(0);
                  setLetterOpen(false);
                }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Read Again ❤️
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fall {
          animation: fall 8s linear infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}