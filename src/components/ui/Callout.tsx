import React from 'react';
import { Lightbulb, AlertTriangle, FlaskConical, Info } from 'lucide-react';

interface CalloutProps {
  type: 'intuition' | 'trap' | 'experiment' | 'info';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const configs = {
    intuition: {
      border: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
      icon: Lightbulb,
      iconColor: 'text-amber-400',
      defaultTitle: '💡 Intuição Visual',
    },
    trap: {
      border: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
      icon: AlertTriangle,
      iconColor: 'text-rose-400',
      defaultTitle: '⚠️ Pegadinha Comum',
    },
    experiment: {
      border: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
      icon: FlaskConical,
      iconColor: 'text-emerald-400',
      defaultTitle: '🧪 Experimente no Simulador',
    },
    info: {
      border: 'border-blue-500/40 bg-blue-500/10 text-blue-200',
      icon: Info,
      iconColor: 'text-blue-400',
      defaultTitle: '📘 Nota Teórica',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`my-4 rounded-xl border p-4 shadow-sm backdrop-blur-sm ${config.border}`}>
      <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
        <Icon className={`w-4 h-4 ${config.iconColor}`} />
        <span>{title || config.defaultTitle}</span>
      </div>
      <div className="text-sm leading-relaxed text-slate-300 space-y-1">
        {children}
      </div>
    </div>
  );
}

