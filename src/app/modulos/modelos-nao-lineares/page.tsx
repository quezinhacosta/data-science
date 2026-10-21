import React from 'react';
import { Callout } from '@/components/ui/Callout';
import { Code2, GitCommit, ArrowRight, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export default function NonLinearModelsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
          <span>Módulo 4 • Classificação & Otimização Avançada</span>
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Modelos Não-Lineares em Ciência de Dados
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-4xl">
          Da rigidez da reta à elegância probabilística das curvas sigmoides, entropia cruzada binária,
          superfícies de verossimilhança e métodos de Newton-Raphson guiados pela Matriz Hessiana.
        </p>
      </div>

      {/* 1. Onde a Reta Fracassa */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>1. Onde a Reta Fracassa & A Iluminação do Quarto</span>
        </h2>

        <Callout type="intuition" title="💡 Analogia da Iluminação no Quarto Escuro">
          Se você está em um quarto completamente escuro e acende <strong>1 vela</strong>, o salto de luminosidade é colossal.
          Mas se você já tem <strong>100 velas acesas</strong> e acende a 101ª vela, seus olhos mal notam a diferença.
          A reta linear assume cegamente que a 101ª vela ilumina tanto quanto a primeira. O modelo não-linear entende o rendimento decrescente e os limites de saturação do mundo real!
        </Callout>

        <p className="text-sm text-slate-300 leading-relaxed">
          O modelo linear assume que a resposta <code className="text-blue-300 font-mono">y = Xw</code> pode variar livremente de{' '}
          <span className="font-mono text-blue-300">-∞ a +∞</span>. Mas em problemas de classificação médica, risco de crédito ou aprovação de alunos:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
            <h4 className="font-semibold text-rose-300 text-sm">O Absurdo da Reta Linear na Probabilidade</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Uma reta comum pode prever probabilidades absurdas como <span className="font-mono text-rose-400">-30%</span> ou{' '}
              <span className="font-mono text-rose-400">140%</span> de chance de chuva. Não existe paciente "140% infartado"!
            </p>
          </div>
          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
            <h4 className="font-semibold text-purple-300 text-sm">A Exigência do Intervalo Fechado [0, 1]</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Probabilidades pertencem estritamente ao intervalo contínuo entre <strong className="text-white">0.0 (0%)</strong> e{' '}
              <strong className="text-white">1.0 (100%)</strong>. Precisamos de uma função de ligação não-linear!
            </p>
          </div>
        </div>
      </section>

      {/* 2. A Função Sigmoide */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>2. O Elo de Ligação: A Função Sigmoide σ(z)</span>
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          Para comprimir qualquer combinação linear arbitrária <span className="font-mono text-blue-300">z = wᵀx</span> dentro da faixa de probabilidade <span className="font-mono text-purple-300">[0, 1]</span>,
          utilizamos a função logística (ou sigmoide):
        </p>

        <div className="rounded-xl border border-purple-500/40 bg-purple-950/30 p-5 text-center">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            Fórmula Canônica da Sigmoide
          </div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-white">
            σ(z) = 1 / (1 + e⁻ᶻ)
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Quando <span className="font-mono text-purple-300">z = 0</span>, <span className="font-mono text-white">σ(0) = 0.5</span> (o limiar neutro de decisão).
            Quando <span className="font-mono text-purple-300">z → +∞</span>, <span className="font-mono text-white">σ(z) → 1</span>; e quando <span className="font-mono text-purple-300">z → -∞</span>, <span className="font-mono text-white">σ(z) → 0</span>.
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            O Truque Elegante da Derivada da Sigmoide
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Aplicando a regra da cadeia e reescrevendo <span className="font-mono">σ(z) = (1 + e⁻ᶻ)⁻¹</span>, sua derivada se expressa de forma fechada em função de si mesma:
          </p>
          <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            dσ(z) / dz = σ(z) · [1 - σ(z)]
          </div>
        </div>
      </section>

      {/* 3. Distribuição de Bernoulli & Log-Likelihood */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>3. Distribuição de Bernoulli & Entropia Cruzada Binária (BCE)</span>
        </h2>

        <Callout type="trap" title="⚠️ Por que não usamos o Erro Quadrático Médio (MSE)?">
          No modelo linear, o MSE gerava uma tigela convexa perfeita com mínimo global único. Porém, ao colocar a sigmoide
          não-linear dentro do quadrado, a superfície de erro se torna cheia de ondulações e múltiplos mínimos locais falsos.
          O gradiente ficaria preso em buracos! Por isso, derivamos a função de erro a partir da probabilidade de Bernoulli.
        </Callout>

        <p className="text-sm text-slate-300 leading-relaxed">
          Para uma amostra binária real <span className="font-mono text-blue-300">y ∈ &#123;0, 1&#125;</span> e previsão de probabilidade <span className="font-mono text-purple-300">p = σ(wᵀx)</span>:
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-200 text-center">
          P(Y = y | x, w) = [p]ʸ · [1 - p]¹⁻ʸ
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Para evitar underflow numérico no computador (multiplicação de milhares de números decimais minúsculos),
          aplicamos o logaritmo natural e invertemos o sinal para transformar a maximização de ganho em minimização de custo:
        </p>

        <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-5 text-center">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            Função de Custo: Entropia Cruzada Binária E(w)
          </div>
          <div className="text-lg md:text-xl font-mono font-bold text-white">
            E(w) = - ∑ [ yᵢ · ln(pᵢ) + (1 - yᵢ) · ln(1 - pᵢ) ]
          </div>
        </div>
      </section>

      {/* 4. A Simetria do Gradiente */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>4. A Simetria Estonteante do Gradiente: ∇E(w) = Xᵀ(p - y)</span>
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          Calculando a derivada parcial em relação a cada peso <span className="font-mono text-blue-300">w</span>, chegamos a uma fórmula surpreendentemente limpa:
        </p>

        <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-5 text-center">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            Gradiente Matricial Não-Linear
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-white">
            ∇E(w) = Xᵀ(p - y)
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300 space-y-2">
          <p>
            <strong className="text-amber-400">A Beleza da Conexão:</strong> Observe a estrutura idêntica entre os dois modelos:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Modelo Linear:</strong> <code className="text-blue-300 font-mono">∇E(w) = (2/N) Xᵀ (ŷ - y)</code>, onde <span className="font-mono">ŷ = Xw</span>
            </li>
            <li>
              <strong>Modelo Não-Linear:</strong> <code className="text-purple-300 font-mono">∇E(w) = Xᵀ (p - y)</code>, onde <span className="font-mono">p = σ(Xw)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. A Matriz Hessiana & Newton-Raphson */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>5. A Matriz Hessiana & Método de Newton-Raphson (2ª Ordem)</span>
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          Se a 1ª derivada (o Gradiente) informa a <em>inclinação</em> do terreno, a 2ª derivada (a <strong>Matriz Hessiana H</strong>)
          mede a <em>curvatura local</em> da tigela:
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-200 text-center">
          H = ∇²E(w) = Xᵀ P X, &nbsp;&nbsp; onde P = diag [ pᵢ (1 - pᵢ) ]
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-1.5">
              <span>Gradiente Descendente (1ª Ordem)</span>
            </h4>
            <div className="font-mono text-xs text-slate-200 mt-2 bg-slate-950 p-2 rounded border border-slate-800">
              w[t+1] = w[t] - η · ∇E(w)
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Dá passos cegos baseados apenas na inclinação instantânea. Se houver desnível acentuado, ziguezagueia e pode exigir centenas de iterações.
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
            <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-1.5">
              <span>Método de Newton-Raphson (2ª Ordem)</span>
            </h4>
            <div className="font-mono text-xs text-purple-200 mt-2 bg-slate-950 p-2 rounded border border-slate-800">
              w[t+1] = w[t] - H⁻¹ · ∇E(w)
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Usa a curvatura da Hessiana <span className="font-mono text-purple-300">H⁻¹</span> para ajustar dinamicamente o tamanho e a direção do salto.
              Costuma convergir em apenas <strong>5 a 10 passos exatos</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 6. Implementação em Python Puro */}
      <section className="space-y-4 pt-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Code2 className="w-6 h-6 text-purple-400" />
          <span>6. Classificador Logístico em Python Puro (Exemplo Médico)</span>
        </h2>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
          <pre>{`import math

# Amostras de pacientes do manual:
# [viés=1, colesterol]
X = [[1.0, 2.0], [1.0, -1.0]]
y = [1.0, 0.0]  # 1 = Risco cardíaco alto, 0 = Saudável

# Função Sigmoide
def sigmoid(z):
    return 1.0 / (1.0 + math.exp(-z))

# Pesos iniciais w = [w0, w1]
w = [0.0, 0.0]
learning_rate = 0.5

print("--- Iteração Passo a Passo (Exemplo do Manual) ---")
for step in range(1, 6):
    # 1. Combinações lineares e previsões probabilísticas
    p = [sigmoid(w[0] * xi[0] + w[1] * xi[1]) for xi in X]
    
    # 2. Erros individuais (p - y)
    errors = [pi - yi for pi, yi in zip(p, y)]
    
    # 3. Gradiente: sum(xi * erro)
    grad_w0 = sum(xi[0] * err for xi, err in zip(X, errors))
    grad_w1 = sum(xi[1] * err for xi, err in zip(X, errors))
    
    # 4. Atualização
    w[0] -= learning_rate * grad_w0
    w[1] -= learning_rate * grad_w1
    
    print(f"Passo {step:02d} | w0: {w[0]:.4f} | w_colesterol: {w[1]:.4f} | Probabilidades: {[round(x, 3) for x in p]}")

print(f"\\nPeso do colesterol após ajuste: {w[1]:.4f} > 0 (Maior colesterol aumenta risco!)")`}</pre>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center border-t border-slate-800 pt-6">
        <Link
          href="/modulos/modelos-lineares"
          className="text-xs text-slate-400 hover:text-white transition"
        >
          ← Módulo 2: Modelos Lineares & Simulador
        </Link>
        <Link
          href="/modulos/biblioteca"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
        >
          <span>Ir para Biblioteca & PDFs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

