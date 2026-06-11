// templates/TemplateStructure.ts
import * as fs from 'fs';
import * as path from 'path';

export function generateStructure(architecture: string, projectPath: string) {
    const structures: Record<string, string[]> = {
        mvc: [
            'src/controllers',
            'src/services',
            'src/repositories',
            'src/models',
            'src/middlewares',
            'src/routes',
            'src/config',
            'src/utils'
        ],
        ddd: [
            'src/domain/entities',
            'src/domain/repositories',
            'src/application/services',
            'src/application/dtos',
            'src/infrastructure/persistence',
            'src/infrastructure/http',
            'src/interfaces/controllers'
        ],
        clean: [
            'src/entities',
            'src/usecases',
            'src/controllers',
            'src/repositories',
            'src/presenters'
        ],
        hexagonal: [
            'src/core/domain',
            'src/core/application',
            'src/ports/incoming',
            'src/ports/outgoing',
            'src/adapters/incoming',
            'src/adapters/outgoing',
            'src/adapters/persistence',
            'src/config'
        ],
        onion: [
            'src/domain/models',
            'src/domain/services',
            'src/application/services',
            'src/application/dtos',
            'src/infrastructure/persistence',
            'src/infrastructure/http',
            'src/infrastructure/security',
            'src/infrastructure/config'
        ],
        cqrs: [
            'src/commands',
            'src/queries',
            'src/handlers',
            'src/domain/entities',
            'src/domain/repositories',
            'src/infrastructure/write',
            'src/infrastructure/read',
            'src/infrastructure/http',
            'src/controllers',
            'src/config'
        ],
        layered: [
            'src/presentation',
            'src/application',
            'src/domain',
            'src/infrastructure',
            'src/shared'
        ]
    };

    const folders = structures[architecture] || structures.mvc;
    folders.forEach(folder => {
        fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });
}