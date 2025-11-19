import React from 'react';
import { Sparkles, Activity, Heart } from 'lucide-react';

const DrHelioVisual: React.FC = () => {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Outer glowing rings */}
      <div className="absolute inset-0 rounded-full border border-amber-200/30 animate-[spin_10s_linear_infinite]"></div>
      <div className="absolute inset-4 rounded-full border border-orange-200/20 animate-[spin_15s_linear_infinite_reverse]"></div>
      
      {/* Main glowing orb */}
      <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-yellow-500 shadow-[0_0_100px_rgba(245,158,11,0.4)] animate-pulse flex items-center justify-center overflow-hidden">
        {/* Inner fluid animation */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/50 to-transparent animate-[spin_8s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]"></div>
        
        {/* Core interface */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl w-48 h-48 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/30 shadow-inner">
            <Activity className="w-8 h-8 text-white animate-pulse" />
          </div>
          
          {/* Data lines */}
          <div className="w-full space-y-2">
            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white/60 rounded-full animate-[shimmer_2s_infinite]"></div>
            </div>
            <div className="h-1.5 w-3/4 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-white/60 rounded-full animate-[shimmer_2s_infinite_0.5s]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg animate-[float_4s_ease-in-out_infinite] border border-white/40">
        <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
      </div>
      <div className="absolute bottom-20 left-0 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg animate-[float_5s_ease-in-out_infinite_1s] border border-white/40">
        <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500" />
      </div>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <circle cx="50%" cy="50%" r="180" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DrHelioVisual;
