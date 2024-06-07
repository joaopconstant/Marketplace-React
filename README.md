# Documentação do Projeto E-Tech

## Sumário
1. [Introdução](#introdução)
2. [Visão Geral do Projeto](#visão-geral-do-projeto)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Funcionalidades Principais](#funcionalidades-principais)
5. [Fluxo de Usuário](#fluxo-de-usuário)
6. [Tecnologias Utilizadas](#tecnologias-utilizadas)
7. [Requisitos Funcionais](#requisitos-funcionais)
8. [Requisitos Não Funcionais](#requisitos-não-funcionais)
9. [Configuração e Implantação](#configuração-e-implantação)
10. [Estrutura de Dados](#estrutura-de-dados)
11. [Considerações de Segurança](#considerações-de-segurança)
12. [Conclusão](#conclusão)

## Introdução

O projeto E-Tech é um Marketplace C2C (Consumer-to-Consumer) especializado em periféricos e eletrônicos. Desenvolvido como parte de um trabalho acadêmico, o objetivo principal do E-Tech é proporcionar uma plataforma segura, eficiente e intuitiva para que usuários possam comprar e vender produtos eletrônicos. Este documento fornece uma visão detalhada do projeto, incluindo sua arquitetura, funcionalidades, requisitos, tecnologias utilizadas e instruções para configuração e implantação.

## Visão Geral do Projeto

O E-Tech permite que usuários registrem suas contas, façam login, adicionem produtos para venda, naveguem por uma vasta gama de produtos eletrônicos, adicionem itens ao carrinho e finalizem suas compras. A plataforma é projetada para ser user-friendly, segura e escalável, garantindo uma experiência agradável tanto para compradores quanto para vendedores.

### Objetivos do Projeto

1. **Facilitar a compra e venda de produtos eletrônicos entre usuários.**
2. **Prover uma plataforma segura para transações online.**
3. **Oferecer uma interface intuitiva e amigável para usuários de todos os níveis técnicos.**

## Arquitetura do Projeto

A arquitetura do E-Tech segue o modelo cliente-servidor, utilizando o React para o desenvolvimento do frontend e o Firebase para o backend, incluindo autenticação, Firestore para banco de dados e Firebase Storage para armazenamento de arquivos.

### Diagrama de Arquitetura

```
Frontend (React)
    |
    v
Backend (Firebase)
    |
    v
    - Firestore (Database)
    - Firebase Auth (Authentication)
    - Firebase Storage (File Storage)
```

## Funcionalidades Principais

1. **Autenticação de Usuário**: 
   - Registro de novos usuários.
   - Login de usuários existentes.
   - Logout seguro.

2. **Listagem de Produtos**: 
   - Exibição de uma lista de produtos disponíveis.
   - Detalhamento de cada produto, incluindo imagem, descrição, preço e informações do vendedor.

3. **Adição de Produtos**: 
   - Vendedores podem adicionar novos produtos, fornecendo nome, descrição, preço e imagem do produto.

4. **Carrinho de Compras**: 
   - Usuários podem adicionar produtos ao carrinho.
   - Visualização do carrinho com todos os itens adicionados.
   - Remoção de itens do carrinho.
   - Finalização da compra.

5. **Gestão de Perfil**: 
   - Edição de informações de perfil do usuário, como nome, email e telefone.

## Fluxo de Usuário

### Registro e Login

1. **Registro**: O usuário se registra fornecendo um email e uma senha.
2. **Login**: O usuário faz login com suas credenciais.

### Navegação e Compra

1. **Listagem de Produtos**: O usuário navega pela lista de produtos disponíveis.
2. **Detalhamento do Produto**: O usuário visualiza os detalhes de um produto específico.
3. **Adição ao Carrinho**: O usuário adiciona o produto ao carrinho.
4. **Finalização da Compra**: O usuário visualiza o carrinho e finaliza a compra.

### Venda de Produtos

1. **Adição de Produto**: O vendedor adiciona um novo produto com nome, descrição, preço e imagem.
2. **Gestão de Produtos**: O vendedor pode editar ou deletar produtos adicionados.

## Tecnologias Utilizadas

1. **React**: Biblioteca JavaScript para construção de interfaces de usuário.
2. **Firebase**: Plataforma de desenvolvimento de aplicativos móveis e web que inclui:
   - **Firebase Auth**: Autenticação de usuários.
   - **Firestore**: Banco de dados NoSQL em tempo real.
   - **Firebase Storage**: Armazenamento de arquivos.

## Requisitos Funcionais

1. **Autenticação de Usuário**:
   - Registro de novos usuários.
   - Login de usuários existentes.
   - Logout seguro.

2. **Gerenciamento de Produtos**:
   - Adição de novos produtos.
   - Edição de produtos existentes.
   - Exclusão de produtos.

3. **Navegação e Compra**:
   - Visualização de produtos.
   - Adição de produtos ao carrinho.
   - Remoção de produtos do carrinho.
   - Finalização da compra.

4. **Gestão de Perfil**:
   - Atualização de informações de perfil.

## Requisitos Não Funcionais

1. **Segurança**:
   - Proteção das informações dos usuários através de autenticação e autorização adequadas.
   - Uso de conexões seguras (HTTPS).

2. **Desempenho**:
   - A aplicação deve ser responsiva e rápida.
   - Tempo de carregamento mínimo.

3. **Escalabilidade**:
   - Capacidade de lidar com um grande número de usuários e produtos.
   - Arquitetura escalável.

4. **Usabilidade**:
   - Interface intuitiva e amigável.
   - Facilidade de uso para usuários de todos os níveis técnicos.

5. **Confiabilidade**:
   - Estabilidade e minimização de falhas.
   - Manutenção de integridade de dados.

## Configuração e Implantação

### Pré-requisitos

- Node.js e npm instalados.
- Conta no Firebase.

### Passos para Configuração

1. **Clonar o Repositório**:
   ```bash
   git clone <url-do-repositório>
   cd e-tech
   ```

2. **Instalar Dependências**:
   ```bash
   npm install
   ```

3. **Configurar Firebase**:
   - Criar um projeto no Firebase.
   - Configurar Auth, Firestore e Storage no Firebase.
   - Obter as credenciais de configuração do Firebase e adicioná-las no arquivo `firebase.js`.

4. **Iniciar o Servidor de Desenvolvimento**:
   ```bash
   npm start
   ```

## Estrutura de Dados

### Coleção de Produtos (`products`)

- `id` (string): Identificador único do produto.
- `name` (string): Nome do produto.
- `description` (string): Descrição do produto.
- `price` (number): Preço do produto.
- `imageUrl` (string): URL da imagem do produto.
- `userId` (string): ID do usuário que adicionou o produto.

### Coleção de Usuários (`users`)

- `id` (string): Identificador único do usuário.
- `name` (string): Nome do usuário.
- `email` (string): Email do usuário.
- `phone` (string): Telefone do usuário.

### Coleção de Carrinhos (`carts`)

- `id` (string): Identificador único do carrinho (igual ao ID do usuário).
- `items` (array): Lista de itens no carrinho.

## Considerações de Segurança

- **Autenticação e Autorização**: Utilização do Firebase Auth para garantir que apenas usuários autenticados possam acessar determinadas funcionalidades.
- **Regras de Segurança do Firestore**:
  - Restringir acesso de leitura e escrita com base no status de autenticação do usuário.
- **Proteção de Dados**: Garantia de que todas as comunicações entre o frontend e o backend sejam feitas via HTTPS para proteger dados sensíveis.

## Conclusão

O projeto E-Tech oferece uma plataforma robusta e intuitiva para a compra e venda de produtos eletrônicos entre consumidores. Com uma arquitetura moderna e escalável, baseada em React e Firebase, o E-Tech garante uma experiência de usuário eficiente e segura. Este documento servirá como uma referência abrangente para entender a implementação, configuração e funcionalidades do projeto, bem como os requisitos técnicos e de segurança necessários para sua operação.
