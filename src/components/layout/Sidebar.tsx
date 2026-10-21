'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  LineChart,
  BarChart2,
  GitCommit,
  Layers,
  Sparkles,
  Search,
  ChevronRight,
  Library,
  Compass,
  Cpu,
  GraduationCap,
} from 'lucide-react';

export const navigationModules = [
  {
    title: 'Visão Geral & Trilha',
    href: '/',
    icon: Compass,
    badge: 'Início',
  },
  {
    title: 'Módulo 1: Fundamentos Vetoriais',
    description: 'Matrizes, Produto Escalar & Projeção Ortogonal',
    href: '/modulos/fundamentos-vetoriais',
    icon: Layers,
    badge: 'Vetores',
  },
  {
    title: 'Módulo 2: Modelos Lineares',
    description: 'Equação Normal vs. Gradiente Descendente',
    href: '/modulos/modelos-lineares',
    icon: LineChart,
    badge: 'Laboratório',
    highlight: true,
  },
  {
    title: 'Módulo 3: Métodos Estatísticos',
    description: 'Normal, Z-score, Confiança & Bootstrap',
    href: '/modulos/metodos-estatisticos',
    icon: BarChart2,
    badge: 'Estatística',
  },
  {
    title: 'Módulo 4: Modelos Não-Lineares',
    description: 'Sigmoide, Log-Likelihood, Hessiana & Newton',
    href: '/modulos/modelos-nao-lineares',
    icon: GitCommit,
    badge: 'Otimização',
  },
  {
    title: 'Módulo 5: Biblioteca & Acervo',
    description: 'Livros de referência, resumos & notas',
    href: '/modulos/biblioteca',
    icon: Library,
    badge: 'PDFs',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = navigationModules.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="w-72 shrink-0 border-r border-slate-800 bg-slate-950/90 backdrop-blur-xl flex flex-col h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              <span>DataScience</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Sem Medo
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Plataforma Interativa EdTech
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar tópico, fórmula, módulo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
          Trilha Didática
        </div>
        {filteredModules.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 transition text-xs ${
                isActive
                  ? 'bg-blue-600/15 border border-blue-500/40 text-blue-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        item.highlight
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Inspiração "Sem Medo"</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Teoria matemática rigorosa combinada com visualizações interativas passo a passo.
          </p>
        </div>
      </div>
    </aside>
  );
}

