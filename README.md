# ContasApp - Gerenciador de Contas a Pagar

## Sobre o Projeto
Manter o controle de contas a pagar, sejam elas pessoais ou de um pequeno negócio, pode ser um desafio. Planilhas se tornam complexas e aplicativos existentes podem ser caros ou complicados demais.

O **ContasApp** foi desenvolvido para resolver este problema, oferecendo um sistema web completo, intuitivo e com um design moderno para o gerenciamento de finanças. A aplicação permite cadastrar, visualizar, editar e deletar contas e fornecedores, com uma interface amigável que facilita a visualização do que é mais importante.

Este projeto foi construído do zero, abrangendo desde a criação da API REST no backend até a implementação de uma interface.

---

## ✨ Funcionalidades Principais
- **Gerenciamento Completo (CRUD):** Funcionalidade completa de Criar, Ler, Atualizar e Deletar para Contas a Pagar e Fornecedores.  
- **Filtragem Dinâmica:** A lista de contas pode ser filtrada instantaneamente por status (Pagas, Pendentes, Vencidas) e também por Categoria e Fornecedor, através de dropdowns que são populados dinamicamente pela API.  
- **Status Inteligentes:** O sistema atualiza automaticamente o status de contas **PENDENTES** para **VENCIDAS** com base na data atual, garantindo que a informação esteja sempre correta.  
- **Interface Moderna e Responsiva:** Design limpo e agradável, com uma navegação lateral fixa, layout em cards e total foco na experiência do usuário.  
- **Validação e Máscaras:** Formulários com validação em tempo real e máscaras inteligentes para campos como CPF/CNPJ, telefone e valores monetários, garantindo a integridade dos dados e facilitando o preenchimento.  
- **Feedback ao Usuário:** Notificações de sucesso e erro para todas as ações importantes (salvar, editar, deletar).  
- **Visualização de Detalhes:** Capacidade de visualizar todas as informações de uma conta ou fornecedor em uma página de detalhes dedicada.  

---

## 🔧 Tecnologias Utilizadas

### Backend
- **Plataforma:** Node.js  
- **Framework:** Express.js  
- **Linguagem:** TypeScript  
- **ORM:** Prisma  
- **Banco de Dados:** PostgreSQL (rodando em um contêiner Docker)  
- **Validação:** Zod  

### Frontend
- **Framework:** Angular 18+  
- **Linguagem:** TypeScript  
- **Estilização:** CSS puro com variáveis  
- **Componentes:** Arquitetura 100% baseada em Componentes Standalone  
- **Bibliotecas:** Ngx-Mask para máscaras de input  

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)  
- Docker Desktop  
- Yarn (ou npm)  

### 1. Clone o repositório
```bash
git clone https://github.com/MilioranzaJ/controle-contas-a-pagar.git
cd controle-contas-a-pagar
````

### 2. Backend

```bash
# Navegue até a pasta do backend
cd backend

# Suba o contêiner do banco de dados com Docker
docker-compose up -d

# Instale as dependências
yarn install

# Rode as migrações do Prisma para criar as tabelas
npx prisma migrate dev

# Inicie o servidor do backend
yarn dev
# O servidor estará rodando em http://localhost:3333
```

### 3. Frontend

```bash
# Em um novo terminal, navegue até a pasta do frontend
cd frontend

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento do Angular
ng serve
# A aplicação estará disponível em http://localhost:4200
```

---

## 🔮 Próximos Passos e Melhorias Futuras

* [ ] **Dashboard com Gráficos:** Implementar a tela de Dashboard com os totalizadores e gráficos para uma análise visual dos dados.
* [ ] **Autenticação de Usuários:** Adicionar um sistema de login/senha com JWT para que múltiplos usuários possam ter suas próprias contas.
* [ ] **Upload de Anexos:** Permitir o upload de notas fiscais ou comprovantes para cada conta.
* [ ] **Relatórios em PDF:** Gerar relatórios mensais consolidados.
* [ ] **Testes Unitários e de Integração:** Aumentar a cobertura de testes do projeto.

---

## 🙌 Agradecimentos

Obrigado por visitar o projeto!

