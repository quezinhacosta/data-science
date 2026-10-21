import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Ciência de Dados Sem Medo • Plataforma Educacional Interativa',
  description:
    'Aprenda Modelos Lineares, Não-Lineares, Álgebra Matricial e Otimização com simuladores interativos e rigor didático.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

