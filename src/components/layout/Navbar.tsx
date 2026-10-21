'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, Github, BookOpen } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const getSegmentName = (seg: string) => {
    switch (seg) {
      case 'modulos':
        return 'Módulos';
      case 'fundamentos-vetoriais':
        return 'Módulo 1: Fundamentos Vetoriais';
      case 'modelos-lineares':
        return 'Módulo 2: Modelos Lineares';
      case 'metodos-estatisticos':
        return 'Módulo 3: Métodos Estatísticos';
      case 'modelos-nao-lineares':
        return 'Módulo 4: Modelos Não-Lineares';
      case 'biblioteca':
        return 'Módulo 5: Biblioteca & Acervo';
      default:
        return seg;
    }
  };

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Início</span>
        </Link>
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          const href = `/${segments.slice(0, i + 1).join('/')}`;
          return (
            <React.Fragment key={href}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              {isLast ? (
                <span className="text-blue-400 font-medium">{getSegmentName(seg)}</span>
              ) : (
                <Link href={href} className="hover:text-slate-200 transition">
                  {getSegmentName(seg)}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Top right actions */}
      <div className="flex items-center gap-3 text-xs">
        <Link
          href="/modulos/biblioteca"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Acervo de PDFs</span>
        </Link>
      </div>
    </header>
  );
}

