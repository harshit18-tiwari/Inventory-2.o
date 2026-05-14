import React from 'react'

export function Line(){
  return (
    <div style={{height:240}} className="w-full">
      <svg viewBox="0 0 600 240" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <polyline fill="url(#g1)" stroke="#4f46e5" strokeWidth="3" points="0,160 80,120 160,100 240,80 320,60 400,100 480,90 560,70" />
      </svg>
    </div>
  )
}

export function Pie(){
  return (
    <div style={{height:220}} className="w-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-40 h-40">
        <circle cx="100" cy="100" r="80" fill="#eff6ff" />
        <path d="M100 20 A80 80 0 0 1 180 100 L100 100 Z" fill="#60a5fa" />
        <path d="M180 100 A80 80 0 0 1 120 176 L100 100 Z" fill="#34d399" />
        <path d="M120 176 A80 80 0 0 1 40 132 L100 100 Z" fill="#f59e0b" />
      </svg>
    </div>
  )
}

export function Bar(){
  return (
    <div style={{height:160}} className="w-full flex items-end gap-3">
      {[40,80,60,100,70,120].map((h,i)=>(
        <div key={i} className="bg-primary rounded-md" style={{width:24,height:h}} />
      ))}
    </div>
  )
}

export default { Line, Pie, Bar }
