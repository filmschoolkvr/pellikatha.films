import React from 'react';

export function Logo({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Pelli Katha Films Logo" 
        style={{ height: size, width: 'auto' }}
        className="object-contain"
      />
    </div>
  );
}
