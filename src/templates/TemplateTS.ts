// templates/TemplateTS.ts
import * as fs from 'fs';
import * as path from 'path';

export async function generateTypeScriptProject(projectPath: string, projectName: string) {
    
    // package.json
    const packageJson = {
        name: projectName,
        version: "1.0.0",
        description: "Backend criado com Constellation CLI",
        main: "dist/server.js",
        scripts: {
            "build": "tsc",
            "start": "node dist/server.js",
            "dev": "ts-node-dev src/server.ts"
        },
        dependencies: {
            "express": "^4.18.2",
            "mysql2": "^3.6.0",
            "bcrypt": "^5.1.0",
            "jsonwebtoken": "^9.0.0",
            "cors": "^2.8.5",
            "dotenv": "^16.3.0"
        },
        devDependencies: {
            "@types/express": "^4.17.21",
            "@types/node": "^20.0.0",
            "ts-node-dev": "^2.0.0",
            "typescript": "^5.0.0"
        }
    };
    fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    // tsconfig.json
    const tsconfig = {
        compilerOptions: {
            target: "ES2020",
            module: "commonjs",
            outDir: "./dist",
            rootDir: "./src",
            strict: true,
            esModuleInterop: true
        },
        include: ["src/**/*"]
    };
    fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

    // src/server.ts
    const srcPath = path.join(projectPath, 'src');
    fs.mkdirSync(srcPath, { recursive: true });
    
    const serverTs = `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API rodando!' });
});

app.listen(PORT, () => {
    console.log(\`🚀 Servidor na porta \${PORT}\`);
});`;
    fs.writeFileSync(path.join(srcPath, 'server.ts'), serverTs);

    // .env
    const env = `PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=meu_banco
JWT_SECRET=`;
    fs.writeFileSync(path.join(projectPath, '.env'), env);
    fs.writeFileSync(path.join(projectPath, '.env.example'), env);

    // .gitignore
    const gitignore = `node_modules/
dist/
.env
*.log`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

    // Dockerfile
    const dockerfile = `FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]`;
    fs.writeFileSync(path.join(projectPath, 'Dockerfile'), dockerfile);

    // README.md
    const readme = `# ${projectName}

## Backend TypeScript

### Rodar
\`\`\`bash
npm install
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
npm start
\`\`\`

### Docker
\`\`\`bash
docker build -t ${projectName} .
docker run -p 3000:3000 ${projectName}
\`\`\`

---
Gerado com Constellation CLI
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
}