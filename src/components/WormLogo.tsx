import React from 'react';

interface WormLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const WormLogo: React.FC<WormLogoProps> = ({
  className = 'w-12 h-12',
  size,
  showText = false,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full shrink-0 drop-shadow-xs"
        aria-label="شعار دودة الأرض المغرب - فيرمياتلاس"
      >
        <defs>
          {/* Radial gradient for the warm brown soil background */}
          <radialGradient id="soilBg" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#966036" />
            <stop offset="55%" stopColor="#6C4120" />
            <stop offset="100%" stopColor="#48250E" />
          </radialGradient>

          {/* Worm skin gradient */}
          <linearGradient id="wormSkin" x1="30%" y1="20%" x2="70%" y2="80%">
            <stop offset="0%" stopColor="#FFF2E7" />
            <stop offset="35%" stopColor="#F9E2D0" />
            <stop offset="100%" stopColor="#ECC2A5" />
          </linearGradient>

          {/* Soil clods gradient */}
          <linearGradient id="crumblySoil" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A2E19" />
            <stop offset="50%" stopColor="#361E0E" />
            <stop offset="100%" stopColor="#221107" />
          </linearGradient>

          {/* Plant leaf green gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A4DF35" />
            <stop offset="60%" stopColor="#7EBA1B" />
            <stop offset="100%" stopColor="#5B9010" />
          </linearGradient>
        </defs>

        {/* Outer concentric rings */}
        <circle cx="250" cy="250" r="240" fill="#643616" stroke="#48250E" strokeWidth="8" />
        <circle cx="250" cy="250" r="226" fill="white" />
        <circle cx="250" cy="250" r="214" fill="url(#soilBg)" stroke="#643616" strokeWidth="4" />

        {/* Tail on left giving thumbs-up */}
        <path
          d="M 175 350 C 120 350 85 300 95 240 C 105 180 160 215 170 265"
          stroke="#6B3C1A"
          strokeWidth="11"
          fill="url(#wormSkin)"
        />
        <path
          d="M 125 210 C 120 185 145 180 155 200 C 165 220 160 245 140 250 Z"
          fill="url(#wormSkin)"
          stroke="#6B3C1A"
          strokeWidth="8"
        />
        <path d="M 96 280 C 112 285 130 285 145 280" stroke="#7A441F" strokeWidth="8" strokeLinecap="round" />
        <path d="M 115 320 C 130 330 150 330 168 322" stroke="#7A441F" strokeWidth="8" strokeLinecap="round" />

        {/* Worm Main Body Curve */}
        <path
          d="M 230 400 C 215 420 170 410 170 375 C 170 340 230 340 240 260 L 290 260 C 295 340 330 345 325 385 C 320 425 250 420 230 400 Z"
          fill="url(#wormSkin)"
          stroke="#6B3C1A"
          strokeWidth="9"
        />

        {/* Body segment bands */}
        <path d="M 233 245 C 260 255 285 255 305 245" stroke="#7A441F" strokeWidth="9" strokeLinecap="round" />
        <path d="M 226 285 C 255 298 280 298 296 285" stroke="#7A441F" strokeWidth="9" strokeLinecap="round" />
        <path d="M 195 328 C 225 350 255 350 270 328" stroke="#7A441F" strokeWidth="9" strokeLinecap="round" />
        <path d="M 245 365 C 265 390 290 385 305 360" stroke="#7A441F" strokeWidth="9" strokeLinecap="round" />

        {/* Worm Head */}
        <path
          d="M 215 220 C 185 180 190 85 270 70 C 340 60 365 145 325 210 C 310 230 235 245 215 220 Z"
          fill="url(#wormSkin)"
          stroke="#6B3C1A"
          strokeWidth="9"
        />

        {/* Eyes */}
        <ellipse cx="230" cy="138" rx="18" ry="24" fill="white" stroke="#6B3C1A" strokeWidth="5" />
        <ellipse cx="233" cy="140" rx="10" ry="14" fill="#2E8B2C" />
        <ellipse cx="233" cy="140" rx="6" ry="8" fill="#143414" />
        <circle cx="230" cy="134" r="3.5" fill="white" />

        <ellipse cx="275" cy="132" rx="18" ry="24" fill="white" stroke="#6B3C1A" strokeWidth="5" />
        <ellipse cx="272" cy="134" rx="10" ry="14" fill="#2E8B2C" />
        <ellipse cx="272" cy="134" rx="6" ry="8" fill="#143414" />
        <circle cx="270" cy="128" r="3.5" fill="white" />

        {/* Eyebrows */}
        <path d="M 215 110 C 225 100 240 105 245 112" stroke="#6B3C1A" strokeWidth="6" strokeLinecap="round" />
        <path d="M 260 105 C 275 96 290 102 295 110" stroke="#6B3C1A" strokeWidth="6" strokeLinecap="round" />

        {/* Smile */}
        <path
          d="M 208 172 C 220 162 265 130 306 155 C 315 162 300 200 250 202 C 215 204 200 185 208 172 Z"
          fill="#551E14"
          stroke="#6B3C1A"
          strokeWidth="7"
        />
        <path d="M 245 185 C 255 175 275 178 285 186 C 275 198 255 198 245 185 Z" fill="#DF6B6B" />

        {/* Cheeks */}
        <ellipse cx="205" cy="175" rx="8" ry="5" fill="#EFA286" opacity="0.6" />
        <ellipse cx="312" cy="162" rx="8" ry="5" fill="#EFA286" opacity="0.6" />

        {/* Seedling Sprout */}
        <path d="M 360 360 Q 355 310 362 260" stroke="#5B9010" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M 362 260 C 350 205 385 190 410 230 C 418 245 390 265 362 260 Z"
          fill="url(#leafGrad)"
          stroke="#3F6809"
          strokeWidth="6"
        />
        <path
          d="M 358 290 C 310 270 295 315 345 330 C 358 332 360 310 358 290 Z"
          fill="url(#leafGrad)"
          stroke="#3F6809"
          strokeWidth="6"
        />
        <path
          d="M 364 295 C 415 285 435 325 385 345 C 370 348 365 320 364 295 Z"
          fill="url(#leafGrad)"
          stroke="#3F6809"
          strokeWidth="6"
        />

        {/* Crumbly Compost Mound */}
        <path
          d="M 90 395 C 120 360 150 375 180 365 C 220 350 260 375 300 360 C 340 345 380 370 410 355 C 430 365 440 380 435 410 C 390 445 280 460 210 455 C 140 450 100 425 90 395 Z"
          fill="url(#crumblySoil)"
          stroke="#2E170A"
          strokeWidth="8"
        />

        {/* Soil clods */}
        <circle cx="130" cy="390" r="14" fill="#3D200E" />
        <circle cx="160" cy="405" r="18" fill="#2E170A" />
        <circle cx="210" cy="425" r="22" fill="#3D200E" />
        <circle cx="265" cy="415" r="20" fill="#2E170A" />
        <circle cx="315" cy="400" r="25" fill="#3D200E" />
        <circle cx="365" cy="385" r="18" fill="#2E170A" />
        <circle cx="395" cy="405" r="16" fill="#3D200E" />
      </svg>

      {showText && (
        <div className="flex flex-col text-right leading-none">
          <span className="text-sm font-extrabold text-[#172D1E] tracking-tight">دودة الأرض</span>
          <span className="text-xs font-bold text-[#8C582B] tracking-wider">المغرب</span>
        </div>
      )}
    </div>
  );
};
