import * as fs from 'fs';
import * as path from 'path';

// ================================
// NODE.JS (EXPRESS) TEMPLATE
// ================================
export async function generateNodeProject(projectPath: string, projectName: string) {
    // package.json
    const packageJson = {
        name: projectName,
        version: "1.0.0",
        scripts: { start: "node server.js", dev: "nodemon server.js" },
        dependencies: { express: "^4.18.2" }
    };
    fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    // server.js
    const serverContent = `const express = require('express');
const app = express();
app.use(express.json());

// Import routes
const indexRoutes = require('./src/routes/index');

app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`;
    fs.writeFileSync(path.join(projectPath, 'server.js'), serverContent);

    // ================================
    // BACKEND STRUCTURE (EMPTY FILES)
    // ================================
    
    // Controllers
    const controllers = ['HomeController.js', 'UserController.js', 'AuthController.js'];
    controllers.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/controllers', file), `// ${file}\n`);
    });

    // Models
    const models = ['UserModel.js', 'ProductModel.js', 'AuthModel.js'];
    models.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/models', file), `// ${file}\n`);
    });

    // Services
    const services = ['UserService.js', 'AuthService.js', 'ProductService.js'];
    services.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/services', file), `// ${file}\n`);
    });

    // Repositories
    const repositories = ['UserRepository.js', 'ProductRepository.js'];
    repositories.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/repositories', file), `// ${file}\n`);
    });

    // Middleware
    const middleware = ['auth.js', 'errorHandler.js', 'logger.js'];
    middleware.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/middleware', file), `// ${file}\n`);
    });

    // Config
    const configs = ['database.js', 'env.js', 'server.js'];
    configs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/config', file), `// ${file}\n`);
    });

    // Utils
    const utils = ['response.js', 'validator.js', 'crypto.js'];
    utils.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/utils', file), `// ${file}\n`);
    });

    // DTOs
    const dtos = ['UserDTO.js', 'ProductDTO.js', 'AuthDTO.js'];
    dtos.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/dto', file), `// ${file}\n`);
    });

    // Validators
    const validators = ['userValidator.js', 'productValidator.js'];
    validators.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/validators', file), `// ${file}\n`);
    });

    // Routes
    const routes = ['index.js', 'userRoutes.js', 'authRoutes.js', 'productRoutes.js'];
    routes.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/routes', file), `// ${file}\n`);
    });

    // ================================
    // FRONTEND STRUCTURE (EMPTY FILES)
    // ================================

    // HTML files
    const htmlFiles = ['index.html', 'about.html', 'contact.html'];
    htmlFiles.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'public', file), `<!-- ${file} -->\n`);
    });

    // CSS files
    const cssFiles = ['reset.css', 'style.css', 'components.css', 'responsive.css'];
    cssFiles.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'public/css', file), `/* ${file} */\n`);
    });

    // JS files
    const jsFiles = ['main.js', 'utils.js', 'api.js'];
    jsFiles.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'public/js', file), `// ${file}\n`);
    });

    // Images folder
    fs.mkdirSync(path.join(projectPath, 'public/images'), { recursive: true });
}

