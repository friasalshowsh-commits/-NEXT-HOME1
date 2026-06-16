import React from 'react';

interface SaudiCoverageMapProps {
  lang: 'ar' | 'en';
  mapAriaLabel: string;
  mapCaption: string;
}

export const SaudiCoverageMap: React.FC<SaudiCoverageMapProps> = ({
  lang,
  mapAriaLabel,
  mapCaption
}) => {
  // Coordinates based on viewBox="0 0 620 500"
  const locations = [
    {
      id: 'riyadh',
      x: 360,
      y: 250,
      type: 'headquarters',
      nameAr: 'الرياض',
      nameEn: 'Riyadh',
      tagAr: 'المقر الرئيسي',
      tagEn: 'HQ',
      subAr: 'المركز الرئيسي والتنفيذي',
      subEn: 'Executive HQ',
      labelOffset: { x: 0, y: -45 }
    },
    {
      id: 'jeddah',
      x: 180,
      y: 330,
      type: 'market',
      nameAr: 'جدة',
      nameEn: 'Jeddah',
      tagAr: 'تغطية تجارية',
      tagEn: 'Market Access',
      subAr: 'بوابة المنطقة الغربية',
      subEn: 'Western Region Gateway',
      labelOffset: { x: -30, y: 45 }
    },
    {
      id: 'dammam',
      x: 520,
      y: 220,
      type: 'market',
      nameAr: 'الدمام',
      nameEn: 'Dammam',
      tagAr: 'وصول تجاري',
      tagEn: 'Eastern Reach',
      subAr: 'المنطقة الشرقية',
      subEn: 'Eastern Province',
      labelOffset: { x: 50, y: -45 }
    },
    {
      id: 'khobar',
      x: 540,
      y: 245,
      type: 'market',
      nameAr: 'الخبر',
      nameEn: 'Al Khobar',
      tagAr: 'وصول تجاري',
      tagEn: 'Eastern Reach',
      subAr: 'بوابة الخليج العربي',
      subEn: 'Gulf Business Portal',
      labelOffset: { x: 50, y: 45 }
    }
  ];

  // Fine curved connector paths radiating from Riyadh (HQ) to other regions
  const connectors = [
    { targetId: 'jeddah', d: 'M 360 250 Q 255 285 180 330' },
    { targetId: 'dammam', d: 'M 360 250 Q 450 220 520 220' },
    { targetId: 'khobar', d: 'M 360 250 Q 460 260 540 245' }
  ];

  return (
    <div className="w-full flex flex-col items-center select-none" id="saudi-coverage-map-root">
      {/* Interactive responsive SVG stage */}
      <div 
        className="relative w-full max-w-[520px] aspect-[1.24/1] bg-white rounded-2xl border border-[#DCE5E0]/60 p-4 md:p-6 shadow-xs overflow-hidden"
        role="img"
        aria-label={mapAriaLabel}
      >
        <svg 
          viewBox="0 0 620 500" 
          className="w-full h-full" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients, patterns, shadows, and animations */}
          <defs>
            {/* Soft inner map glow */}
            <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#07583F" floodOpacity="0.04" />
            </filter>
            
            {/* Animated dashed line pulse effect */}
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#07583F" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#5F9E86" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#07583F" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* High Fidelity Simplified Saudi Arabia Outline Path */}
          <path 
            d="M 125 110 
               C 125 110, 150 90, 160 85 
               C 170 80, 185 70, 195 70 
               C 205 70, 220 100, 230 110 
               C 240 120, 255 125, 275 125 
               C 295 125, 335 150, 360 160 
               C 385 170, 420 170, 440 175 
               C 460 180, 485 195, 500 205 
               C 515 215, 520 220, 525 215 
               C 530 210, 532 215, 530 225 
               C 528 235, 538 235, 545 240 
               C 552 245, 560 250, 555 260 
               C 550 270, 555 278, 562 284 
               C 569 290, 578 300, 588 312 
               C 598 324, 600 335, 595 348 
               C 590 361, 580 405, 575 425 
               C 570 445, 540 448, 510 448 
               C 480 448, 450 440, 420 435 
               C 390 430, 360 425, 330 423 
               C 300 421, 265 445, 255 455 
               C 245 465, 238 468, 235 458 
               C 232 448, 240 435, 235 425 
               C 230 415, 225 400, 220 395 
               C 215 390, 205 380, 200 370 
               C 195 360, 190 348, 185 340 
               C 180 332, 175 320, 170 310 
               C 165 300, 155 285, 150 275 
               C 145 265, 135 250, 130 240 
               C 125 230, 115 210, 110 200 
               C 105 190, 95 175, 90 162 
               C 85 149, 80 135, 78 126 
               C 76 117, 85 110, 90 115 
               C 95 120, 105 125, 110 118 
               C 115 111, 125 110, 125 110 Z" 
            fill="#F2F6F3" 
            stroke="#BFD5CA" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
            filter="url(#map-shadow)"
          />

          {/* Delicate Regional Curved Connections */}
          {connectors.map((conn) => (
            <path 
              key={conn.targetId}
              d={conn.d} 
              stroke="url(#line-gradient)" 
              strokeWidth="1.8" 
              strokeDasharray="5 4" 
              className="opacity-75"
            />
          ))}

          {/* Pulsing visual waves behind HQ Riyadh */}
          <circle cx="360" cy="250" r="18" className="fill-none stroke-[#07583F]/20 stroke-1 animate-[ping_2.5s_infinite]" />
          <circle cx="360" cy="250" r="10" className="fill-[#07583F]/8" />

          {/* City Nodes */}
          {locations.map((loc) => {
            const isHq = loc.type === 'headquarters';
            return (
              <g key={loc.id} className="cursor-pointer group">
                {/* Visual node anchor point */}
                <circle 
                  cx={loc.x} 
                  cy={loc.y} 
                  r={isHq ? 8 : 6} 
                  fill={isHq ? '#07583F' : '#7FA997'} 
                  stroke="#FFFFFF" 
                  strokeWidth="2"
                  className="shadow-xs transition-all duration-300 group-hover:scale-125"
                />
                
                {/* Highlight ring on hover */}
                <circle 
                  cx={loc.x} 
                  cy={loc.y} 
                  r={isHq ? 14 : 11} 
                  stroke={isHq ? '#07583F' : '#7FA997'} 
                  strokeWidth="1.5" 
                  className="opacity-0 group-hover:opacity-40 transition-opacity duration-300 fill-none"
                />
              </g>
            );
          })}
        </svg>

        {/* Absolute-positioned clean HTML labels to avoid SVG wrapping/responsiveness issues */}
        {locations.map((loc) => {
          const isHq = loc.type === 'headquarters';
          const name = lang === 'ar' ? loc.nameAr : loc.nameEn;
          const tag = lang === 'ar' ? loc.tagAr : loc.tagEn;
          const sub = lang === 'ar' ? loc.subAr : loc.subEn;

          // Align settings based on offsets
          const isLtr = lang === 'en';
          
          return (
            <div 
              key={loc.id}
              className="absolute pointer-events-none transition-transform duration-300 hover:scale-[1.03]"
              style={{
                // Map coordinates (0-620 x 0-500) translated to percentage of container
                left: `${(loc.x / 620) * 100}%`,
                top: `${(loc.y / 500) * 100}%`,
                transform: `translate(-50%, -50%) translate(${loc.labelOffset.x}px, ${loc.labelOffset.y}px)`,
              }}
            >
              <div 
                className={`flex flex-col bg-white/95 backdrop-blur-xs border border-[#DCE5E0] rounded-lg px-2.5 py-1.5 shadow-sm text-center min-w-[125px]`}
                style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
              >
                {/* Header line with Name and Tag */}
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-[#151B18]">{name}</span>
                  <span 
                    className={`text-[8px] font-black tracking-wide uppercase px-1 rounded-sm ${
                      isHq 
                        ? 'bg-[#EEF4F0] text-[#07583F]' 
                        : 'bg-[#DCE5E0]/50 text-[#626B66]'
                    }`}
                  >
                    {tag}
                  </span>
                </div>
                
                {/* Subtitle with smaller font */}
                <span className="text-[9px] text-[#626B66] text-right rtl:text-right ltr:text-left mt-0.5 leading-tight truncate">
                  {sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Understated caption beneath map */}
      <div className="mt-3 text-center">
        <span className="text-xs font-semibold text-[#626B66]">
          {mapCaption}
        </span>
      </div>
    </div>
  );
};
