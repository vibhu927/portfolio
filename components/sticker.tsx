import { ReactNode } from 'react';

interface StickerProps {
  children: ReactNode;
  className?: string;
}

export function Sticker({ children, className = '' }: StickerProps) {
  return (
    <span className={`sticker ${className}`}>
      {children}
    </span>
  );
}
