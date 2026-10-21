#  Ciência de Dados Sem Medo • Plataforma Educacional Interativa


Uma aplicação web educacional e imersiva voltada para o aprendizado prático e profundo de **Ciência de Dados**, **Álgebra Linear Matricial**, **Métodos Estatísticos Computacionais**, **Modelos Lineares** e **Modelos Não-Lineares**.

Inspirada na metodologia consagrada do repositório **"MIPS Sem Medo"**, a plataforma parte do princípio de que a teoria matemática ganha vida quando o estudante pode **manipular os parâmetros em tempo real**, enxergar **analogias intuitivas do mundo real** e inspecionar a **telemetria numérica passo a passo**.

---

##  Metodologia Pedagógica: O Tripé "Sem Medo"

Cada conceito complexo é estruturado rigorosamente em três camadas complementares:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TRIPÉ DIDÁTICO SEM MEDO                         │
├────────────────────┬────────────────────┬──────────────────────────────┤
│  1. INTUIÇÃO      │  2. MATEMÁTICA    │  3. SIMULADORES              │
│    VISUAL          │    RIGOROSA        │    INTERATIVOS               │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Analogias do mundo │ Deduções passo a   │ Laboratórios práticos        │
│ real (apartamentos,│ passo: produto     │ reativos com sliders,        │
│ velas num quarto   │ escalar, Equação   │ gráficos SVG/Canvas em       │
│ escuro, alpinista  │ Normal e Matriz    │ tempo real e telemetria      │
│ vendado na colina) │ Hessiana.          │ numérica de cada iteração.   │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

---

##  Arquitetura de Pastas do Repositório

```text
data-science/
├── docs/                                    # Acervo de livros e manuais em PDF
│   ├── Manual Completo_ Modelos Lineares em Ciência de Dados.pdf
│   ├── Manual Completo_ Modelos Não-Lineares em Ciência de Dados.pdf
│   ├── Gilbert_Strang_Linear_Algebra_and_Its_Applicatio_230928_225121.pdf
│   ├── Probalidade-e-Estatistica-para-Engenharia-e-Ciencias-Devore.pdf
│   └── Data Science do zero Primeiras regras com o Python (Joel Grus).pdf
├── code/                                    # Scripts e protótipos em Python puro
│   ├── linear-model/
│   ├── no-linear-model/
│   └── README.md
├── src/
│   ├── app/                                 # Estrutura de rotas (Next.js App Router)
│   │   ├── globals.css                      # Regras globais de estilo e scrollbars
│   │   ├── layout.tsx                       # Layout base com Sidebar e Navbar
│   │   ├── page.tsx                         # Dashboard inicial da disciplina
│   │   └── modulos/
│   │       ├── fundamentos-vetoriais/page.tsx   # Módulo 1: Vetores e Projeção
│   │       ├── modelos-lineares/page.tsx        # Módulo 2: Teoria + Simulador MSE
│   │       ├── metodos-estatisticos/page.tsx    # Módulo 3: Normal e Bootstrap
│   │       ├── modelos-nao-lineares/page.tsx    # Módulo 4: Sigmoide e Hessiana
│   │       └── biblioteca/page.tsx              # Módulo 5: Acervo de PDFs
│   ├── components/
│   │   ├── layout/                          # Componentes de navegação global
│   │   │   ├── Sidebar.tsx                  # Barra lateral com busca e badges
│   │   │   └── Navbar.tsx                   # Breadcrumbs e cabeçalho dinâmico
│   │   ├── simulators/                      # Simuladores visuais interativos
│   │   │   └── GradientDescentSimulator.tsx # Simulador MSE 1D/2D com telemetria
│   │   └── ui/                              # Primitivas reutilizáveis
│   │       ├── Callout.tsx                  # Caixas didáticas (Intuição, Pegadinha, Teste)
│   │       └── MathView.tsx                 # Renderizador seguro KaTeX
│   └── types/
│       └── index.ts                         # Interfaces TypeScript (Passos, Telemetria)
├── .gitignore                               # Regras completas de exclusão Git
├── package.json                             # Dependências e scripts do projeto
├── tsconfig.json                            # Configurações TypeScript e aliases (@/*)
├── tailwind.config.ts                       # Configuração de temas e cores
├── postcss.config.mjs                       # Plugins PostCSS
├── next.config.mjs                          # Configuração Next.js
└── README.md                                # Documentação principal
```

---

##  Como Instalar e Executar Localmente

### Pré-requisitos
- **Node.js:** Versão 18.17 ou superior instalada.
- **npm** (ou **pnpm** / **yarn**).

### Passo a Passo

```bash
# 1. Clone o repositório (caso ainda não o tenha feito)
git clone https://github.com/quezinhacosta/data-science.git
cd data-science

# 2. Instale as dependências do projeto
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