// ================================
// SPRING BOOT TEMPLATE
// ================================
export async function generateSpringProject(projectPath: string, projectName: string) {
    // pom.xml
    const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>${projectName}</artifactId>
    <version>1.0.0</version>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>`;
    fs.writeFileSync(path.join(projectPath, 'pom.xml'), pomXml);

    // Application.java
    const applicationJava = `package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`;
    const appPath = path.join(projectPath, 'src/main/java/com/example');
    fs.mkdirSync(appPath, { recursive: true });
    fs.writeFileSync(path.join(appPath, 'Application.java'), applicationJava);

    // Backend structure (empty Java files)
    const controllersJava = ['HomeController.java', 'UserController.java', 'AuthController.java'];
    const controllerPathJava = path.join(projectPath, 'src/main/java/com/example/controller');
    fs.mkdirSync(controllerPathJava, { recursive: true });
    controllersJava.forEach(file => {
        fs.writeFileSync(path.join(controllerPathJava, file), `// ${file}\n`);
    });

    const modelsJava = ['Usuario.java', 'Produto.java'];
    const modelPathJava = path.join(projectPath, 'src/main/java/com/example/model');
    fs.mkdirSync(modelPathJava, { recursive: true });
    modelsJava.forEach(file => {
        fs.writeFileSync(path.join(modelPathJava, file), `// ${file}\n`);
    });

    const servicesJava = ['UsuarioService.java', 'AuthService.java'];
    const servicePathJava = path.join(projectPath, 'src/main/java/com/example/service');
    fs.mkdirSync(servicePathJava, { recursive: true });
    servicesJava.forEach(file => {
        fs.writeFileSync(path.join(servicePathJava, file), `// ${file}\n`);
    });

    const repositoriesJava = ['UsuarioRepository.java', 'ProdutoRepository.java'];
    const repoPathJava = path.join(projectPath, 'src/main/java/com/example/repository');
    fs.mkdirSync(repoPathJava, { recursive: true });
    repositoriesJava.forEach(file => {
        fs.writeFileSync(path.join(repoPathJava, file), `// ${file}\n`);
    });

    const dtosJava = ['UserRequestDTO.java', 'UserResponseDTO.java', 'AuthRequestDTO.java', 'AuthResponseDTO.java'];
    const dtoPathJava = path.join(projectPath, 'src/main/java/com/example/dto');
    fs.mkdirSync(dtoPathJava, { recursive: true });
    dtosJava.forEach(file => {
        fs.writeFileSync(path.join(dtoPathJava, file), `// ${file}\n`);
    });

    // Frontend (Thymeleaf)
    const htmlTemplates = ['index.html', 'about.html', 'contact.html'];
    const templatesPath = path.join(projectPath, 'src/main/resources/templates');
    fs.mkdirSync(templatesPath, { recursive: true });
    htmlTemplates.forEach(file => {
        fs.writeFileSync(path.join(templatesPath, file), `<!-- ${file} -->\n`);
    });

    // CSS files
    const cssFilesSpring = ['style.css', 'responsive.css'];
    const cssPathSpring = path.join(projectPath, 'src/main/resources/static/css');
    fs.mkdirSync(cssPathSpring, { recursive: true });
    cssFilesSpring.forEach(file => {
        fs.writeFileSync(path.join(cssPathSpring, file), `/* ${file} */\n`);
    });

    // JS files
    const jsFilesSpring = ['main.js', 'api.js'];
    const jsPathSpring = path.join(projectPath, 'src/main/resources/static/js');
    fs.mkdirSync(jsPathSpring, { recursive: true });
    jsFilesSpring.forEach(file => {
        fs.writeFileSync(path.join(jsPathSpring, file), `// ${file}\n`);
    });

    // Images folder
    fs.mkdirSync(path.join(projectPath, 'src/main/resources/static/images'), { recursive: true });
}

// ================================
// PHP (SLIM) TEMPLATE
// ================================
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

// ================================
// C# (ASP.NET CORE) TEMPLATE
// ================================
export async function generateCSharpProject(projectPath: string, projectName: string) {
    // .csproj
    const csproj = `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>`;
    fs.writeFileSync(path.join(projectPath, `${projectName}.csproj`), csproj);

    // Program.cs
    const programContent = `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => Results.Json(new { message = "Hello World" }));

app.Run();`;
    fs.writeFileSync(path.join(projectPath, 'Program.cs'), programContent);

    // appsettings.json
    const appsettings = `{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}`;
    fs.writeFileSync(path.join(projectPath, 'appsettings.json'), appsettings);

    // Controllers
    const controllersCs = ['HomeController.cs', 'UserController.cs', 'AuthController.cs'];
    const controllersPathCs = path.join(projectPath, 'Controllers');
    fs.mkdirSync(controllersPathCs, { recursive: true });
    controllersCs.forEach(file => {
        fs.writeFileSync(path.join(controllersPathCs, file), `// ${file}\n`);
    });

    // Models
    const modelsCs = ['User.cs', 'Product.cs'];
    const modelsPathCs = path.join(projectPath, 'Models');
    fs.mkdirSync(modelsPathCs, { recursive: true });
    modelsCs.forEach(file => {
        fs.writeFileSync(path.join(modelsPathCs, file), `// ${file}\n`);
    });

    // Services
    const servicesCs = ['IUserService.cs', 'UserService.cs', 'IAuthService.cs', 'AuthService.cs'];
    const servicesPathCs = path.join(projectPath, 'Services');
    fs.mkdirSync(servicesPathCs, { recursive: true });
    servicesCs.forEach(file => {
        fs.writeFileSync(path.join(servicesPathCs, file), `// ${file}\n`);
    });

    // Repositories
    const repositoriesCs = ['IUserRepository.cs', 'UserRepository.cs', 'IProductRepository.cs', 'ProductRepository.cs'];
    const reposPathCs = path.join(projectPath, 'Repositories');
    fs.mkdirSync(reposPathCs, { recursive: true });
    repositoriesCs.forEach(file => {
        fs.writeFileSync(path.join(reposPathCs, file), `// ${file}\n`);
    });

    // DTOs
    const dtosCs = ['UserRequestDTO.cs', 'UserResponseDTO.cs', 'AuthRequestDTO.cs', 'AuthResponseDTO.cs'];
    const dtoPathCs = path.join(projectPath, 'DTOs');
    fs.mkdirSync(dtoPathCs, { recursive: true });
    dtosCs.forEach(file => {
        fs.writeFileSync(path.join(dtoPathCs, file), `// ${file}\n`);
    });

    // Frontend (wwwroot)
    const htmlFilesCs = ['index.html', 'about.html', 'contact.html'];
    const wwwrootPath = path.join(projectPath, 'wwwroot');
    fs.mkdirSync(wwwrootPath, { recursive: true });
    htmlFilesCs.forEach(file => {
        fs.writeFileSync(path.join(wwwrootPath, file), `<!-- ${file} -->\n`);
    });

    const cssFilesCs = ['style.css', 'responsive.css'];
    const cssPathCs = path.join(projectPath, 'wwwroot/css');
    fs.mkdirSync(cssPathCs, { recursive: true });
    cssFilesCs.forEach(file => {
        fs.writeFileSync(path.join(cssPathCs, file), `/* ${file} */\n`);
    });

    const jsFilesCs = ['main.js', 'api.js'];
    const jsPathCs = path.join(projectPath, 'wwwroot/js');
    fs.mkdirSync(jsPathCs, { recursive: true });
    jsFilesCs.forEach(file => {
        fs.writeFileSync(path.join(jsPathCs, file), `// ${file}\n`);
    });

    fs.mkdirSync(path.join(projectPath, 'wwwroot/images'), { recursive: true });
}

