# Dashboard Financeiro

Um dashboard financeiro completo desenvolvido com Next.js e TypeScript, que permite aos usuários analisar saldos, receitas, despesas, transações pendentes e histórico de transações.

## Funcionalidades

- Página de login com persistência de sessão
- Dashboard protegido por autenticação
- Filtros globais e dinâmicos (data, indústria, estado)
- Cards resumindo receitas, despesas, transações pendentes e saldo total
- Gráficos de barras empilhadas e gráficos de linhas para visualização de transações
- Tabela de histórico de transações
- Sidebar exclusiva para a página do Dashboard com opções de Logout e Home
- Design responsivo e interativo
- Persistência de sessão e filtros sem banco de dados (usando localStorage)

## Tecnologias Utilizadas

- Next.js 14 (App Router)
- TypeScript
- Styled Components para estilização
- Chart.js para visualização de dados
- Shadcn/UI para componentes de UI
- Context API para gerenciamento de estado

## Instalação

1. Clone o repositório:

2. Instale as dependências:
   \`\`\`
   npm install
   \`\`\`

3. Inicie o servidor de desenvolvimento:
   \`\`\`
   npm run dev

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

- `/app` - Rotas e páginas da aplicação (Next.js App Router)
- `/components` - Componentes reutilizáveis
- `/contexts` - Contextos para gerenciamento de estado global
- `/lib` - Funções utilitárias e manipulação de dados

## Uso

1. Acesse a página de login e entre com qualquer email e uma senha com pelo menos 6 caracteres
2. Explore o dashboard financeiro
3. Use os filtros para refinar os dados exibidos
4. Visualize os gráficos e tabelas de transações
5. Utilize a sidebar para navegação

## Observações

- Este projeto utiliza dados simulados para demonstração
- A autenticação é simulada (não há backend real)
- Os filtros e a sessão são persistidos no localStorage do navegador
