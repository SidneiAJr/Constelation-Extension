// templates/TemplateStructure.ts
import * as fs from 'fs';
import * as path from 'path';

export function generateStructure(architecture: string, projectPath: string, framework: string) {

    const base: Record<string, string[]> = {
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
        ]
    };

    // PHP tem estrutura completamente diferente
    const phpBase: Record<string, string[]> = {
        mvc: [
            'app/Controllers',
            'app/Services',
            'app/Repositories',
            'app/Models',
            'app/Middleware',
            'app/Config',
            'public'
        ],
        ddd: [
            'app/Domain/Entities',
            'app/Domain/Repositories',
            'app/Application/Services',
            'app/Application/DTOs',
            'app/Infrastructure/Persistence',
            'app/Infrastructure/Http',
            'app/Interfaces/Controllers',
            'public'
        ],
        clean: [
            'app/Entities',
            'app/UseCases',
            'app/Controllers',
            'app/Repositories',
            'app/Presenters',
            'public'
        ],
        hexagonal: [
            'app/Core/Domain',
            'app/Core/Application',
            'app/Ports/Incoming',
            'app/Ports/Outgoing',
            'app/Adapters/Incoming',
            'app/Adapters/Outgoing',
            'app/Adapters/Persistence',
            'app/Config',
            'public'
        ]
    };

    const extras: Record<string, string[]> = {
        typescript: [
            'src/schemas',
            'src/types',
            'src/exceptions'
        ],
        javascript: [
            'src/schemas',
            'src/types',
            'src/exceptions'
        ],
        php: [
            'app/Requests',
            'app/Exceptions'
        ],
        java: [],
        javaspring: [
            'src/main/java/com/example/dtos',
            'src/main/java/com/example/exceptions'
        ],
        csharp: [
            'DTOs',
            'Exceptions',
            'Interfaces'
        ]
    };

    const folders = framework === 'php'
        ? [...(phpBase[architecture] || phpBase.mvc), ...(extras.php)]
        : [...(base[architecture] || base.mvc), ...(extras[framework] || [])];

    folders.forEach(folder => {
        fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });
}