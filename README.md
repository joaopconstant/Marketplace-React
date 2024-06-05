# Documentação do Projeto

## Sumário
1. [Introdução](#introdução)
2. [Visão Geral do Projeto](#visão-geral-do-projeto)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Funcionalidades Principais](#funcionalidades-principais)
5. [Requisitos Funcionais](#requisitos-funcionais)
6. [Requisitos Não Funcionais](#requisitos-não-funcionais)
7. [Conclusão](#conclusão)

## Introdução

Este documento apresenta a documentação completa do projeto E-Tech, um Marketplace C2C (Consumer-to-Consumer) de periféricos e eletrônicos. O objetivo desta aplicação é permitir que usuários comprem e vendam produtos eletrônicos de forma fácil e segura. O projeto foi desenvolvido como parte de um trabalho acadêmico, utilizando tecnologias modernas como React e Firebase.

## Visão Geral do Projeto

O E-Tech é uma plataforma online onde usuários podem comprar e vender uma variedade de produtos eletrônicos, como smartphones, laptops, acessórios de computador e muito mais. A plataforma permite que vendedores cadastrem produtos para venda, enquanto os compradores podem explorar a variedade de produtos disponíveis, adicionar itens ao carrinho e finalizar suas compras de forma segura.

## Arquitetura do Projeto

A aplicação segue uma arquitetura cliente-servidor, com o frontend desenvolvido em React e o backend hospedado no Firebase. A integração com Firebase inclui autenticação de usuários, armazenamento de dados em Firestore e armazenamento de arquivos em Storage. A comunicação entre o frontend e o backend é realizada através de requisições HTTP.

## Funcionalidades Principais

1. **Autenticação de Usuário**: A aplicação oferece autenticação de usuário usando Firebase Auth, permitindo que usuários façam login e registrem novas contas.
2. **Listagem de Produtos**: Os usuários podem visualizar uma lista de produtos eletrônicos disponíveis para compra.
3. **Adição de Produtos**: Vendedores podem adicionar novos produtos para venda, incluindo detalhes como nome, descrição, preço e imagem.
4. **Carrinho de Compras**: Os usuários podem adicionar produtos ao carrinho, visualizar os itens selecionados e finalizar suas compras.
5. **Gestão de Perfil**: Os usuários têm a capacidade de editar suas informações de perfil, incluindo nome, email e telefone.

## Requisitos Funcionais

1. Autenticação de usuário (login, registro).
2. Listagem e visualização de produtos disponíveis.
3. Adição de produtos ao carrinho.
4. Finalização de compras.
5. Adição de novos produtos para venda.
6. Edição de informações de perfil.

## Requisitos Não Funcionais

1. **Segurança**: As informações dos usuários devem ser protegidas por meio de autenticação e autorização adequadas.
2. **Desempenho**: A aplicação deve ser responsiva e rápida, com tempos de carregamento mínimos.
3. **Escalabilidade**: O sistema deve ser capaz de lidar com um grande número de usuários e produtos sem comprometer o desempenho.
4. **Usabilidade**: A interface do usuário deve ser intuitiva e fácil de usar, tanto para compradores quanto para vendedores.
5. **Confiabilidade**: A aplicação deve ser estável e confiável, minimizando falhas e erros.

## Conclusão

O E-Tech é uma aplicação web moderna e funcional, desenvolvida para fornecer uma experiência de compra e venda segura e conveniente para os usuários. Utilizando tecnologias como React e Firebase, o projeto demonstra como é possível criar uma plataforma robusta e escalável para o comércio eletrônico.
