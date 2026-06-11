// templates/TemplateJS.ts
import * as fs from 'fs';
import * as path from 'path';

export async function generateNodeProject(projectPath: string, projectName: string) {
    
    // package.json
    const packageJson = {
        name: projectName,
        version: "1.0.0",
        description: "Backend criado com Constellation CLI",
        main: "server.js",
        scripts: {
            "start": "node server.js",
            "dev": "nodemon server.js"
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
            "nodemon": "^3.0.1"
        }
    };
    fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    // server.js
    const serverJs = `const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

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
    fs.writeFileSync(path.join(projectPath, 'server.js'), serverJs);

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
.env
*.log`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

    // Dockerfile
    const dockerfile = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`;
    fs.writeFileSync(path.join(projectPath, 'Dockerfile'), dockerfile);

    // README.md
    const readme = `# ${projectName}

## Backend Node.js

### Rodar
\`\`\`bash
npm install
npm run dev
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