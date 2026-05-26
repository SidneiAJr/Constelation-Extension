import * as fs from 'fs';
import * as path from 'path';

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

