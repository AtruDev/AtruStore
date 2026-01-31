truStore - E-commerce de Periféricos Gamer
O AtruStore é uma Single Page Application (SPA) de e-commerce desenvolvida com React, focada em alta performance e interface responsiva. O projeto foi estruturado para demonstrar conceitos avançados de desenvolvimento front-end, como gestão de estado global, roteamento dinâmico e persistência de dados.

Tecnologias e Ferramentas
React + Vite: Ambiente de desenvolvimento otimizado com suporte a Fast Refresh.

Tailwind CSS: Framework utilitário para estilização baseada em tokens, com foco em design responsivo e performance.

React Router: Gestão de rotas dinâmicas para navegação sem recarregamento de página.

Context API: Gestão de estado global para o carrinho de compras, evitando o problema de prop drilling.

Lucide React: Conjunto de ícones vetoriais leves e customizáveis.

Sonner: Sistema de notificações (toasts) para feedback imediato das ações do utilizador.

Arquitetura e Decisões Técnicas
Estado Global e Persistência: A lógica do carrinho está centralizada no CartContext, que sincroniza automaticamente os dados com o LocalStorage. Isto garante que os itens do utilizador não sejam perdidos após a atualização da página ou encerramento da sessão.

Roteamento Dinâmico: Utilização de parâmetros de URL (/product/:id) para renderizar componentes de detalhe de forma dinâmica a partir de um único ponto de entrada.

Componentização: Divisão rigorosa entre componentes de UI reutilizáveis (components/) e páginas de contexto (pages/).

Mock de Dados: Centralização da base de dados de produtos em um módulo JavaScript independente para facilitar a transição futura para uma API REST ou GraphQL.

Funcionalidades Implementadas
Catálogo de produtos com filtragem dinâmica por categoria.

Página de detalhes individualizada para cada produto.

Carrinho de compras lateral com atualização de quantidades em tempo real.

Cálculo automático de subtotais e valor total da compra.

Feedback visual de sucesso ao adicionar ou remover itens.

Estrutura do Repositório
Plaintext
src/
 ├── components/     # UI de uso geral (Navbar, Cards, Sidebar)
 ├── context/        # Lógica de Estado Global (CartContext)
 ├── data/           # Estruturas de dados e mock de produtos
 ├── pages/          # Componentes de página (Home, ProductDetails)
 ├── public/         # Ativos estáticos e imagens dos produtos
 ├── App.jsx         # Definição de rotas e Providers
 └── main.jsx        # Ponto de entrada da aplicação
Configuração do Ambiente de Desenvolvimento
Clonar o repositório:

Bash
git clone https://github.com/AtruDev/AtruStore.git
Instalar as dependências:

Bash
npm install
Executar em modo de desenvolvimento:

Bash
npm run dev
Roadmap de Desenvolvimento
Integração com gateway de pagamentos.

Sistema de autenticação de utilizadores (Firebase/Supabase).

Implementação de testes unitários e de integração com Vitest/Cypress.

Otimização de SEO e acessibilidade (Aria-labels).

Desenvolvido por AtruDev no âmbito de estudos em Engenharia de Computação.