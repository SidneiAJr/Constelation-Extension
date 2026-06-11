// templates/TemplateFiles.ts
import * as fs from 'fs';
import * as path from 'path';

export function generateBaseFiles(projectPath: string, framework: string) {
    
    if (framework === 'typescript') {
        const tsFiles = [
            { path: 'src/controllers/HomeController.ts', content: '// HomeController\n\nexport class HomeController {}\n' },
            { path: 'src/controllers/UsuarioController.ts', content: '// UsuarioController\n\nexport class UsuarioController {}\n' },
            { path: 'src/controllers/AuthController.ts', content: '// AuthController\n\nexport class AuthController {}\n' },
            { path: 'src/services/UsuarioService.ts', content: '// UsuarioService\n\nexport class UsuarioService {}\n' },
            { path: 'src/services/AuthService.ts', content: '// AuthService\n\nexport class AuthService {}\n' },
            { path: 'src/repositories/UsuarioRepository.ts', content: '// UsuarioRepository\n\nexport class UsuarioRepository {}\n' },
            { path: 'src/models/Usuario.ts', content: '// Usuario\n\nexport class Usuario {}\n' },
            { path: 'src/middlewares/auth.ts', content: '// auth middleware\n\nexport const auth = (req, res, next) => next();\n' },
            { path: 'src/middlewares/errorHandler.ts', content: '// errorHandler\n\nexport const errorHandler = (err, req, res, next) => {\n    res.status(500).json({ error: err.message });\n};\n' },
            { path: 'src/routes/index.ts', content: '// routes\n\nimport { Router } from "express";\nconst router = Router();\n\nexport default router;\n' },
            { path: 'src/routes/userRoutes.ts', content: '// userRoutes\n\nimport { Router } from "express";\nconst router = Router();\n\nexport default router;\n' },
            { path: 'src/routes/authRoutes.ts', content: '// authRoutes\n\nimport { Router } from "express";\nconst router = Router();\n\nexport default router;\n' },
            { path: 'src/config/database.ts', content: '// database config\n\nexport const dbConfig = {\n    host: process.env.DB_HOST || "localhost",\n    user: process.env.DB_USER || "root",\n    password: process.env.DB_PASSWORD || "",\n    database: process.env.DB_NAME || "meu_banco"\n};\n' },
            { path: 'src/config/env.ts', content: '// env config\n\nimport dotenv from "dotenv";\ndotenv.config();\n\nexport const env = {\n    port: process.env.PORT || 3000,\n    jwtSecret: process.env.JWT_SECRET || ""\n};\n' },
            { path: 'src/utils/response.ts', content: '// response utils\n\nexport const success = (res, data) => res.status(200).json({ success: true, data });\nexport const error = (res, message, status = 400) => res.status(status).json({ success: false, error: message });\n' },
            { path: 'src/utils/crypto.ts', content: '// crypto utils\n\nimport bcrypt from "bcrypt";\n\nexport const hashPassword = async (password: string) => {\n    return await bcrypt.hash(password, 10);\n};\n\nexport const comparePassword = async (password: string, hash: string) => {\n    return await bcrypt.compare(password, hash);\n};\n' }
        ];

        tsFiles.forEach(file => {
            const fullPath = path.join(projectPath, file.path);
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, file.content);
        });
    }
    
    else if (framework === 'javascript') {
        const jsFiles = [
            { path: 'src/controllers/HomeController.js', content: '// HomeController\n\nclass HomeController {}\n\nmodule.exports = HomeController;\n' },
            { path: 'src/controllers/UsuarioController.js', content: '// UsuarioController\n\nclass UsuarioController {}\n\nmodule.exports = UsuarioController;\n' },
            { path: 'src/controllers/AuthController.js', content: '// AuthController\n\nclass AuthController {}\n\nmodule.exports = AuthController;\n' },
            { path: 'src/services/UsuarioService.js', content: '// UsuarioService\n\nclass UsuarioService {}\n\nmodule.exports = UsuarioService;\n' },
            { path: 'src/services/AuthService.js', content: '// AuthService\n\nclass AuthService {}\n\nmodule.exports = AuthService;\n' },
            { path: 'src/repositories/UsuarioRepository.js', content: '// UsuarioRepository\n\nclass UsuarioRepository {}\n\nmodule.exports = UsuarioRepository;\n' },
            { path: 'src/models/Usuario.js', content: '// Usuario\n\nclass Usuario {}\n\nmodule.exports = Usuario;\n' },
            { path: 'src/middlewares/auth.js', content: '// auth middleware\n\nconst auth = (req, res, next) => next();\n\nmodule.exports = auth;\n' },
            { path: 'src/middlewares/errorHandler.js', content: '// errorHandler\n\nconst errorHandler = (err, req, res, next) => {\n    res.status(500).json({ error: err.message });\n};\n\nmodule.exports = errorHandler;\n' },
            { path: 'src/routes/index.js', content: '// routes\n\nconst router = require("express").Router();\n\nmodule.exports = router;\n' },
            { path: 'src/routes/userRoutes.js', content: '// userRoutes\n\nconst router = require("express").Router();\n\nmodule.exports = router;\n' },
            { path: 'src/routes/authRoutes.js', content: '// authRoutes\n\nconst router = require("express").Router();\n\nmodule.exports = router;\n' },
            { path: 'src/config/database.js', content: '// database config\n\nconst dbConfig = {\n    host: process.env.DB_HOST || "localhost",\n    user: process.env.DB_USER || "root",\n    password: process.env.DB_PASSWORD || "",\n    database: process.env.DB_NAME || "meu_banco"\n};\n\nmodule.exports = dbConfig;\n' },
            { path: 'src/config/env.js', content: '// env config\n\nrequire("dotenv").config();\n\nconst env = {\n    port: process.env.PORT || 3000,\n    jwtSecret: process.env.JWT_SECRET || ""\n};\n\nmodule.exports = env;\n' },
            { path: 'src/utils/response.js', content: '// response utils\n\nconst success = (res, data) => res.status(200).json({ success: true, data });\nconst error = (res, message, status = 400) => res.status(status).json({ success: false, error: message });\n\nmodule.exports = { success, error };\n' },
            { path: 'src/utils/crypto.js', content: '// crypto utils\n\nconst bcrypt = require("bcrypt");\n\nconst hashPassword = async (password) => {\n    return await bcrypt.hash(password, 10);\n};\n\nconst comparePassword = async (password, hash) => {\n    return await bcrypt.compare(password, hash);\n};\n\nmodule.exports = { hashPassword, comparePassword };\n' }
        ];

        jsFiles.forEach(file => {
            const fullPath = path.join(projectPath, file.path);
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, file.content);
        });
    }
    
    else if (framework === 'java') {
        const javaFiles = [
            { path: 'src/main/java/com/example/Main.java', content: `package com.example;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        port(8080);
        
        get("/", (req, res) -> {
            res.type("application/json");
            return "{\"message\": \"API rodando!\"}";
        });
    }
}` },
            { path: 'src/main/java/com/example/controllers/HomeController.java', content: 'package com.example.controllers;\n\npublic class HomeController {}\n' },
            { path: 'src/main/java/com/example/controllers/UsuarioController.java', content: 'package com.example.controllers;\n\npublic class UsuarioController {}\n' },
            { path: 'src/main/java/com/example/controllers/AuthController.java', content: 'package com.example.controllers;\n\npublic class AuthController {}\n' },
            { path: 'src/main/java/com/example/services/UsuarioService.java', content: 'package com.example.services;\n\npublic class UsuarioService {}\n' },
            { path: 'src/main/java/com/example/services/AuthService.java', content: 'package com.example.services;\n\npublic class AuthService {}\n' },
            { path: 'src/main/java/com/example/repositories/UsuarioRepository.java', content: 'package com.example.repositories;\n\npublic class UsuarioRepository {}\n' },
            { path: 'src/main/java/com/example/models/Usuario.java', content: 'package com.example.models;\n\npublic class Usuario {}\n' },
            { path: 'src/main/java/com/example/utils/ResponseUtil.java', content: 'package com.example.utils;\n\npublic class ResponseUtil {}\n' }
        ];

        javaFiles.forEach(file => {
            const fullPath = path.join(projectPath, file.path);
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, file.content);
        });
    }
    
    else if (framework === 'php') {
        const phpFiles = [
            { path: 'app/Controllers/HomeController.php', content: '<?php\n\nnamespace App\\Controllers;\n\nclass HomeController {}\n' },
            { path: 'app/Controllers/UsuarioController.php', content: '<?php\n\nnamespace App\\Controllers;\n\nclass UsuarioController {}\n' },
            { path: 'app/Controllers/AuthController.php', content: '<?php\n\nnamespace App\\Controllers;\n\nclass AuthController {}\n' },
            { path: 'app/Services/UsuarioService.php', content: '<?php\n\nnamespace App\\Services;\n\nclass UsuarioService {}\n' },
            { path: 'app/Services/AuthService.php', content: '<?php\n\nnamespace App\\Services;\n\nclass AuthService {}\n' },
            { path: 'app/Repositories/UsuarioRepository.php', content: '<?php\n\nnamespace App\\Repositories;\n\nclass UsuarioRepository {}\n' },
            { path: 'app/Models/Usuario.php', content: '<?php\n\nnamespace App\\Models;\n\nclass Usuario {}\n' },
            { path: 'app/Middleware/AuthMiddleware.php', content: '<?php\n\nnamespace App\\Middleware;\n\nclass AuthMiddleware {}\n' },
            { path: 'app/Config/Database.php', content: '<?php\n\nnamespace App\\Config;\n\nclass Database {}\n' }
        ];

        phpFiles.forEach(file => {
            const fullPath = path.join(projectPath, file.path);
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, file.content);
        });
    }
    
    else if (framework === 'csharp') {
        const csFiles = [
            { path: 'Controllers/HomeController.cs', content: 'namespace MeuBackend.Controllers;\n\npublic class HomeController {}\n' },
            { path: 'Controllers/UsuarioController.cs', content: 'namespace MeuBackend.Controllers;\n\npublic class UsuarioController {}\n' },
            { path: 'Controllers/AuthController.cs', content: 'namespace MeuBackend.Controllers;\n\npublic class AuthController {}\n' },
            { path: 'Services/UsuarioService.cs', content: 'namespace MeuBackend.Services;\n\npublic class UsuarioService {}\n' },
            { path: 'Services/AuthService.cs', content: 'namespace MeuBackend.Services;\n\npublic class AuthService {}\n' },
            { path: 'Repositories/UsuarioRepository.cs', content: 'namespace MeuBackend.Repositories;\n\npublic class UsuarioRepository {}\n' },
            { path: 'Models/Usuario.cs', content: 'namespace MeuBackend.Models;\n\npublic class Usuario {}\n' },
            { path: 'Data/AppDbContext.cs', content: 'using Microsoft.EntityFrameworkCore;\n\nnamespace MeuBackend.Data;\n\npublic class AppDbContext : DbContext\n{\n    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }\n}\n' }
        ];

        csFiles.forEach(file => {
            const fullPath = path.join(projectPath, file.path);
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, file.content);
        });
    }
       else if (framework === 'javaspring') {
    const javaFiles = [
        { path: 'src/main/java/com/example/Application.java', content: `package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}` },
        { path: 'src/main/java/com/example/controllers/HomeController.java', content: `package com.example.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "{\"message\": \"API rodando!\"}";
    }
}` },
        { path: 'src/main/java/com/example/controllers/UsuarioController.java', content: 'package com.example.controllers;\n\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class UsuarioController {}\n' },
        { path: 'src/main/java/com/example/controllers/AuthController.java', content: 'package com.example.controllers;\n\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class AuthController {}\n' },
        { path: 'src/main/java/com/example/services/UsuarioService.java', content: 'package com.example.services;\n\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class UsuarioService {}\n' },
        { path: 'src/main/java/com/example/services/AuthService.java', content: 'package com.example.services;\n\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class AuthService {}\n' },
        { path: 'src/main/java/com/example/repositories/UsuarioRepository.java', content: 'package com.example.repositories;\n\nimport org.springframework.stereotype.Repository;\n\n@Repository\npublic class UsuarioRepository {}\n' },
        { path: 'src/main/java/com/example/models/Usuario.java', content: 'package com.example.models;\n\nimport jakarta.persistence.Entity;\nimport jakarta.persistence.Id;\n\n@Entity\npublic class Usuario {\n    @Id\n    private Long id;\n}' },
        { path: 'src/main/java/com/example/config/SecurityConfig.java', content: `package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests()
            .anyRequest().permitAll();
        return http.build();
    }
}` },
        { path: 'src/main/resources/application.properties', content: `server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/meu_banco
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update` }
    ];

    javaFiles.forEach(file => {
        const fullPath = path.join(projectPath, file.path);
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, file.content);
    });
}
}