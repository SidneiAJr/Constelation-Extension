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
            "typeorm": "^0.3.17",
            "winston": "^3.11.0",
            "axios": "^1.6.0",
            "bcrypt": "^5.1.0",
            "jsonwebtoken": "^9.0.0",
            "cors": "^2.8.5",
            "dotenv": "^16.3.0",
            "reflect-metadata": "^0.1.13",
             "zod": "^3.22.0" 
        },
        devDependencies: {
            "@types/express": "^4.17.21",
            "@types/bcrypt": "^5.0.2",
            "@types/jsonwebtoken": "^9.0.5",
            "@types/cors": "^2.8.17",
            "@types/node": "^20.0.0",
            "ts-node-dev": "^2.0.0",
            "typescript": "^5.0.0"
        }
    };
    fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    // tsconfig.json — reflect-metadata exige esses dois flags
    const tsconfig = {
        compilerOptions: {
            target: "ES2020",
            module: "commonjs",
            outDir: "./dist",
            rootDir: "./src",
            strict: true,
            esModuleInterop: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true
        },
        include: ["src/**/*"]
    };
    fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

    // src/server.ts
    const srcPath = path.join(projectPath, 'src');
    fs.mkdirSync(srcPath, { recursive: true });
    
    const serverTs = `import 'reflect-metadata';
import express from 'express';
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
    const env = `PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
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

### Dependências
\`\`\`bash
npm install
\`\`\`

### Rodar
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
npm start
\`\`\`

### Stack inclusa
- Express — HTTP server
- TypeORM — ORM para banco de dados
- Winston — logs
- Axios — requisições HTTP
- JWT + Bcrypt — auth
- MySQL2 — driver MySQL

### Docker
\`\`\`bash
docker build -t ${projectName} .
docker run -p 3000:3000 ${projectName}
\`\`\`

---
Gerado com Constellation CLI
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
    // src/utils/jwt.ts
    const jwtUtil = `import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '';

export const generateToken = (payload: object): string => {
    // TODO: adicione sua lógica aqui
};

export const verifyToken = (token: string): any => {
    // TODO: adicione sua lógica aqui
};
`;
    const utilsPath = path.join(srcPath, 'utils');
    fs.mkdirSync(utilsPath, { recursive: true });
    fs.writeFileSync(path.join(utilsPath, 'jwt.ts'), jwtUtil);

    // src/middlewares/auth.ts
    const authMiddleware = `import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // TODO: adicione sua lógica aqui
    } catch (err: any) {
        // TODO: trate o erro aqui
    }
};
`;
    const middlewaresPath = path.join(srcPath, 'middlewares');
    fs.mkdirSync(middlewaresPath, { recursive: true });
    fs.writeFileSync(path.join(middlewaresPath, 'auth.ts'), authMiddleware);

    // src/schemas/UsuarioSchema.ts
    const usuarioSchema = `import { z } from 'zod';

export const createUsuarioSchema = z.object({
    // TODO: defina os campos aqui
});

export const updateUsuarioSchema = z.object({
    // TODO: defina os campos aqui
});

export type CreateUsuarioDTO = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuarioDTO = z.infer<typeof updateUsuarioSchema>;
`;
    const schemasPath = path.join(srcPath, 'schemas');
    fs.mkdirSync(schemasPath, { recursive: true });
    fs.writeFileSync(path.join(schemasPath, 'UsuarioSchema.ts'), usuarioSchema);

    // src/middlewares/validateUser.ts
    const validateUser = `import { Request, Response, NextFunction } from 'express';
import { createUsuarioSchema } from '../schemas/UsuarioSchema';

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // TODO: adicione sua lógica aqui
    } catch (err: any) {
        // TODO: trate o erro aqui
    }
};
`;
    fs.writeFileSync(path.join(middlewaresPath, 'validateUser.ts'), validateUser);
}