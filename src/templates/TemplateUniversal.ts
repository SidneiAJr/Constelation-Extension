// templates/TemplateUniversal.ts
import * as fs from 'fs';
import * as path from 'path';

export function generateUniversalMVC(projectPath: string, framework: string) {
    switch (framework) {
        case 'typescript': generateTS(projectPath); break;
        case 'javascript': generateJS(projectPath); break;
        case 'php':        generatePHP(projectPath); break;
        case 'java':       generateJavaSpark(projectPath); break;
        case 'javaspring': generateJavaSpring(projectPath); break;
        case 'csharp':     generateCSharp(projectPath); break;
    }
}

// ==============================
// TYPESCRIPT
// ==============================
function generateTS(projectPath: string) {

    const repository = `// UsuarioRepository.ts

export class UsuarioRepository {

    async create(data: any): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findById(id: number): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findByEmail(email: string): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findByUsername(username: string): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findAll(): Promise<any[]> {
        // TODO: adicione sua lógica aqui
    }

    async update(id: number, data: any): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async delete(id: number): Promise<void> {
        // TODO: adicione sua lógica aqui
    }
}
`;

    const service = `// UsuarioService.ts
import { UsuarioRepository } from '../repositories/UsuarioRepository';

const repository = new UsuarioRepository();

export class UsuarioService {

    async create(data: any): Promise<any> {
        // TODO: adicione sua lógica aqui
        return await repository.create(data);
    }

    async findById(id: number): Promise<any> {
        // TODO: adicione sua lógica aqui
        return await repository.findById(id);
    }

    async findByEmail(email: string): Promise<any> {
        // TODO: adicione sua lógica aqui
        return await repository.findByEmail(email);
    }

    async findByUsername(username: string): Promise<any> {
        // TODO: adicione sua lógica aqui
        return await repository.findByUsername(username);
    }

    async findAll(): Promise<any[]> {
        // TODO: adicione sua lógica aqui
        return await repository.findAll();
    }

    async update(id: number, data: any): Promise<any> {
        // TODO: adicione sua lógica aqui
        return await repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        // TODO: adicione sua lógica aqui
        await repository.delete(id);
    }
}
`;

    const controller = `// UsuarioController.ts
import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';

const service = new UsuarioService();

export class UsuarioController {

    async index(req: Request, res: Response): Promise<void> {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err: any) {
            // TODO: trate o erro aqui
        }
    }

    async show(req: Request, res: Response): Promise<void> {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err: any) {
            // TODO: trate o erro aqui
        }
    }

    async store(req: Request, res: Response): Promise<void> {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err: any) {
            // TODO: trate o erro aqui
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err: any) {
            // TODO: trate o erro aqui
        }
    }

    async destroy(req: Request, res: Response): Promise<void> {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err: any) {
            // TODO: trate o erro aqui
        }
    }
}
`;

    writeFile(projectPath, 'src/repositories/UsuarioRepository.ts', repository);
    writeFile(projectPath, 'src/services/UsuarioService.ts', service);
    writeFile(projectPath, 'src/controllers/UsuarioController.ts', controller);
}

