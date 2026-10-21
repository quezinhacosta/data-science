import React from 'react';
import { GradientDescentSimulator } from '@/components/simulators/GradientDescentSimulator';
import { Callout } from '@/components/ui/Callout';
import { MathView } from '@/components/ui/MathView';
import { BookOpen, Code2, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LinearModelsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <span>Módulo 2 • Fundamentos & Soluções</span>
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Modelos Lineares em Ciência de Dados
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-4xl">
          Da equação fundamental da reta <code className="text-blue-300 font-mono">y = ax + b</code> ao formalismo
          matricial, projeção ortogonal de mínimos quadrados, Equação Normal analítica e otimização iterativa via Gradiente Descendente.
        </p>
      </div>

      {/* 1. Intuição dos Apartamentos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>1. A Grande Ideia & O Exemplo dos Apartamentos</span>
        </h2>

        <Callout type="intuition" title="💡 Intuição do Mundo Real">
          Em Ciência de Dados, queremos prever uma resposta contínua (como o preço de venda de um imóvel) com base em suas
          características (como área privativa). O modelo linear assume a relação mais simples e elegante do universo: o
          resultado final é uma soma ponderada de cada atributo multiplicado pelo seu devido peso de importância.
        </Callout>

        <p className="text-sm text-slate-300 leading-relaxed">
          Imagine que observamos duas vendas reais no mercado imobiliário:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <h4 className="font-semibold text-blue-400 text-sm">Apartamento 1</h4>
            <p className="text-xs text-slate-300 mt-1">
              Área de <strong className="text-white">40 m²</strong> foi vendido por <strong className="text-emerald-400">R$ 90.000</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <h4 className="font-semibold text-blue-400 text-sm">Apartamento 2</h4>
            <p className="text-xs text-slate-300 mt-1">
              Área de <strong className="text-white">100 m²</strong> foi vendido por <strong className="text-emerald-400">R$ 150.000</strong>.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Traduzindo para a fórmula clássica da reta <span className="font-mono text-blue-300">y = w₁·x + w₀</span> (onde{' '}
          <span className="font-mono text-blue-300">w₀</span> é o viés/intercepto e <span className="font-mono text-blue-300">w₁</span> é a inclinação/peso):
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-200 space-y-1">
          <div>90.000 = w₁ · 40 + w₀</div>
          <div>150.000 = w₁ · 100 + w₀</div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Subtraindo a 1ª da 2ª equação: <code className="text-emerald-400 font-mono">60.000 = w₁ · 60 ⇒ w₁ = 1.000 R$/m²</code>.
          Substituindo de volta: <code className="text-emerald-400 font-mono">w₀ = 50.000 R$</code>.
          A previsão para qualquer imóvel passa a ser <code className="text-blue-300 font-mono">Preço = 1.000 · Área + 50.000</code>.
        </p>
      </section>

      {/* 2. O Dilema do Mundo Real: N >> D */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>2. O Dilema do Mundo Real: N ≫ D (Sistemas Sobredeterminados)</span>
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          Quando o número de imóveis observados é igual ao número de parâmetros (<span className="font-mono text-blue-300">N = D = 2</span>),
          o sistema é determinado e existe uma reta exata que passa por todos os pontos (erro zero). Porém, no mundo real temos{' '}
          <strong className="text-white">milhares de imóveis (N = 10.000)</strong> e apenas algumas características (<span className="font-mono text-blue-300">D = 2</span> ou <span className="font-mono text-blue-300">10</span>).
        </p>

        <Callout type="trap" title="⚠️ Não existe inversa direta para matrizes retangulares">
          A matriz de dados <span className="font-mono text-amber-300">X</span> possui dimensão <span className="font-mono">(N × D)</span>.
          Como tem muito mais linhas que colunas, ela não é quadrada! Não existe <span className="font-mono">X⁻¹</span>.
          Além disso, devido a ruídos do mundo real, nenhuma linha reta consegue cruzar com perfeição 10.000 pontos dispersos.
          Logo, o erro <span className="font-mono text-rose-400">e = y - ŷ ≠ 0</span>. O objetivo passa a ser minimizar esse erro global!
        </Callout>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <h4 className="text-sm font-semibold text-white">Por que usamos o Erro Quadrático Médio (MSE)?</h4>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-white">Garante Positividade:</strong> Erros positivos e negativos não se cancelam.
            </li>
            <li>
              <strong className="text-white">Pune Erros Desproporcionais:</strong> Errar por 10 custa 100; errar por 100 custa 10.000. O modelo aprende a evitar desvios grotescos.
            </li>
            <li>
              <strong className="text-white">Diferenciabilidade Suave:</strong> A função matricial de custo forma uma tigela convexa perfeita (paraboloide), permitindo calcular derivadas analíticas sem descontinuidades.
            </li>
          </ul>
        </div>
      </section>

      {/* 3. A Equação Normal & Projeção Ortogonal */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>3. A Derivada Matricial & A Famosa Equação Normal</span>
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          Expandindo a norma do erro <span className="font-mono text-blue-300">E(w) = (1/N) (Xw - y)ᵀ(Xw - y)</span>, obtemos:
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-blue-300 text-center">
          E(w) = (1/N) [ wᵀ(XᵀX)w - 2wᵀ(Xᵀy) + yᵀy ]
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Igualando o vetor gradiente a zero (<span className="font-mono">∇E(w) = 0</span>):
        </p>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            Fórmula da Equação Normal
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-white">
            ŵ = (XᵀX)⁻¹ Xᵀy
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Geometricamente: o vetor de resíduos <span className="font-mono text-emerald-300">e = y - Xŵ</span> é perpendicular (ortogonal) ao subespaço gerado pelas colunas de <span className="font-mono text-emerald-300">X</span>!
          </div>
        </div>
      </section>

      {/* 4. Por que precisamos do Gradiente Descendente? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>4. O Gargalo da Inversão & O Gradiente Descendente</span>
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          Se a Equação Normal fornece a resposta em uma única fórmula, por que não a utilizamos sempre?
          Porque inverter uma matriz <span className="font-mono">(D × D)</span> possui complexidade computacional de{' '}
          <strong className="text-rose-400 font-mono">O(D³)</strong>! Se tivermos 100.000 variáveis preditoras (processamento de texto, visão ou genômica),
          o computador travará por falta de memória RAM.
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          A solução é o <strong className="text-blue-400">Gradiente Descendente</strong>: em vez de saltar de uma vez para a resposta com uma inversa pesada,
          damos pequenos passos iterativos descendo a curvatura da tigela de erro:
        </p>

        <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-4 font-mono text-sm text-center text-blue-200">
          w[t+1] = w[t] - η · ∇E(w)
        </div>
      </section>

      {/* 5. SIMULADOR INTERATIVO */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Laboratório Prático
          </span>
          <h2 className="text-2xl font-bold text-white">
            5. Experimente no Simulador Interativo
          </h2>
        </div>

        {/* The Component requested */}
        <GradientDescentSimulator />
      </section>

      {/* 6. Código em Python Puro */}
      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Code2 className="w-6 h-6 text-emerald-400" />
          <span>6. Implementação em Python Puro (Estilo Joel Grus)</span>
        </h2>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
          <pre>{`# Dados dos apartamentos do manual
X = [1.0, 2.0, 3.0]  # Áreas (dezenas de m²)
y = [2.0, 3.0, 5.0]  # Preços (dezenas de milhares R$)

# Hiperparâmetros
learning_rate = 0.11
w0 = 1 / 3           # Viés ótimo fixado
w1 = 0.20            # Ponto de partida

print("--- Otimização via Gradiente Descendente ---")
for step in range(1, 11):
    N = len(X)
    # 1. Previsão e Erro
    predictions = [w0 + w1 * xi for xi in X]
    errors = [pred - yi for pred, yi in zip(predictions, y)]
    
    # 2. Custo MSE
    mse = sum(err ** 2 for err in errors) / N
    
    # 3. Gradiente dE / dw1 = (2/N) * sum(xi * erro)
    grad_w1 = (2 / N) * sum(xi * err for xi, err in zip(X, errors))
    
    # 4. Atualização do Peso
    w1 = w1 - learning_rate * grad_w1
    
    print(f"Passo {step:02d} | w1: {w1:.4f} | Gradiente: {grad_w1:+.4f} | MSE: {mse:.4f}")

print(f"\\nPeso final w1: {w1:.4f} (Valor exato analítico: 1.5000)")`}</pre>
        </div>
      </section>

      {/* Navigation to Next Module */}
      <div className="flex justify-between items-center border-t border-slate-800 pt-6">
        <Link
          href="/modulos/fundamentos-vetoriais"
          className="text-xs text-slate-400 hover:text-white transition"
        >
          ← Módulo 1: Fundamentos Vetoriais
        </Link>
        <Link
          href="/modulos/modelos-nao-lineares"
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition"
        >
          <span>Avançar para Módulo 4: Modelos Não-Lineares</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

