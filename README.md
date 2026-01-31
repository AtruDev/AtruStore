AtruStore

O AtruStore é uma plataforma de e-commerce focada em periféricos de alta performance. Desenvolvido com uma arquitetura moderna em React, o projeto prioriza a experiência do utilizador, oferecendo uma navegação rápida, transições suaves e um gerenciamento de estado eficiente.

🚀 Tecnologias Utilizadas
A stack tecnológica foi selecionada para garantir performance e escalabilidade:

React + Vite: Para um ambiente de desenvolvimento ultra-rápido e build otimizado.

Tailwind CSS: Estilização utilitária para um design responsivo e efeitos de glassmorphism.

React Router: Gerenciamento de rotas SPA para navegação sem recarregamento de página.

Context API: Gestão de estado global do carrinho de compras.

Lucide React: Ícones vetoriais modernos e leves.

Sonner: Sistema de notificações dinâmicas para feedback de ações.

✨ Funcionalidades
Catálogo Interativo: Listagem dinâmica com filtros por categoria em tempo real.

Página de Detalhes: Roteamento dinâmico (/product/:id) para exibição técnica individualizada.

Carrinho de Compras: Gestão completa de itens com persistência automática via LocalStorage.

Cálculo em Tempo Real: Atualização instantânea de valores totais e quantidades.

Design Responsivo: Interface totalmente adaptada para dispositivos móveis e desktops.

📂 Estrutura de Pastas
src/
 ├── components/     # Componentes de UI (Navbar, Hero, ProductCard)
 ├── context/        # Lógica de Estado Global (CartContext)
 ├── data/           # Base de dados mockada (products.js)
 ├── pages/          # Telas principais (Home, ProductDetails)
 ├── public/         # Ativos estáticos e imagens
 ├── App.jsx         # Configuração de rotas e Providers
 └── main.jsx        # Ponto de entrada do sistema

🛠️ Como Executar o Projeto
Clonar o repositório:

Bash
git clone https://github.com/AtruDev/AtruStore.git
Instalar as dependências:

Bash
npm install
Iniciar o servidor de desenvolvimento:

Bash
npm run dev

Desenvolvido por AtruDev | Projeto focado em performance e design.
