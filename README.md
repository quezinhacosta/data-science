# 🌌 Ciência de Dados Sem Medo • Plataforma Educacional Interativa

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-LaTeX_Math-00d084?style=for-the-badge&logo=latex)](https://katex.org/)
[![EdTech](https://img.shields.io/badge/Didática-MIPS_Sem_Medo-amber?style=for-the-badge&logo=gitbook)](https://github.com/)

Uma aplicação web educacional e imersiva voltada para o aprendizado prático e profundo de **Ciência de Dados**, **Álgebra Linear Matricial**, **Métodos Estatísticos Computacionais**, **Modelos Lineares** e **Modelos Não-Lineares**.

Inspirada na metodologia consagrada do repositório **"MIPS Sem Medo"**, a plataforma parte do princípio de que a teoria matemática ganha vida quando o estudante pode **manipular os parâmetros em tempo real**, enxergar **analogias intuitivas do mundo real** e inspecionar a **telemetria numérica passo a passo**.

---

## 🧭 Metodologia Pedagógica: O Tripé "Sem Medo"

Cada conceito complexo é estruturado rigorosamente em três camadas complementares:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TRIPÉ DIDÁTICO SEM MEDO                         │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ 💡 1. INTUIÇÃO      │ 📐 2. MATEMÁTICA   │ 🎮 3. SIMULADORES            │
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

## 📚 Trilha de Conteúdo & Módulos

### 🔷 Módulo 1: Fundamentos Vetoriais & Métricos
- **Álgebra Matricial:** Representação de observações e atributos no espaço $\mathbb{R}^D$.
- **Produto Escalar como Ponderador:** A predição linear como soma ponderada $\hat{y}_i = x_i^T w = \sum_{j=1}^D x_{ij} w_j$.
- **Projeção Ortogonal de Mínimos Quadrados:** Como a menor distância entre o vetor de gabaritos $y$ e o subespaço das colunas $\text{Col}(X)$ ocorre quando o vetor de resíduos $e = y - \hat{y}$ é estritamente ortogonal ao plano ($X^T e = 0$).

---

### 🔷 Módulo 2: Modelos Lineares & Soluções (Destaque Interativo)
- **Da Reta ao Big Data:** Transição de sistemas determinados ($N = D$, solução analítica via Gauss-Jordan) para sistemas sobredeterminados do mundo real ($N \gg D$).
- **Por que o Erro Médio Quadrático (MSE)?** Positividade, penalização desproporcional de erros aberrantes e diferenciabilidade contínua.
- **Dedução da Equação Normal:**
  $$E(w) = \frac{1}{N} \|Xw - y\|_2^2 \implies \nabla E(w) = \frac{2}{N} \left[ X^T X \hat{w} - X^T y \right] = 0 \implies \hat{w} = (X^T X)^{-1} X^T y$$
- **O Limite de $O(D^3)$ e o Gradiente Descendente:** Por que matrizes gigantescas exigem descida iterativa de gradiente:
  $$w^{(t+1)} = w^{(t)} - \eta \cdot \nabla E(w)$$
- **Normalização de Atributos:** Como o escalonamento previne vales achatados e o ziguezague patológico do gradiente.
- **Generalização & Regularização:** Prevenção de *overfitting* via penalidades Ridge ($L_2$) e Lasso ($L_1$).
- 🎮 **Simulador Interativo 1D/2D:** Ajuste a Taxa de Aprendizado ($\eta$), alterne entre cenários de convergência lenta, ideal, oscilação e explosão numérica, e acompanhe o ajuste da reta sobre os dados imobiliários em tempo real.

---

### 🔷 Módulo 3: Métodos Estatísticos & Incerteza
- **Distribuição Normal & Z-Score:** Padronização $Z = \frac{X - \mu}{\sigma}$ e interpretação da densidade de probabilidade.
- **Teorema Central do Limite (TCL):** Como a distribuição das médias amostrais converge para a normal, independentemente da distribuição populacional de origem.
- **Intervalos de Confiança:** Quantificação da incerteza e interpretação correta dos níveis $95\%$ e $99\%$.
- **Reamostragem com Bootstrap:** Sorteio com reposição ($B = 1000$ réplicas) para calcular erros-padrão sem hipóteses distributivas rígidas.

---

### 🔷 Módulo 4: Modelos Não-Lineares & Otimização
- **Onde a Reta Fracassa:** Limites físicos, saturação e a exigência do espaço probabilístico restrito a $[0, 1]$.
- **Analogia da Iluminação do Quarto:** A primeira vela acesa gera um impacto colossal; a 101ª vela mal altera a percepção visual (rendimentos marginais decrescentes).
- **A Função Sigmoide $\sigma(z)$:** Expressão analítica e o truque elegante de sua derivada fechada:
  $$\sigma(z) = \frac{1}{1 + e^{-z}} \implies \frac{d\sigma(z)}{dz} = \sigma(z) \cdot [1 - \sigma(z)]$$
- **Distribuição de Bernoulli & Log-Likelihood:** Por que o MSE gera mínimos locais na classificação e a dedução da **Entropia Cruzada Binária (BCE)**:
  $$E(w) = -\sum_{i=1}^N \left\{ y_i \ln(p_i) + (1 - y_i) \ln(1 - p_i) \right\}$$
- **A Simetria do Gradiente:** A conexão entre regressão linear ($\frac{2}{N}X^T(\hat{y}-y)$) e não-linear:
  $$\nabla E(w) = X^T(p - y)$$
- **A Matriz Hessiana (Curvatura Local):**
  $$H = \nabla^2 E(w) = X^T P X, \quad \text{onde } P = \text{diag}\left[ p_i (1 - p_i) \right]$$
- **Gradiente Descendente vs. Newton-Raphson:** Comparação entre passos de 1ª ordem ($-\eta \nabla E$) e saltos ajustados pela curvatura de 2ª ordem ($-H^{-1} \nabla E$).

---

### 🔷 Módulo 5: Biblioteca & Acervo de Estudos
Acesso aos materiais de apoio completos e fichamentos das obras localizadas na pasta [`docs/`](docs/):
- 📄 **Manual Completo: Modelos Lineares em Ciência de Dados** *(Apostila Autoral)*
- 📄 **Manual Completo: Modelos Não-Lineares em Ciência de Dados** *(Apostila Autoral)*
- 📘 **Linear Algebra and Its Applications** — *Gilbert Strang*
- 📗 **Probabilidade e Estatística para Engenharia e Ciências** — *Jay L. Devore*
- 📙 **Data Science do Zero: Primeiras Regras com o Python** — *Joel Grus*

---

## ⚖️ Síntese Comparativa: Linear vs. Não-Linear

| Critério | Modelo Linear (Regressão Linear) | Modelo Não-Linear (Regressão Logística) |
| :--- | :--- | :--- |
| **Espaço de Saída ($y$)** | Contínuo e irrestrito: $(-\infty, +\infty)$ | Probabilidade estritamente limitada: $[0, 1]$ |
| **Função Hipótese** | $\hat{y} = Xw$ | $p = \sigma(Xw) = \frac{1}{1 + e^{-Xw}}$ |
| **Função de Custo** | Erro Médio Quadrático (MSE) | Entropia Cruzada Binária (Log-Loss / BCE) |
| **Solução Analítica Direta** | Existe: Equação Normal $\hat{w} = (X^T X)^{-1} X^T y$ | Não existe forma fechada direta |
| **Gradiente $\nabla E(w)$** | $\frac{2}{N} X^T (Xw - y)$ | $X^T (\sigma(Xw) - y) = X^T (p - y)$ |
| **Matriz Hessiana $H$** | $H = \frac{2}{N} X^T X$ (Constante no espaço todo) | $H = X^T P X$ (Varia dinamicamente com o peso $w$) |
| **Sensibilidade** | Inclinação constante da reta de ponta a ponta | Alta sensibilidade no limiar $z=0$, saturação nas caudas |
| **Métodos de Otimização** | Equação Normal, Gradiente Descendente | Gradiente Descendente, Newton-Raphson (IRLS) |

---

## 🛠️ Stack Tecnológica

- **Framework Web:** [Next.js 14](https://nextjs.org/) (App Router com Server & Client Components)
- **Linguagem:** [TypeScript 5.5](https://www.typescriptlang.org/) (tipagem estática rigorosa)
- **Estilização & Design System:** [Tailwind CSS 3.4](https://tailwindcss.com/) com paleta técnica dark/slate
- **Renderização Matemática:** [KaTeX](https://katex.org/) para equações e derivadas em notação LaTeX elegante
- **Ícones da Interface:** [Lucide React](https://lucide.dev/)
- **Visualização Gráfica:** Vetores dinâmicos em SVG responsivo e HTML5 Canvas

---

## 📂 Arquitetura de Pastas do Repositório

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

## 🏃 Como Instalar e Executar Localmente

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

Abra seu navegador em [http://localhost:3000](http://localhost:3000) para explorar a plataforma interativa.

### Scripts Disponíveis no `package.json`

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com hot-reload |
| `npm run build` | Compila a aplicação otimizada para produção |
| `npm run start` | Executa o servidor compilado de produção |
| `npm run lint` | Executa a verificação estática de código com ESLint |

---

## 💡 Caixas Didáticas Padronizadas

Em toda a plataforma, os conceitos são acompanhados pelas caixas de destaque didáticas:

- 💡 **Intuição Visual:** Explicações conceituais com analogias do cotidiano, livres de jargões herméticos.
- ⚠️ **Pegadinha Comum:** Alertas sobre armadilhas recorrentes (ex.: anulação de erros sem elevar ao quadrado, não invertibilidade quando $N < D$, passos excessivos que causam divergência).
- 🧪 **Experimente no Simulador:** Instruções práticas orientando qual parâmetro alterar para testemunhar o fenômeno matemático em tempo real.

---

## 📄 Licença & Créditos

Projeto desenvolvido para fins educacionais e acadêmicos na área de Ciência de Dados e Inteligência Artificial.

- **Concepção & Autoria:** Quezia Costa ([@quezinhacosta](https://github.com/quezinhacosta))
- **Inspiração Didática:** Projeto *"MIPS Sem Medo"*
