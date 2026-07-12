# Change Log

## [0.0.4]

### Adicionado
- 🧩 **MVC Universal**: Repository → Service → Controller gerados automaticamente para todos os frameworks
- 🔐 **Auth esqueleto**: JWT utils, middleware de autenticação e validação com Zod (TS/JS)
- 📁 **Pastas extras por framework**: schemas/, types/, exceptions/ (TS/JS) — DTOs/, Exceptions/, Interfaces/ (C#) — dtos/, exceptions/ (Spring)
- ✨ **Métodos padrão**: create, findById, findByEmail, findByUsername, findAll, update, delete em todos os frameworks
- 🐘 **PHP com estrutura correta**: app/ separado do src/, sem duplicação de pastas

### Alterado
- 🔧 `.env` agora gerado vazio — usuário preenche com seus próprios valores
- 🔧 TypeScript: adicionado TypeORM, Winston, Axios, Zod, reflect-metadata
- 🔧 JavaScript: removido nodemon, substituído por `node --watch` nativo
- 🔧 Stack de cada framework documentada no README

---

## [0.0.3] 

### Adicionado
- 🎯 **6 frameworks**: JavaScript, TypeScript, Java (Spark/Spring), PHP Slim, C# ASP.NET
- 🏗️ **4 arquiteturas**: MVC, DDD, Clean Architecture, Hexagonal
- 📁 Estrutura completa com Controllers, Services, Repositories, Models, Middlewares, Routes, Config, Utils
- 🐳 Dockerfile opcional (usuário escolhe)
- 📄 Arquivos base: README.md, .gitignore, .env.example

### Alterado
- 🔧 Suporte ao VS Code versão 1.85.0+
- 📦 Estrutura de pastas otimizada (backend-only, sem frontend)
- ⚡ Fluxo simplificado: nome → framework → arquitetura → projeto pronto

### Corrigido
- 🐛 Compatibilidade com VS Code mais antigo
- 🔨 Resolução de caminhos no Windows corrigida
- ❌ Removidas pastas desnecessárias (public/, tests/, docs/, logs/, tmp/)
- ⚠️ Removido suporte a Frontend

---

## [0.0.2]

### Adicionado
- 📁 Estrutura de projeto mais completa
- 🏗️ Preparação para suporte a múltiplas arquiteturas
- 📝 Melhor documentação no README

### Alterado
- 🔧 Suporte ao VS Code engine reduzido para v1.85.0
- 📦 Estrutura de pastas otimizada para melhor organização

### Corrigido
- 🐛 Problemas de compatibilidade com versões antigas do VS Code
- 🔨 Resolução de caminhos no Windows corrigida

---

## [0.0.1]

### Adicionado
- 🎉 Lançamento inicial
- 🏗️ Suporte à arquitetura MVC
- 📁 Estrutura básica de projeto
- 🚀 Suporte para JavaScript e TypeScript
- ☕ Suporte para Java Spring Boot
- 🐘 Suporte para PHP Slim
- 🟦 Suporte para C# ASP.NET Core

### Funcionalidades
- ✅ Criação automática de pastas
- ✅ package.json pré-configurado
- ✅ Arquivos server prontos para uso
- ✅ Configuração de variáveis de ambiente
- ✅ Git ignore pré-configurado
- ✅ Licença MIT incluída

---

## Legenda

| Ícone | Significado |
|-------|-------------|
| 🎉 | Lançamento / grande funcionalidade |
| ✨ | Nova funcionalidade |
| 🔧 | Melhoria / alteração |
| 🐛 | Correção de bug |
| 📝 | Documentação |
| ⚠️ | Mudança que quebra compatibilidade |