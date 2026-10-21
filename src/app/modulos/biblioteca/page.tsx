import React from 'react';
import { BookOpen, FileText, Download, ExternalLink, Library } from 'lucide-react';
import Link from 'next/link';

export default function LibraryPage() {
  const books = [
    {
      title: 'Manual Completo: Modelos Lineares em Ciência de Dados',
      category: 'Apostila Autoral da Disciplina',
      description:
        'Da equação da reta ao formalismo matricial, projeção ortogonal de mínimos quadrados, Equação Normal e convergência do Gradiente Descendente.',
      file: 'Manual Completo_ Modelos Lineares em Ciência de Dados.pdf',
      badge: 'Essencial',
    },
    {
      title: 'Manual Completo: Modelos Não-Lineares em Ciência de Dados',
      category: 'Apostila Autoral da Disciplina',
      description:
        'Saturação física, função Sigmoide, Log-Likelihood de Bernoulli, Matriz Hessiana e otimização por Newton-Raphson vs. Gradiente.',
      file: 'Manual Completo_ Modelos Não-Lineares em Ciência de Dados.pdf',
      badge: 'Essencial',
    },
    {
      title: 'Linear Algebra and Its Applications',
      author: 'Gilbert Strang',
      category: 'Álgebra Linear Matricial',
      description:
        'A obra de referência mundial sobre os quatro subespaços fundamentais, projeções ortogonais e decomposição em autovalores.',
      file: 'Gilbert_Strang_Linear_Algebra_and_Its_Applicatio_230928_225121.pdf',
      badge: 'Referência',
    },
    {
      title: 'Probabilidade e Estatística para Engenharia e Ciências',
      author: 'Jay L. Devore',
      category: 'Probabilidade & Estatística',
      description:
        'Distribuições Normal, Z-score, Teorema Central do Limite, testes de hipóteses e intervalos de confiança.',
      file: 'Probalidade-e-Estatistica-para-Engenharia-e-Ciencias-Devore.pdf',
      badge: 'Referência',
    },
    {
      title: 'Data Science do Zero: Primeiras Regras com o Python',
      author: 'Joel Grus',
      category: 'Algoritmos em Python Puro',
      description:
        'Construção de algoritmos de Machine Learning sem depender de bibliotecas prontas como scikit-learn.',
      file: 'Data Science do zero Primeiras regras com o Python (Joel Grus).pdf',
      badge: 'Prático',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <span>Módulo 5 • Biblioteca & Acervo</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Library className="w-8 h-8 text-blue-400" />
          Acervo Bibliográfico & Materiais de Apoio
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Documentos, livros-texto e resumos teóricos armazenados diretamente na pasta <code className="text-blue-300 font-mono">docs/</code> do projeto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {books.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {item.category}
                </span>
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {item.title}
              </h3>
              {item.author && (
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  Autor: {item.author}
                </p>
              )}
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-500 truncate max-w-[220px]">
                docs/{item.file}
              </span>
              <span className="inline-flex items-center gap-1.5 text-blue-400 font-medium hover:text-blue-300">
                <FileText className="w-3.5 h-3.5" />
                <span>Disponível em docs/</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

