'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function MathView({ math, block = false, className = '' }: MathViewProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
      } catch (err) {
        console.error('KaTeX error:', err);
      }
    }
  }, [math, block]);

  return <span ref={containerRef} className={`font-serif ${className}`} />;
}

