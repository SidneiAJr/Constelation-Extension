// TemplateStrure.ts
import * as fs from 'fs';
import * as path from 'path';

export function structure() {
    // ... sua função structure existente
}

export function generateStructure(architecture: string, projectPath: string, projectName: string) {
    const structures = {
        mvc: () => createMVCStructure(projectPath, projectName),
        mmvc: () => createMMVCStructure(projectPath, projectName),
        ddd: () => createDDDStructure(projectPath, projectName),
        clean: () => createCleanStructure(projectPath, projectName),
        hexagonal: () => createHexagonalStructure(projectPath, projectName),
        'event-driven': () => createEventDrivenStructure(projectPath, projectName)
    };
    
    const creator = structures[architecture];
    if (creator) {
        creator();
    } else {
        createMVCStructure(projectPath, projectName);
    }
}

function createMVCStructure(projectPath: string, projectName: string) {
    const folders = [
        'src/controllers', 'src/models', 'src/views', 'src/routes',
        'src/config', 'src/utils', 'src/middleware',
        'public/css', 'public/js', 'public/images',
        'tests/unit', 'tests/integration'
    ];
    createFolders(projectPath, folders);
}

function createDDDStructure(projectPath: string, projectName: string) {
    const folders = [
        'src/domain/entities', 'src/domain/value-objects', 'src/domain/repositories',
        'src/application/usecases', 'src/application/dtos', 'src/application/mappers',
        'src/infrastructure/persistence', 'src/infrastructure/http', 'src/infrastructure/security',
        'src/interfaces/controllers', 'src/interfaces/middleware', 'src/interfaces/routes',
        'tests/unit', 'tests/integration', 'tests/e2e',
        'public', 'docs'
    ];
    createFolders(projectPath, folders);
}

function createCleanStructure(projectPath: string, projectName: string) {
    const folders = [
        'src/entities', 'src/usecases', 'src/controllers',
        'src/gateways', 'src/presenters', 'src/frameworks',
        'tests/unit', 'tests/integration',
        'config', 'docs'
    ];
    createFolders(projectPath, folders);
}

function createHexagonalStructure(projectPath: string, projectName: string) {
    const folders = [
        'src/core/domain', 'src/core/application',
        'src/ports/incoming', 'src/ports/outgoing',
        'src/adapters/incoming', 'src/adapters/outgoing',
        'src/config', 'tests/unit', 'tests/integration'
    ];
    createFolders(projectPath, folders);
}

function createEventDrivenStructure(projectPath: string, projectName: string) {
    const folders = [
        'src/events', 'src/handlers', 'src/consumers',
        'src/publishers', 'src/commands', 'src/queries',
        'src/domain', 'src/infrastructure',
        'tests/unit', 'tests/integration',
        'config'
    ];
    createFolders(projectPath, folders);
}

function createMMVCStructure(projectPath: string, projectName: string) {
    const folders = [
        'modules/user/controllers', 'modules/user/models', 'modules/user/services',
        'modules/product/controllers', 'modules/product/models', 'modules/product/services',
        'shared/middleware', 'shared/utils', 'shared/validators',
        'public/css', 'public/js', 'public/images',
        'tests/unit', 'tests/integration'
    ];
    createFolders(projectPath, folders);
}

function createFolders(projectPath: string, folders: string[]) {
    folders.forEach(folder => {
        fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });
}