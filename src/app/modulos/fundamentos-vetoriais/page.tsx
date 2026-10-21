import React from 'react';
import { Callout } from '@/components/ui/Callout';
import { Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function VectorFoundationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <span>Módulo 1 • Fundamentos Vetoriais & Métricos</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Layers className="w-8 h-8 text-blue-400" />
          Fundamentos Vetoriais & Métricos
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Matrizes, Produto Escalar como importância de atributos e Projeção Ortogonal de Mínimos Quadrados.
        </p>
      </div>

      <Callout type="intuition" title="💡 Produto Escalar como Ponderador">
        O produto escalar entre o vetor de características <code className="text-amber-300">x</code> e o vetor de pesos <code className="text-blue-300">w</code>{' '}
        expressa exatamente a soma ponderada de todas as influências sobre a resposta:{' '}
        <code className="text-emerald-300 font-mono">ŷ = wᵀx = w₀ + w₁x₁ + ... + wDxD</code>.
      </Callout>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Geometria da Projeção Ortogonal</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          O conjunto de todas as previsões possíveis <code className="text-blue-300 font-mono">ŷ = Xw</code> forma o subespaço das colunas <code className="text-emerald-400 font-mono">Col(X)</code>.
          O vetor real <code className="text-white font-mono">y</code> geralmente está fora desse subespaço.
          A menor distância possível ocorre quando o vetor de erro <code className="text-rose-400 font-mono">e = y - ŷ</code> forma um ângulo de 90° (ortogonal) com todas as colunas de X:
        </p>
        <div className="font-mono text-center text-sm text-emerald-400 bg-slate-950 p-4 rounded-xl border border-slate-800">
          Xᵀ (y - Xŵ) = 0 &nbsp;⇒&nbsp; Xᵀy - XᵀXŵ = 0 &nbsp;⇒&nbsp; ŵ = (XᵀX)⁻¹ Xᵀy
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex justify-end">
        <Link
          href="/modulos/modelos-lineares"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition"
        >
          <span>Ir para Módulo 2: Modelos Lineares & Simulador</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