// ==============================
// JAVASCRIPT
// ==============================
function generateJS(projectPath: string) {

    const repository = `// UsuarioRepository.js

class UsuarioRepository {

    async create(data) {
        // TODO: adicione sua lógica aqui
    }

    async findById(id) {
        // TODO: adicione sua lógica aqui
    }

    async findByEmail(email) {
        // TODO: adicione sua lógica aqui
    }

    async findByUsername(username) {
        // TODO: adicione sua lógica aqui
    }

    async findAll() {
        // TODO: adicione sua lógica aqui
    }

    async update(id, data) {
        // TODO: adicione sua lógica aqui
    }

    async delete(id) {
        // TODO: adicione sua lógica aqui
    }
}

module.exports = UsuarioRepository;
`;

    const service = `// UsuarioService.js
const UsuarioRepository = require('../repositories/UsuarioRepository');

const repository = new UsuarioRepository();

class UsuarioService {

    async create(data) {
        // TODO: adicione sua lógica aqui
        return await repository.create(data);
    }

    async findById(id) {
        // TODO: adicione sua lógica aqui
        return await repository.findById(id);
    }

    async findByEmail(email) {
        // TODO: adicione sua lógica aqui
        return await repository.findByEmail(email);
    }

    async findByUsername(username) {
        // TODO: adicione sua lógica aqui
        return await repository.findByUsername(username);
    }

    async findAll() {
        // TODO: adicione sua lógica aqui
        return await repository.findAll();
    }

    async update(id, data) {
        // TODO: adicione sua lógica aqui
        return await repository.update(id, data);
    }

    async delete(id) {
        // TODO: adicione sua lógica aqui
        await repository.delete(id);
    }
}

module.exports = UsuarioService;
`;

    const controller = `// UsuarioController.js
const UsuarioService = require('../services/UsuarioService');

const service = new UsuarioService();

class UsuarioController {

    async index(req, res) {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err) {
            // TODO: trate o erro aqui
        }
    }

    async show(req, res) {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err) {
            // TODO: trate o erro aqui
        }
    }

    async store(req, res) {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err) {
            // TODO: trate o erro aqui
        }
    }

    async update(req, res) {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err) {
            // TODO: trate o erro aqui
        }
    }

    async destroy(req, res) {
        try {
            // TODO: adicione sua lógica aqui
        } catch (err) {
            // TODO: trate o erro aqui
        }
    }
}

module.exports = UsuarioController;
`;

    writeFile(projectPath, 'src/repositories/UsuarioRepository.js', repository);
    writeFile(projectPath, 'src/services/UsuarioService.js', service);
    writeFile(projectPath, 'src/controllers/UsuarioController.js', controller);
}

// ==============================
// PHP
// ==============================
function generatePHP(projectPath: string) {

    const repository = `<?php

namespace App\\Repositories;

class UsuarioRepository
{
    public function create(array $data): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findById(int $id): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findByEmail(string $email): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findByUsername(string $username): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findAll(): array
    {
        // TODO: adicione sua lógica aqui
    }

    public function update(int $id, array $data): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function delete(int $id): void
    {
        // TODO: adicione sua lógica aqui
    }
}
`;

    const service = `<?php

namespace App\\Services;

use App\\Repositories\\UsuarioRepository;

class UsuarioService
{
    private UsuarioRepository $repository;

    public function __construct()
    {
        $this->repository = new UsuarioRepository();
    }

    public function create(array $data): mixed
    {
        // TODO: adicione sua lógica aqui
        return $this->repository->create($data);
    }

    public function findById(int $id): mixed
    {
        // TODO: adicione sua lógica aqui
        return $this->repository->findById($id);
    }

    public function findByEmail(string $email): mixed
    {
        // TODO: adicione sua lógica aqui
        return $this->repository->findByEmail($email);
    }

    public function findByUsername(string $username): mixed
    {
        // TODO: adicione sua lógica aqui
        return $this->repository->findByUsername($username);
    }

    public function findAll(): array
    {
        // TODO: adicione sua lógica aqui
        return $this->repository->findAll();
    }

    public function update(int $id, array $data): mixed
    {
        // TODO: adicione sua lógica aqui
        return $this->repository->update($id, $data);
    }

    public function delete(int $id): void
    {
        // TODO: adicione sua lógica aqui
        $this->repository->delete($id);
    }
}
`;

    const controller = `<?php

namespace App\\Controllers;

use App\\Services\\UsuarioService;
use Psr\\Http\\Message\\ResponseInterface as Response;
use Psr\\Http\\Message\\ServerRequestInterface as Request;

class UsuarioController
{
    private UsuarioService $service;

    public function __construct()
    {
        $this->service = new UsuarioService();
    }

    public function index(Request $request, Response $response): Response
    {
        try {
            // TODO: adicione sua lógica aqui
        } catch (\\Exception $e) {
            // TODO: trate o erro aqui
        }
    }

    public function show(Request $request, Response $response, array $args): Response
    {
        try {
            // TODO: adicione sua lógica aqui
        } catch (\\Exception $e) {
            // TODO: trate o erro aqui
        }
    }

    public function store(Request $request, Response $response): Response
    {
        try {
            // TODO: adicione sua lógica aqui
        } catch (\\Exception $e) {
            // TODO: trate o erro aqui
        }
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        try {
            // TODO: adicione sua lógica aqui
        } catch (\\Exception $e) {
            // TODO: trate o erro aqui
        }
    }

    public function destroy(Request $request, Response $response, array $args): Response
    {
        try {
            // TODO: adicione sua lógica aqui
        } catch (\\Exception $e) {
            // TODO: trate o erro aqui
        }
    }
}
`;

    writeFile(projectPath, 'app/Repositories/UsuarioRepository.php', repository);
    writeFile(projectPath, 'app/Services/UsuarioService.php', service);
    writeFile(projectPath, 'app/Controllers/UsuarioController.php', controller);
}

