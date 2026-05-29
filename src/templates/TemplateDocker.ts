import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

interface DockerService {
  name: string;
  image: string;
  port: number;
  env?: Record<string, string>;
  volumes?: string[];
  dependsOn?: string[];
}

function ensureRequirementsTxt(projectPath: string) {
  const requirementsPath = path.join(projectPath, 'requirements.txt');
  if (!fs.existsSync(requirementsPath)) {
    const content = `flask==2.3.0
fastapi==0.104.0
uvicorn==0.24.0
requests==2.31.0
pandas==2.1.0
numpy==1.24.0
mysql-connector-python==8.1.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0
`;
    fs.writeFileSync(requirementsPath, content);
    console.log('✅ requirements.txt criado em:', requirementsPath);
  }
}

function generateRequirementsTxt(projectPath: string) {
  const content = `flask==2.3.0
fastapi==0.104.0
uvicorn==0.24.0
requests==2.31.0
pandas==2.1.0
numpy==1.24.0
mysql-connector-python==8.1.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0
`;
  fs.writeFileSync(path.join(projectPath, 'requirements.txt'), content);
}

export async function generateDockerCompose(projectPath: string, projectName: string) {
  // 1. Perguntar quais serviços o usuário quer
  const selectedItems = await vscode.window.showQuickPick(
    [
      { label: '🐬 MySQL', description: 'Banco relacional', picked: true },
      { label: '🐘 PostgreSQL', description: 'Banco avançado', picked: false },
      { label: '🍃 MongoDB', description: 'Banco NoSQL', picked: false },
      { label: '☕ Java (Spring Boot)', description: 'Backend Java', picked: false },
      { label: '🟢 Node.js', description: 'Backend JavaScript/TypeScript', picked: false },
      { label: '🐍 Python', description: 'Backend Flask/FastAPI', picked: false },
      { label: '🐘 PHP', description: 'Backend Slim', picked: false },
    ],
    { 
      canPickMany: true,
      placeHolder: '📦 Selecione os serviços desejados' 
    }
  );

  if (!selectedItems || selectedItems.length === 0) return;

  // Verificar dependências
  const hasMySQL = selectedItems.some(item => item.label.includes('MySQL'));
  const hasPostgres = selectedItems.some(item => item.label.includes('PostgreSQL'));
  const hasMongoDB = selectedItems.some(item => item.label.includes('MongoDB'));
  const hasPython = selectedItems.some(item => item.label.includes('Python'));

  // 🔥 CRIA O REQUIREMENTS.TXT PRIMEIRO (antes de qualquer build)
  if (hasPython) {
    ensureRequirementsTxt(projectPath);
    generateRequirementsTxt(projectPath);
  }

  // 2. Construir o docker-compose.yml (sem version - obsoleto)
  let yaml = `services:
`;

  // 3. Adicionar serviços selecionados
  if (hasMySQL) {
    yaml += `
  mysql:
    image: mysql:8
    container_name: ${projectName}-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    restart: unless-stopped
    networks:
      - dev-network
`;
  }

  if (hasPostgres) {
    yaml += `
  postgres:
    image: postgres:16
    container_name: ${projectName}-postgres
    environment:
      POSTGRES_PASSWORD: root
      POSTGRES_USER: root
      POSTGRES_DB: devdb
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - dev-network
`;
  }

  if (hasMongoDB) {
    yaml += `
  mongodb:
    image: mongo:7
    container_name: ${projectName}-mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db
    restart: unless-stopped
    networks:
      - dev-network
`;
  }

  // Backend Java
  if (selectedItems.some(item => item.label.includes('Java'))) {
    let dependsOn = [];
    if (hasMySQL) dependsOn.push('mysql');
    if (hasPostgres) dependsOn.push('postgres');
    
    yaml += `
  java:
    build:
      context: .
      dockerfile: Dockerfile.java
    container_name: ${projectName}-java
    ports:
      - "8080:8080"
    volumes:
      - ./:/app
    ${dependsOn.length > 0 ? `depends_on:\n      - ${dependsOn.join('\n      - ')}` : ''}
    restart: unless-stopped
    networks:
      - dev-network
`;
  }

  // Backend Node.js
  if (selectedItems.some(item => item.label.includes('Node.js'))) {
    let dependsOn = [];
    if (hasMongoDB) dependsOn.push('mongodb');
    if (hasMySQL) dependsOn.push('mysql');
    
    yaml += `
  nodejs:
    build:
      context: .
      dockerfile: Dockerfile.node
    container_name: ${projectName}-nodejs
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
    ${dependsOn.length > 0 ? `depends_on:\n      - ${dependsOn.join('\n      - ')}` : ''}
    restart: unless-stopped
    networks:
      - dev-network
`;
  }

  // Backend Python
  if (hasPython) {
    let dependsOn = [];
    if (hasPostgres) dependsOn.push('postgres');
    if (hasMySQL) dependsOn.push('mysql');
    
    yaml += `
  python:
    build:
      context: .
      dockerfile: Dockerfile.python
    container_name: ${projectName}-python
    ports:
      - "5000:5000"
    volumes:
      - ./:/app
    ${dependsOn.length > 0 ? `depends_on:\n      - ${dependsOn.join('\n      - ')}` : ''}
    restart: unless-stopped
    networks:
      - dev-network
`;
  }

  // Backend PHP
  if (selectedItems.some(item => item.label.includes('PHP'))) {
    yaml += `
  php:
    build:
      context: .
      dockerfile: Dockerfile.php
    container_name: ${projectName}-php
    ports:
      - "8000:8000"
    volumes:
      - ./:/var/www/html
    depends_on:
      - mysql
    restart: unless-stopped
    networks:
      - dev-network
`;
  }

  // 4. Rede e Volumes
  yaml += `
networks:
  dev-network:
    driver: bridge

volumes:
`;
  if (hasMySQL) yaml += `  mysql-data:
`;
  if (hasPostgres) yaml += `  postgres-data:
`;
  if (hasMongoDB) yaml += `  mongodb-data:
`;

  // 5. Salvar arquivo
  const dockerComposePath = path.join(projectPath, 'docker-compose.yml');
  fs.writeFileSync(dockerComposePath, yaml);

  // 6. Criar Dockerfiles para os backends selecionados
  if (selectedItems.some(item => item.label.includes('Java'))) {
    generateDockerfileJava(projectPath);
  }
  if (selectedItems.some(item => item.label.includes('Node.js'))) {
    generateDockerfileNode(projectPath);
  }
  if (hasPython) {
    generateDockerfilePython(projectPath);
  }
  if (selectedItems.some(item => item.label.includes('PHP'))) {
    generateDockerfilePhp(projectPath);
  }

  vscode.window.showInformationMessage(`✅ docker-compose.yml gerado com ${selectedItems.length} serviços!`);
}

