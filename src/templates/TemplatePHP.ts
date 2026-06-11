// templates/TemplatePHP.ts
import * as fs from 'fs';
import * as path from 'path';

export async function generatePhpProject(projectPath: string, projectName: string) {
    
    // composer.json
    const composerJson = {
        name: projectName,
        description: "Backend criado com Constellation CLI",
        require: {
            "slim/slim": "^4.12",
            "slim/psr7": "^1.6",
            "firebase/php-jwt": "^6.10",
            "vlucas/phpdotenv": "^5.5"
        },
        autoload: {
            "psr-4": {
                "App\\": "app/"
            }
        }
    };
    fs.writeFileSync(path.join(projectPath, 'composer.json'), JSON.stringify(composerJson, null, 2));

    // public/index.php
    const publicPath = path.join(projectPath, 'public');
    fs.mkdirSync(publicPath, { recursive: true });
    
    const indexPhp = `<?php

require __DIR__ . '/../vendor/autoload.php';

use Slim\\Factory\\AppFactory;
use Dotenv\\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$app = AppFactory::create();

$app->get('/', function ($request, $response) {
    $response->getBody()->write(json_encode(['message' => 'API rodando']));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();`;
    fs.writeFileSync(path.join(publicPath, 'index.php'), indexPhp);

    // .env
    const env = `DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=meu_banco
JWT_SECRET=`;
    fs.writeFileSync(path.join(projectPath, '.env'), env);
    fs.writeFileSync(path.join(projectPath, '.env.example'), env);

    // .gitignore
    const gitignore = `vendor/
.env
composer.lock
*.log`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

    // Dockerfile
    const dockerfile = `FROM php:8.2-apache
RUN docker-php-ext-install pdo pdo_mysql
COPY . /var/www/html/
EXPOSE 80`;
    fs.writeFileSync(path.join(projectPath, 'Dockerfile'), dockerfile);

    // README.md
    const readme = `# ${projectName}

## Backend PHP Slim

### Rodar
\`\`\`bash
composer install
cd public
php -S localhost:8000
\`\`\`

### Docker
\`\`\`bash
docker build -t ${projectName} .
docker run -p 8080:80 ${projectName}
\`\`\`

---
Gerado com Constellation CLI
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
}