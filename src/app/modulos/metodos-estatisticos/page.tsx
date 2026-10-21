import React from 'react';
import { Callout } from '@/components/ui/Callout';
import { BarChart2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StatisticalMethodsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <span>Módulo 3 • Métodos Estatísticos & Incerteza</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <BarChart2 className="w-8 h-8 text-amber-400" />
          Métodos Estatísticos & Incerteza
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Distribuição Normal, cálculo de Z-score, Teorema Central do Limite e Bootstrap (reamostragem com reposição).
        </p>
      </div>

      <Callout type="intuition" title="💡 Incerteza e Reamostragem com Bootstrap">
        No mundo real, nunca temos a população inteira, apenas uma amostra finita. O método de <strong>Bootstrap</strong> simula a criação de múltiplos universos paralelos sorteando os dados da própria amostra original <em>com reposição</em> milhares de vezes (<code className="text-amber-300">B = 1000</code>). Com isso, estimamos a variância e os limites de confiança sem depender de suposições rígidas!
      </Callout>

      <div className="pt-4 border-t border-slate-800 flex justify-between">
        <Link
          href="/modulos/modelos-lineares"
          className="text-xs text-slate-400 hover:text-white transition"
        >
          ← Módulo 2: Modelos Lineares
        </Link>
        <Link
          href="/modulos/modelos-nao-lineares"
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition"
        >
          <span>Ir para Módulo 4: Modelos Não-Lineares</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