function generateDockerfileJava(projectPath: string) {
  const content = `FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY . .
RUN chmod +x mvnw 2>/dev/null || true
RUN if [ -f mvnw ]; then ./mvnw dependency:go-offline; fi
EXPOSE 8080
CMD if [ -f mvnw ]; then ./mvnw spring-boot:run; else java -jar target/*.jar; fi`;
  fs.writeFileSync(path.join(projectPath, 'Dockerfile.java'), content);
}

function generateDockerfileNode(projectPath: string) {
  const content = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`;
  fs.writeFileSync(path.join(projectPath, 'Dockerfile.node'), content);
}

function generateDockerfilePython(projectPath: string) {
  const content = `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]`;
  fs.writeFileSync(path.join(projectPath, 'Dockerfile.python'), content);
}

function generateDockerfilePhp(projectPath: string) {
  const content = `FROM php:8.2-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY . /var/www/html/
EXPOSE 80`;
  fs.writeFileSync(path.join(projectPath, 'Dockerfile.php'), content);
}

export function generateStartupCommands() {
  let commands = '# Subir os containers\n';
  commands += 'docker-compose up -d\n\n';
  commands += '# Ver logs\n';
  commands += 'docker-compose logs -f\n\n';
  commands += '# Parar containers\n';
  commands += 'docker-compose down\n\n';
  commands += '# Parar e remover volumes (perde dados)\n';
  commands += 'docker-compose down -v\n';
  
  return commands;
}