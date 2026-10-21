'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Info,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { Callout } from '../ui/Callout';

export interface StepHistory {
  iteration: number;
  w1: number;
  w0: number;
  gradW1: number;
  step: number;
  error: number;
  status: 'normal' | 'converged' | 'diverged';
}

export function GradientDescentSimulator() {
  // Preset dataset from Manual: 3 Apartments
  // x = Area (dezenas de m²): 1, 2, 3
  // y = Preço (dezenas de milhares R$): 2, 3, 5
  // Analytically: w0* = 1/3 (0.333), w1* = 1.500
  const dataPoints = useMemo(
    () => [
      { x: 1, y: 2, label: 'Apto 1 (10m², 20k)' },
      { x: 2, y: 3, label: 'Apto 2 (20m², 30k)' },
      { x: 3, y: 5, label: 'Apto 3 (30m², 50k)' },
    ],
    []
  );

  const fixedW0 = 1 / 3; // Fixed intercept for 1D focus on slope w1

  // Hyperparameters
  const [learningRate, setLearningRate] = useState<number>(0.11);
  const [initialW1, setInitialW1] = useState<number>(0.2);
  const [currentW1, setCurrentW1] = useState<number>(0.2);
  const [iteration, setIteration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [history, setHistory] = useState<StepHistory[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('optimal');

  // Math Helpers
  // Error MSE: E(w1) = 1/3 * sum (w0 + w1*xi - yi)^2
  const computeError = (w1: number): number => {
    const n = dataPoints.length;
    let sumSq = 0;
    for (const pt of dataPoints) {
      const pred = fixedW0 + w1 * pt.x;
      const err = pred - pt.y;
      sumSq += err * err;
    }
    return sumSq / n;
  };

  // Derivative dE / dw1 = 2/3 * sum xi * (w0 + w1*xi - yi)
  const computeGradW1 = (w1: number): number => {
    const n = dataPoints.length;
    let sumGrad = 0;
    for (const pt of dataPoints) {
      const pred = fixedW0 + w1 * pt.x;
      const err = pred - pt.y;
      sumGrad += pt.x * err;
    }
    return (2 / n) * sumGrad;
  };

  // Initialize history on mount or reset
  const resetSimulation = (w1Start: number = initialW1) => {
    setIsPlaying(false);
    setCurrentW1(w1Start);
    setIteration(0);
    const initialErr = computeError(w1Start);
    const initialGrad = computeGradW1(w1Start);
    setHistory([
      {
        iteration: 0,
        w1: Number(w1Start.toFixed(4)),
        w0: Number(fixedW0.toFixed(3)),
        gradW1: Number(initialGrad.toFixed(4)),
        step: 0,
        error: Number(initialErr.toFixed(4)),
        status: 'normal',
      },
    ]);
  };

  useEffect(() => {
    resetSimulation(initialW1);
  }, [initialW1]);

  // Single Step
  const stepForward = () => {
    const grad = computeGradW1(currentW1);
    const step = -learningRate * grad;
    const nextW1 = currentW1 + step;
    const nextIter = iteration + 1;
    const nextErr = computeError(nextW1);

    // Check divergence or convergence
    let status: 'normal' | 'converged' | 'diverged' = 'normal';
    if (Math.abs(grad) < 0.001 || Math.abs(nextW1 - 1.5) < 0.002) {
      status = 'converged';
    } else if (Math.abs(nextW1) > 20 || isNaN(nextW1) || nextErr > 100) {
      status = 'diverged';
    }

    const newRecord: StepHistory = {
      iteration: nextIter,
      w1: Number(nextW1.toFixed(4)),
      w0: Number(fixedW0.toFixed(3)),
      gradW1: Number(grad.toFixed(4)),
      step: Number(step.toFixed(4)),
      error: Number(nextErr.toFixed(4)),
      status,
    };

    setCurrentW1(nextW1);
    setIteration(nextIter);
    setHistory((prev) => [...prev.slice(-30), newRecord]);

    if (status === 'converged' || status === 'diverged') {
      setIsPlaying(false);
    }
  };

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        stepForward();
      }, 500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentW1, iteration, learningRate]);

  // Presets
  const applyPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    if (presetKey === 'slow') {
      setLearningRate(0.03);
      setInitialW1(0.2);
    } else if (presetKey === 'optimal') {
      setLearningRate(0.11);
      setInitialW1(0.2);
    } else if (presetKey === 'oscillating') {
      setLearningRate(0.19);
      setInitialW1(0.2);
    } else if (presetKey === 'diverging') {
      setLearningRate(0.23);
      setInitialW1(0.2);
    }
  };

  const currentGrad = computeGradW1(currentW1);
  const currentErr = computeError(currentW1);

  // SVG Parabola Plot Parameters
  // Range w1 from -0.2 to 3.2
  const svgWidth = 520;
  const svgHeight = 280;
  const padding = 40;

  const wMin = -0.1;
  const wMax = 3.1;
  const errMin = 0;
  const errMax = 8;

  const scaleX = (w: number) =>
    padding + ((w - wMin) / (wMax - wMin)) * (svgWidth - 2 * padding);
  const scaleY = (e: number) =>
    svgHeight - padding - ((e - errMin) / (errMax - errMin)) * (svgHeight - 2 * padding);

  // Generate smooth parabola path
  const parabolaPoints = useMemo(() => {
    const pts = [];
    for (let w = wMin; w <= wMax; w += 0.05) {
      const e = computeError(w);
      pts.push(`${scaleX(w)},${scaleY(Math.min(e, errMax))}`);
    }
    return pts.join(' ');
  }, [scaleX, scaleY]);

  // Tangent line at currentW1
  // Line: y - y0 = m * (x - x0)
  const tangentX1 = Math.max(wMin, currentW1 - 0.4);
  const tangentX2 = Math.min(wMax, currentW1 + 0.4);
  const tangentY1 = currentErr + currentGrad * (tangentX1 - currentW1);
  const tangentY2 = currentErr + currentGrad * (tangentX2 - currentW1);

  // Status Indicator
  const isDiverged = Math.abs(currentW1) > 10 || currentErr > 50 || isNaN(currentW1);
  const isConverged = Math.abs(currentW1 - 1.5) < 0.01 && Math.abs(currentGrad) < 0.05;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/30">
              Módulo 2 • Laboratório Interativo
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Didática Prática
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-blue-400" />
            Simulador de Gradiente Descendente (MSE 1D)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Observe visualmente como o peso da inclinação (<code className="text-blue-300 font-mono">w₁</code>)
            desce a curva de erro parabólica em busca do ponto de mínimo analítico (<code className="text-emerald-400 font-mono">w₁* = 1.50</code>).
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isDiverged ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 px-3 py-1.5 text-xs font-semibold text-rose-300 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Divergência / Explosão Numérica!
            </span>
          ) : isConverged ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Convergência Atingida! (Mínimo Global)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 px-3 py-1.5 text-xs font-semibold text-blue-300">
              <Zap className="w-4 h-4 text-blue-400" />
              Otimizando... (Iteração {iteration})
            </span>
          )}
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="mt-6">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-blue-400" />
          Cenários Práticos de Aprendizado:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          <button
            onClick={() => applyPreset('slow')}
            className={`rounded-lg p-2.5 text-xs font-medium text-left transition border ${
              selectedPreset === 'slow'
                ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-semibold text-white">1. Passo Lento (η = 0.03)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Muitos passos, sem risco</div>
          </button>

          <button
            onClick={() => applyPreset('optimal')}
            className={`rounded-lg p-2.5 text-xs font-medium text-left transition border ${
              selectedPreset === 'optimal'
                ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-semibold text-emerald-300">2. Passo Ideal (η = 0.11)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Convergência em ~6 passos</div>
          </button>

          <button
            onClick={() => applyPreset('oscillating')}
            className={`rounded-lg p-2.5 text-xs font-medium text-left transition border ${
              selectedPreset === 'oscillating'
                ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-semibold text-amber-300">3. Ziguezague (η = 0.19)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Oscila de um lado ao outro</div>
          </button>

          <button
            onClick={() => applyPreset('diverging')}
            className={`rounded-lg p-2.5 text-xs font-medium text-left transition border ${
              selectedPreset === 'diverging'
                ? 'bg-rose-600/30 border-rose-500 text-rose-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-semibold text-rose-300">4. Divergência (η = 0.23)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Passos explodem pro infinito</div>
          </button>
        </div>
      </div>

      {/* Controls & Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">Taxa de Aprendizado (Learning Rate η):</span>
            <span className="font-mono text-blue-400 text-sm font-bold">{learningRate.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.25"
            step="0.01"
            value={learningRate}
            onChange={(e) => {
              setLearningRate(parseFloat(e.target.value));
              setSelectedPreset('custom');
            }}
            className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>0.01 (Ultraconservador)</span>
            <span>0.11 (Ideal)</span>
            <span>0.25 (Explosivo)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">Posição Inicial do Peso w₁:</span>
            <span className="font-mono text-emerald-400 text-sm font-bold">{initialW1.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-0.1"
            max="3.0"
            step="0.1"
            value={initialW1}
            disabled={iteration > 0}
            onChange={(e) => setInitialW1(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-40"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>-0.10 (À esquerda)</span>
            <span>1.50 (No alvo ótimo)</span>
            <span>3.00 (À direita)</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          onClick={stepForward}
          disabled={isConverged || isDiverged}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <StepForward className="w-4 h-4" />
          Avançar 1 Passo
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isConverged || isDiverged}
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          {isPlaying ? 'Pausar Simulação' : 'Execução Contínua'}
        </button>

        <button
          onClick={() => resetSimulation()}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition border border-slate-800 ml-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Resetar
        </button>
      </div>

      {/* Visual Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Parabola Cost Function SVG */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>Superfície de Erro MSE: E(w₁)</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              Mínimo Global em <span className="font-mono text-emerald-400 font-bold">w₁ = 1.50</span>
            </span>
          </div>

          <div className="relative w-full overflow-hidden flex items-center justify-center">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto max-h-[300px]"
            >
              {/* Grid Lines */}
              <line
                x1={padding}
                y1={svgHeight - padding}
                x2={svgWidth - padding}
                y2={svgHeight - padding}
                stroke="#334155"
                strokeWidth="1.5"
              />
              <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={svgHeight - padding}
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Axis Labels */}
              <text
                x={svgWidth - padding}
                y={svgHeight - padding + 22}
                fill="#94a3b8"
                fontSize="11"
                textAnchor="end"
                fontFamily="monospace"
              >
                Peso w₁ (Inclinação da Área) →
              </text>
              <text
                x={padding}
                y={padding - 15}
                fill="#94a3b8"
                fontSize="11"
                textAnchor="start"
                fontFamily="monospace"
              >
                ↑ Custo E(w₁) [MSE]
              </text>

              {/* Parabola Curve */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                points={parabolaPoints}
              />

              {/* Optimal Target Minimum Line */}
              <line
                x1={scaleX(1.5)}
                y1={padding}
                x2={scaleX(1.5)}
                y2={svgHeight - padding}
                stroke="#10b981"
                strokeDasharray="4 4"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <text
                x={scaleX(1.5)}
                y={padding + 10}
                fill="#10b981"
                fontSize="10"
                textAnchor="middle"
                fontFamily="monospace"
              >
                w₁* = 1.50
              </text>

              {/* History Breadcrumbs */}
              {history.map((step, idx) => {
                if (idx === history.length - 1) return null;
                const px = scaleX(step.w1);
                const py = scaleY(Math.min(step.error, errMax));
                return (
                  <circle
                    key={idx}
                    cx={px}
                    cy={py}
                    r="3.5"
                    fill="#64748b"
                    opacity="0.6"
                  />
                );
              })}

              {/* Tangent Slope Line at Current Point */}
              {!isDiverged && (
                <line
                  x1={scaleX(tangentX1)}
                  y1={scaleY(Math.min(tangentY1, errMax))}
                  x2={scaleX(tangentX2)}
                  y2={scaleY(Math.min(tangentY2, errMax))}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              )}

              {/* Current Point */}
              {!isDiverged && (
                <g>
                  <circle
                    cx={scaleX(currentW1)}
                    cy={scaleY(Math.min(currentErr, errMax))}
                    r="8"
                    fill="#ef4444"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="drop-shadow-lg"
                  />
                  {/* Step direction arrow indicator */}
                  <line
                    x1={scaleX(currentW1)}
                    y1={scaleY(Math.min(currentErr, errMax))}
                    x2={scaleX(currentW1 - learningRate * currentGrad)}
                    y2={scaleY(Math.min(currentErr, errMax))}
                    stroke="#ef4444"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Curva do Erro E(w₁)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-amber-400 inline-block border-dashed" /> Reta Tangente (dE/dw₁)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Ponto Atual
            </span>
          </div>
        </div>

        {/* Real-Time Fitted Regression Line Plot */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Ajuste da Reta aos Apartamentos
            </h3>
            <span className="text-[11px] font-mono text-blue-300">
              ŷ = {currentW1.toFixed(2)}x + {fixedW0.toFixed(2)}
            </span>
          </div>

          <div className="relative w-full h-[220px] bg-slate-950/70 rounded-lg border border-slate-800/80 p-3 flex items-center justify-center">
            {/* 2D Scatter & Line View */}
            <svg viewBox="0 0 300 200" className="w-full h-full">
              {/* Axes */}
              <line x1="30" y1="170" x2="280" y2="170" stroke="#334155" strokeWidth="1" />
              <line x1="30" y1="20" x2="30" y2="170" stroke="#334155" strokeWidth="1" />
              <text x="280" y="185" fill="#64748b" fontSize="9" textAnchor="end">Área (x)</text>
              <text x="30" y="14" fill="#64748b" fontSize="9">Preço (y)</text>

              {/* Apartment Data Points */}
              {dataPoints.map((pt, i) => {
                const cx = 30 + (pt.x / 4) * 240;
                const cy = 170 - (pt.y / 6) * 140;
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="5" fill="#10b981" />
                    <text x={cx + 8} y={cy - 2} fill="#94a3b8" fontSize="9">
                      ({pt.x}, {pt.y})
                    </text>
                  </g>
                );
              })}

              {/* Current Model Line */}
              {!isDiverged && (
                (() => {
                  const xStart = 0.5;
                  const xEnd = 3.8;
                  const yStart = fixedW0 + currentW1 * xStart;
                  const yEnd = fixedW0 + currentW1 * xEnd;
                  const px1 = 30 + (xStart / 4) * 240;
                  const py1 = 170 - (yStart / 6) * 140;
                  const px2 = 30 + (xEnd / 4) * 240;
                  const py2 = 170 - (yEnd / 6) * 140;
                  return (
                    <line
                      x1={px1}
                      y1={py1}
                      x2={px2}
                      y2={py2}
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                  );
                })()
              )}
            </svg>
          </div>

          <div className="text-[11px] text-slate-400 mt-2 space-y-1">
            <p>
              • Pontos verdes: Amostras reais de imóveis da base.
            </p>
            <p>
              • Linha azul: Reta prevista pelo modelo linear no passo atual.
            </p>
          </div>
        </div>
      </div>

      {/* Telemetry Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Iteração (t)</span>
          <span className="font-mono text-xl font-bold text-white mt-1 block">#{iteration}</span>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Peso Atual w₁</span>
          <span className="font-mono text-xl font-bold text-blue-400 mt-1 block">
            {isDiverged ? '∞' : currentW1.toFixed(4)}
          </span>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Gradiente dE/dw₁</span>
          <span className="font-mono text-xl font-bold text-amber-400 mt-1 block">
            {isDiverged ? 'NaN' : currentGrad.toFixed(4)}
          </span>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Passo Δw₁ = -η ∇E</span>
          <span className="font-mono text-xl font-bold text-purple-400 mt-1 block">
            {isDiverged ? 'NaN' : (-learningRate * currentGrad).toFixed(4)}
          </span>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 col-span-2 md:col-span-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Custo MSE E(w)</span>
          <span className="font-mono text-xl font-bold text-emerald-400 mt-1 block">
            {isDiverged ? 'EXP' : currentErr.toFixed(4)}
          </span>
        </div>
      </div>

      {/* History Telemetry Table */}
      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Histórico das Últimas Iterações [ Iteração | w₀ | w₁ | dE/dw₁ | Passo | Erro MSE ]
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 max-h-56">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase text-[10px] text-slate-400 font-semibold sticky top-0 border-b border-slate-800">
              <tr>
                <th className="px-4 py-2.5">Passo (t)</th>
                <th className="px-4 py-2.5">w₀ (viés)</th>
                <th className="px-4 py-2.5">w₁ (área)</th>
                <th className="px-4 py-2.5">Gradiente ∇E</th>
                <th className="px-4 py-2.5">Ajuste Δw₁</th>
                <th className="px-4 py-2.5">Erro MSE</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {history
                .slice()
                .reverse()
                .map((row) => (
                  <tr key={row.iteration} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-2 font-bold text-slate-400">#{row.iteration}</td>
                    <td className="px-4 py-2 text-slate-400">{row.w0}</td>
                    <td className="px-4 py-2 text-blue-300 font-bold">{row.w1}</td>
                    <td className="px-4 py-2 text-amber-300">{row.gradW1}</td>
                    <td className="px-4 py-2 text-purple-300">{row.step}</td>
                    <td className="px-4 py-2 text-emerald-300">{row.error}</td>
                    <td className="px-4 py-2">
                      {row.status === 'converged' ? (
                        <span className="text-emerald-400 font-sans font-semibold text-[11px]">✓ Convergido</span>
                      ) : row.status === 'diverged' ? (
                        <span className="text-rose-400 font-sans font-semibold text-[11px]">✗ Divergiu</span>
                      ) : (
                        <span className="text-slate-500 font-sans text-[11px]">Iterando</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Didactic Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Callout type="intuition" title="💡 Intuição Visual">
          Pense no Gradiente Descendente como um alpinista vendado descendo uma montanha à noite: ele sente a inclinação
          do solo com os pés (o gradiente <code className="text-amber-300">∇E</code>) e dá um passo na direção de maior
          descida multiplicada pelo tamanho da passada (<code className="text-blue-300">η</code>).
        </Callout>

        <Callout type="trap" title="⚠️ Pegadinha Comum">
          Aumentar a taxa de aprendizado <code className="text-rose-300">η</code> não faz o modelo "aprender mais rápido"
          indefinidamente. Se o passo for maior que a curvatura da tigela, o modelo salta o mínimo e é arremessado
          para o infinito (divergência por explosão numérica).
        </Callout>

        <Callout type="experiment" title="🧪 Experimente Agora">
          1. Selecione o cenário <strong className="text-emerald-300">Passo Ideal (η = 0.11)</strong> e clique em Avançar Passo: note a chegada suave ao mínimo.
          <br />
          2. Em seguida, mude para <strong className="text-rose-300">Divergência (η = 0.23)</strong> e veja os passos se expandirem incontrolavelmente!
        </Callout>
      </div>
    </div>
  );
}