// ==============================
// JAVA SPARK
// ==============================
function generateJavaSpark(projectPath: string) {
    const base = 'src/main/java/com/example';

    const repository = `package com.example.repositories;

public class UsuarioRepository {

    public Object create(Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findById(int id) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByEmail(String email) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByUsername(String username) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public java.util.List<Object> findAll() {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object update(int id, Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public void delete(int id) {
        // TODO: adicione sua lógica aqui
    }
}
`;

    const service = `package com.example.services;

import com.example.repositories.UsuarioRepository;

public class UsuarioService {

    private final UsuarioRepository repository = new UsuarioRepository();

    public Object create(Object data) {
        // TODO: adicione sua lógica aqui
        return repository.create(data);
    }

    public Object findById(int id) {
        // TODO: adicione sua lógica aqui
        return repository.findById(id);
    }

    public Object findByEmail(String email) {
        // TODO: adicione sua lógica aqui
        return repository.findByEmail(email);
    }

    public Object findByUsername(String username) {
        // TODO: adicione sua lógica aqui
        return repository.findByUsername(username);
    }

    public java.util.List<Object> findAll() {
        // TODO: adicione sua lógica aqui
        return repository.findAll();
    }

    public Object update(int id, Object data) {
        // TODO: adicione sua lógica aqui
        return repository.update(id, data);
    }

    public void delete(int id) {
        // TODO: adicione sua lógica aqui
        repository.delete(id);
    }
}
`;

    const controller = `package com.example.controllers;

import com.example.services.UsuarioService;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;

public class UsuarioController {

    private final UsuarioService service = new UsuarioService();
    private final Gson gson = new Gson();

    public Object index(Request req, Response res) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    public Object show(Request req, Response res) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    public Object store(Request req, Response res) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    public Object update(Request req, Response res) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    public Object destroy(Request req, Response res) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }
}
`;

    writeFile(projectPath, `${base}/repositories/UsuarioRepository.java`, repository);
    writeFile(projectPath, `${base}/services/UsuarioService.java`, service);
    writeFile(projectPath, `${base}/controllers/UsuarioController.java`, controller);
}

// ==============================
// JAVA SPRING
// ==============================
function generateJavaSpring(projectPath: string) {
    const base = 'src/main/java/com/example';

    const repository = `package com.example.repositories;

import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepository {

    public Object create(Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findById(int id) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByEmail(String email) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByUsername(String username) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public java.util.List<Object> findAll() {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object update(int id, Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public void delete(int id) {
        // TODO: adicione sua lógica aqui
    }
}
`;

    const service = `package com.example.services;

import com.example.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository repository = new UsuarioRepository();

    public Object create(Object data) {
        // TODO: adicione sua lógica aqui
        return repository.create(data);
    }

    public Object findById(int id) {
        // TODO: adicione sua lógica aqui
        return repository.findById(id);
    }

    public Object findByEmail(String email) {
        // TODO: adicione sua lógica aqui
        return repository.findByEmail(email);
    }

    public Object findByUsername(String username) {
        // TODO: adicione sua lógica aqui
        return repository.findByUsername(username);
    }

    public java.util.List<Object> findAll() {
        // TODO: adicione sua lógica aqui
        return repository.findAll();
    }

    public Object update(int id, Object data) {
        // TODO: adicione sua lógica aqui
        return repository.update(id, data);
    }

    public void delete(int id) {
        // TODO: adicione sua lógica aqui
        repository.delete(id);
    }
}
`;

    const controller = `package com.example.controllers;

import com.example.services.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service = new UsuarioService();

    @GetMapping
    public ResponseEntity<?> index() {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    @PostMapping
    public ResponseEntity<?> store(@RequestBody Object body) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Object body) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable int id) {
        try {
            // TODO: adicione sua lógica aqui
            return null;
        } catch (Exception e) {
            // TODO: trate o erro aqui
            return null;
        }
    }
}
`;

    writeFile(projectPath, `${base}/repositories/UsuarioRepository.java`, repository);
    writeFile(projectPath, `${base}/services/UsuarioService.java`, service);
    writeFile(projectPath, `${base}/controllers/UsuarioController.java`, controller);
}