// ================================
// TYPESCRIPT TEMPLATE
// ================================
export async function generateTypeScriptProject(projectPath: string, projectName: string) {
    // package.json
    const packageJson = {
        name: projectName,
        version: "1.0.0",
        scripts: { start: "ts-node src/index.ts", dev: "ts-node-dev src/index.ts" },
        dependencies: {},
        devDependencies: {
            "@types/node": "^20.0.0",
            "ts-node": "^10.9.0",
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
        }
    };
    fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

    // ================================
    // BACKEND STRUCTURE (TS EMPTY FILES)
    // ================================

    // Controllers
    const controllersTs = ['HomeController.ts', 'UserController.ts', 'AuthController.ts'];
    controllersTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/controllers', file), `// ${file}\n`);
    });

    // Models
    const modelsTs = ['UserModel.ts', 'ProductModel.ts', 'AuthModel.ts'];
    modelsTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/models', file), `// ${file}\n`);
    });

    // Services
    const servicesTs = ['UserService.ts', 'AuthService.ts', 'ProductService.ts'];
    servicesTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/services', file), `// ${file}\n`);
    });

    // Repositories
    const repositoriesTs = ['UserRepository.ts', 'ProductRepository.ts'];
    repositoriesTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/repositories', file), `// ${file}\n`);
    });

    // Middleware
    const middlewareTs = ['auth.ts', 'errorHandler.ts', 'logger.ts'];
    middlewareTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/middleware', file), `// ${file}\n`);
    });

    // Config
    const configsTs = ['database.ts', 'env.ts', 'server.ts'];
    configsTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/config', file), `// ${file}\n`);
    });

    // Utils
    const utilsTs = ['response.ts', 'validator.ts', 'crypto.ts'];
    utilsTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/utils', file), `// ${file}\n`);
    });

    // DTOs
    const dtosTs = ['UserDTO.ts', 'ProductDTO.ts', 'AuthDTO.ts'];
    dtosTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/dto', file), `// ${file}\n`);
    });

    // Validators
    const validatorsTs = ['userValidator.ts', 'productValidator.ts'];
    validatorsTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/validators', file), `// ${file}\n`);
    });

    // Routes
    const routesTs = ['index.ts', 'userRoutes.ts', 'authRoutes.ts', 'productRoutes.ts'];
    routesTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'src/routes', file), `// ${file}\n`);
    });

    // src/index.ts
    const indexContent = `console.log('Hello from TypeScript!');`;
    fs.writeFileSync(path.join(projectPath, 'src/index.ts'), indexContent);

    // ================================
    // FRONTEND STRUCTURE (EMPTY FILES)
    // ================================

    // HTML files
    const htmlFilesTs = ['index.html', 'about.html', 'contact.html'];
    htmlFilesTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'public', file), `<!-- ${file} -->\n`);
    });

    // CSS files
    const cssFilesTs = ['reset.css', 'style.css', 'components.css', 'responsive.css'];
    cssFilesTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'public/css', file), `/* ${file} */\n`);
    });

    // JS files
    const jsFilesTs = ['main.js', 'utils.js', 'api.js'];
    jsFilesTs.forEach(file => {
        fs.writeFileSync(path.join(projectPath, 'public/js', file), `// ${file}\n`);
    });

    // Images folder
    fs.mkdirSync(path.join(projectPath, 'public/images'), { recursive: true });
}