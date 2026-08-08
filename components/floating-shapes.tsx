'use client';

import { Plus, Triangle, Square, Sparkle, Hexagon, Smile, Zap, Circle } from 'lucide-react';

const SHAPES = [
  { top: '8%', left: '4%', size: 22, color: 'text-violet', delay: '0s', rotate: '8deg', label: 'plus' },
  { top: '5%', left: '48%', size: 16, color: 'text-tangerine', delay: '1.2s', rotate: '-6deg', label: 'triangle' },
  { top: '12%', right: '6%', size: 18, color: 'text-cyan', delay: '2.1s', rotate: '12deg', label: 'plus' },
  { top: '18%', left: '22%', size: 14, color: 'text-hotpink', delay: '0.6s', rotate: '0deg', label: 'square' },
  { top: '26%', right: '28%', size: 16, color: 'text-lime', delay: '1.7s', rotate: '-4deg', label: 'sparkle' },
  { top: '34%', left: '7%', size: 12, color: 'text-indigo', delay: '2.6s', rotate: '10deg', label: 'hexagon' },
  { top: '38%', left: '78%', size: 22, color: 'text-violet', delay: '0.3s', rotate: '5deg', label: 'triangle' },
  { top: '46%', left: '14%', size: 16, color: 'text-tangerine', delay: '1.4s', rotate: '-8deg', label: 'smile' },
  { top: '52%', right: '10%', size: 14, color: 'text-cyan', delay: '0.9s', rotate: '6deg', label: 'plus' },
  { top: '58%', left: '42%', size: 18, color: 'text-hotpink', delay: '2.4s', rotate: '-2deg', label: 'square' },
  { top: '64%', left: '90%', size: 16, color: 'text-lime', delay: '1.1s', rotate: '9deg', label: 'zap' },
  { top: '70%', left: '6%', size: 14, color: 'text-indigo', delay: '3s', rotate: '-7deg', label: 'hexagon' },
  { top: '76%', right: '24%', size: 20, color: 'text-violet', delay: '0.5s', rotate: '4deg', label: 'circle' },
  { top: '82%', left: '30%', size: 12, color: 'text-tangerine', delay: '1.9s', rotate: '10deg', label: 'sparkle' },
  { top: '88%', right: '6%', size: 18, color: 'text-cyan', delay: '2.2s', rotate: '-5deg', label: 'plus' },
  { top: '93%', left: '60%', size: 14, color: 'text-hotpink', delay: '0.8s', rotate: '3deg', label: 'triangle' },
  { top: '15%', right: '18%', size: 10, color: 'text-lime', delay: '2.9s', rotate: '-9deg', label: 'zap' },
  { top: '44%', left: '34%', size: 10, color: 'text-cyan', delay: '1.6s', rotate: '7deg', label: 'plus' },
];

const ICONS: Record<string, (size: number) => React.ReactNode> = {
  plus: (s) => <Plus size={s} strokeWidth={3} />,
  triangle: (s) => <Triangle size={s} strokeWidth={2.5} />,
  square: (s) => <Square size={s} strokeWidth={2.5} />,
  sparkle: (s) => <Sparkle size={s} strokeWidth={2.5} />,
  hexagon: (s) => <Hexagon size={s} strokeWidth={2.5} />,
  smile: (s) => <Smile size={s} strokeWidth={2.5} />,
  zap: (s) => <Zap size={s} strokeWidth={2.5} />,
  circle: (s) => <Circle size={s} strokeWidth={2.5} />,
};

export function FloatingShapes() {
  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      {SHAPES.map((s, i) => (
        <span
          key={i}
          className={`animate-float-slow absolute opacity-40 ${s.color}`}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            '--rotate': s.rotate,
            '--float-delay': s.delay,
            width: s.size,
            height: s.size,
          } as React.CSSProperties}
        >
          {ICONS[s.label]?.(s.size)}
        </span>
      ))}
    </div>
  );
}