import * as fs from 'fs';
import * as path from 'path';

export async function generatePhpProject(projectPath: string, projectName: string) {
    // public/index.php
    const indexContent = `<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Slim\\Factory\\AppFactory;

$app = AppFactory::create();

$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write(json_encode(['message' => 'Hello World']));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();`;
    fs.writeFileSync(path.join(projectPath, 'public/index.php'), indexContent);
    
    // composer.json
    const composerJson = {
        name: `${projectName}`,
        description: "Project created with Constellation CLI",
        require: { "slim/slim": "^4.12" }
    };
    fs.writeFileSync(path.join(projectPath, 'composer.json'), JSON.stringify(composerJson, null, 2));

    // Backend structure (PHP files)
    const controllersPhp = ['HomeController.php', 'UserController.php', 'AuthController.php'];
    const controllersPathPhp = path.join(projectPath, 'app/Controllers');
    fs.mkdirSync(controllersPathPhp, { recursive: true });
    controllersPhp.forEach(file => {
        fs.writeFileSync(path.join(controllersPathPhp, file), `<?php\n// ${file}\n`);
    });

    const modelsPhp = ['User.php', 'Product.php'];
    const modelsPathPhp = path.join(projectPath, 'app/Models');
    fs.mkdirSync(modelsPathPhp, { recursive: true });
    modelsPhp.forEach(file => {
        fs.writeFileSync(path.join(modelsPathPhp, file), `<?php\n// ${file}\n`);
    });

    const servicesPhp = ['UserService.php', 'AuthService.php'];
    const servicesPathPhp = path.join(projectPath, 'app/Services');
    fs.mkdirSync(servicesPathPhp, { recursive: true });
    servicesPhp.forEach(file => {
        fs.writeFileSync(path.join(servicesPathPhp, file), `<?php\n// ${file}\n`);
    });

    const repositoriesPhp = ['UserRepository.php', 'ProductRepository.php'];
    const reposPathPhp = path.join(projectPath, 'app/Repositories');
    fs.mkdirSync(reposPathPhp, { recursive: true });
    repositoriesPhp.forEach(file => {
        fs.writeFileSync(path.join(reposPathPhp, file), `<?php\n// ${file}\n`);
    });

    const middlewarePhp = ['AuthMiddleware.php', 'ErrorMiddleware.php'];
    const middlewarePathPhp = path.join(projectPath, 'app/Middleware');
    fs.mkdirSync(middlewarePathPhp, { recursive: true });
    middlewarePhp.forEach(file => {
        fs.writeFileSync(path.join(middlewarePathPhp, file), `<?php\n// ${file}\n`);
    });

    // Frontend (public folder)
    const htmlFilesPhp = ['index.html', 'about.html', 'contact.html'];
    htmlFilesPhp.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'public', file), `<!-- ${file} -->\n`);
    });

    const cssFilesPhp = ['style.css', 'responsive.css'];
    const cssPathPhp = path.join(projectPath, 'public/css');
    fs.mkdirSync(cssPathPhp, { recursive: true });
    cssFilesPhp.forEach(file => {
        fs.writeFileSync(path.join(cssPathPhp, file), `/* ${file} */\n`);
    });

    const jsFilesPhp = ['main.js', 'api.js'];
    const jsPathPhp = path.join(projectPath, 'public/js');
    fs.mkdirSync(jsPathPhp, { recursive: true });
    jsFilesPhp.forEach(file => {
        fs.writeFileSync(path.join(jsPathPhp, file), `// ${file}\n`);
    });

    fs.mkdirSync(path.join(projectPath, 'public/images'), { recursive: true });
}