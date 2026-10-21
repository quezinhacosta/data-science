import Link from 'next/link';
import {
  LineChart,
  GitCommit,
  Layers,
  BarChart2,
  Library,
  ArrowRight,
  Sparkles,
  BookOpen,
  Cpu,
  Compass,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 p-8 md:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Inspirado no Método Prático "MIPS Sem Medo"
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Ciência de Dados <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Sem Medo</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            Uma abordagem visual, interativa e matematicamente rigorosa. Da equação da reta e sistemas sobredeterminados
            até a regressão logística, matriz Hessiana e otimização por Newton-Raphson — cada teoria com seu simulador em tempo real.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/modulos/modelos-lineares"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
            >
              <LineChart className="w-4 h-4" />
              <span>Explorar Modelos Lineares</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/modulos/modelos-nao-lineares"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <GitCommit className="w-4 h-4 text-purple-400" />
              <span>Modelos Não-Lineares</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Pillars Didactic Framework */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 font-bold text-lg">
            💡
          </div>
          <h3 className="text-base font-bold text-white mb-2">1. Intuição Visual Primeiro</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Analogias do mundo real (como o preço de apartamentos e velas em um quarto escuro) para construir o entendimento intuitivo antes de qualquer fórmula.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-bold text-lg">
            📐
          </div>
          <h3 className="text-base font-bold text-white mb-2">2. Matemática Exata & Rigor</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dedução analítica passo a passo: do produto escalar à Equação Normal matricial e expansão de Taylor de 2ª ordem com a Matriz Hessiana.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-bold text-lg">
            🎮
          </div>
          <h3 className="text-base font-bold text-white mb-2">3. Simuladores Interativos</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Altere hiperparâmetros em tempo real, veja oscilações, divergências de taxa de aprendizado e inspecione a telemetria numérica passo a passo.
          </p>
        </div>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-400" />
          Módulos de Estudo da Disciplina
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1 */}
          <Link
            href="/modulos/fundamentos-vetoriais"
            className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-slate-700 hover:bg-slate-900/80 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                Módulo 1
              </span>
              <Layers className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
              Fundamentos Vetoriais & Métricos
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Matrizes, produto escalar como ponderador de atributos e projeção ortogonal no subespaço de colunas Col(X).
            </p>
          </Link>

          {/* Module 2 */}
          <Link
            href="/modulos/modelos-lineares"
            className="group rounded-2xl border border-blue-500/40 bg-blue-950/20 p-6 hover:border-blue-400 transition shadow-lg shadow-blue-950/40"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Módulo 2 • Destaque
              </span>
              <LineChart className="w-5 h-5 text-blue-400 group-hover:scale-110 transition" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
              Modelos Lineares & Soluções
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Equação Normal matricial vs. Gradiente Descendente iterativo. Inclui o <strong>Simulador Interativo MSE 1D</strong> com telemetria em tempo real!
            </p>
          </Link>

          {/* Module 3 */}
          <Link
            href="/modulos/metodos-estatisticos"
            className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-slate-700 hover:bg-slate-900/80 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Módulo 3
              </span>
              <BarChart2 className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
              Métodos Estatísticos & Incerteza
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Distribuição Normal, cálculo de Z-score, Teorema Central do Limite, Intervalos de Confiança e Reamostragem com Bootstrap.
            </p>
          </Link>

          {/* Module 4 */}
          <Link
            href="/modulos/modelos-nao-lineares"
            className="group rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6 hover:border-purple-400 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                Módulo 4
              </span>
              <GitCommit className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
              Modelos Não-Lineares & Otimização
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Função Sigmoide, Log-Likelihood de Bernoulli, Gradiente da Entropia Cruzada e otimização por Newton-Raphson com Matriz Hessiana.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