// ==============================
// C#
// ==============================
function generateCSharp(projectPath: string) {

    const repository = `namespace MeuBackend.Repositories;

public class UsuarioRepository
{
    public async Task<object?> Create(object data)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<object?> FindById(int id)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<object?> FindByEmail(string email)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<object?> FindByUsername(string username)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<List<object>> FindAll()
    {
        // TODO: adicione sua lógica aqui
        return new List<object>();
    }

    public async Task<object?> Update(int id, object data)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task Delete(int id)
    {
        // TODO: adicione sua lógica aqui
    }
}
`;

    const service = `using MeuBackend.Repositories;

namespace MeuBackend.Services;

public class UsuarioService
{
    private readonly UsuarioRepository _repository = new();

    public async Task<object?> Create(object data)
    {
        // TODO: adicione sua lógica aqui
        return await _repository.Create(data);
    }

    public async Task<object?> FindById(int id)
    {
        // TODO: adicione sua lógica aqui
        return await _repository.FindById(id);
    }

    public async Task<object?> FindByEmail(string email)
    {
        // TODO: adicione sua lógica aqui
        return await _repository.FindByEmail(email);
    }

    public async Task<object?> FindByUsername(string username)
    {
        // TODO: adicione sua lógica aqui
        return await _repository.FindByUsername(username);
    }

    public async Task<List<object>> FindAll()
    {
        // TODO: adicione sua lógica aqui
        return await _repository.FindAll();
    }

    public async Task<object?> Update(int id, object data)
    {
        // TODO: adicione sua lógica aqui
        return await _repository.Update(id, data);
    }

    public async Task Delete(int id)
    {
        // TODO: adicione sua lógica aqui
        await _repository.Delete(id);
    }
}
`;

    const controller = `using MeuBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeuBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly UsuarioService _service = new();

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        try
        {
            // TODO: adicione sua lógica aqui
            return Ok();
        }
        catch (Exception ex)
        {
            // TODO: trate o erro aqui
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Show(int id)
    {
        try
        {
            // TODO: adicione sua lógica aqui
            return Ok();
        }
        catch (Exception ex)
        {
            // TODO: trate o erro aqui
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Store([FromBody] object body)
    {
        try
        {
            // TODO: adicione sua lógica aqui
            return StatusCode(201);
        }
        catch (Exception ex)
        {
            // TODO: trate o erro aqui
            return StatusCode(500);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] object body)
    {
        try
        {
            // TODO: adicione sua lógica aqui
            return Ok();
        }
        catch (Exception ex)
        {
            // TODO: trate o erro aqui
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Destroy(int id)
    {
        try
        {
            // TODO: adicione sua lógica aqui
            return NoContent();
        }
        catch (Exception ex)
        {
            // TODO: trate o erro aqui
            return StatusCode(500);
        }
    }
}
`;

    writeFile(projectPath, 'Repositories/UsuarioRepository.cs', repository);
    writeFile(projectPath, 'Services/UsuarioService.cs', service);
    writeFile(projectPath, 'Controllers/UsuarioController.cs', controller);
}

// ==============================
// HELPER
// ==============================
function writeFile(projectPath: string, filePath: string, content: string) {
    const fullPath = path.join(projectPath, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}