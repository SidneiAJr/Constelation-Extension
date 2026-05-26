import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { 
    generateNodeProject, 
    generateSpringProject, 
    generatePhpProject, 
    generateCSharpProject, 
    generateTypeScriptProject 
} from '../templates/index';

export async function createProject(architecture: string = 'mvc') {
    try {
        // 1. Ask for project name
        const projectName = await vscode.window.showInputBox({
            prompt: '📁 Project name',
            placeHolder: 'my-awesome-project',
            validateInput: (value) => {
                if (!value) return 'Project name is required';
                if (!/^[a-z0-9-_]+$/.test(value)) return 'Use only lowercase letters, numbers, hyphens and underscores';
                return null;
            }
        });
        if (!projectName) return;

        // 2. Ask for framework
        const framework = await vscode.window.showQuickPick(
            [
                { label: '🟨 JavaScript (Node.js)', value: 'javascript' },
                { label: '💙 TypeScript (Node.js)', value: 'typescript' },
                { label: '☕ Java (Spring Boot)', value: 'java' },
                { label: '🐘 PHP (Slim)', value: 'php' },
                { label: '🟦 C# (ASP.NET Core)', value: 'csharp' }
            ],
            { placeHolder: '📌 Select framework' }
        );
        if (!framework) return;

        // 3. Ask for architecture if not provided
        let selectedArchitecture = architecture;
        if (selectedArchitecture === 'mvc') {
            const arch = await vscode.window.showQuickPick(
                [
                    { label: '🏗️ MVC', value: 'mvc', description: 'Model-View-Controller (classic)' },
                    { label: '📦 MMVC', value: 'mmvc', description: 'Modular MVC' },
                    { label: '🎯 DDD', value: 'ddd', description: 'Domain-Driven Design' },
                    { label: '✨ Clean', value: 'clean', description: 'Clean Architecture' },
                    { label: '🔷 Hexagonal', value: 'hexagonal', description: 'Ports & Adapters' },
                    { label: '📡 Event-Driven', value: 'event-driven', description: 'Event-Driven Architecture' }
                ],
                { placeHolder: '🏛️ Select architecture' }
            );
            if (!arch) return;
            selectedArchitecture = arch.value;
        }

        // 4. Show selected options
        const architectureNames: Record<string, string> = {
            mvc: '🏗️ MVC',
            mmvc: '📦 MMVC',
            ddd: '🎯 DDD',
            clean: '✨ Clean Architecture',
            hexagonal: '🔷 Hexagonal',
            'event-driven': '📡 Event-Driven'
        };
        
        vscode.window.showInformationMessage(`Creating ${projectName} with ${architectureNames[selectedArchitecture]} + ${framework.label}`);

        // 5. Ask for location
        let workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        
        if (!workspacePath) {
            const selected = await vscode.window.showOpenDialog({
                canSelectFolders: true,
                canSelectFiles: false,
                canSelectMany: false,
                title: 'Select project location'
            });
            if (!selected) return;
            workspacePath = selected[0].fsPath;
        }

        const projectPath = path.join(workspacePath, projectName);

        // 6. Check if folder already exists
        if (fs.existsSync(projectPath)) {
            const overwrite = await vscode.window.showWarningMessage(
                `Folder ${projectName} already exists. Overwrite?`,
                'Yes', 'No'
            );
            if (overwrite !== 'Yes') return;
            fs.rmSync(projectPath, { recursive: true, force: true });
        }

        // 7. Create project folder
        fs.mkdirSync(projectPath, { recursive: true });

        // 8. Create basic folder structure based on architecture
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `🚀 Creating ${projectName}...`,
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0, message: 'Creating folders...' });
            
            // Create architecture-specific folders
            createFoldersByArchitecture(selectedArchitecture, projectPath);
            
            progress.report({ increment: 30, message: 'Creating base files...' });
            
            // Create base files
            createBaseFiles(projectPath, projectName, selectedArchitecture);
            
            progress.report({ increment: 50, message: 'Generating framework files...' });
            
            // Generate framework-specific project
            switch (framework.value) {
                case 'javascript':
                    await generateNodeProject(projectPath, projectName);
                    break;
                case 'typescript':
                    await generateTypeScriptProject(projectPath, projectName);
                    break;
                case 'java':
                    await generateSpringProject(projectPath, projectName);
                    break;
                case 'php':
                    await generatePhpProject(projectPath, projectName);
                    break;
                case 'csharp':
                    await generateCSharpProject(projectPath, projectName);
                    break;
            }
            
            progress.report({ increment: 100, message: 'Done!' });
        });

        // 9. Success message
        const openFolder = await vscode.window.showInformationMessage(
            `✅ Project ${projectName} created successfully!`,
            '📂 Open in VS Code', '📋 Copy Path', '👍 Great'
        );
        
        if (openFolder === '📂 Open in VS Code') {
            vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(projectPath));
        } else if (openFolder === '📋 Copy Path') {
            vscode.env.clipboard.writeText(projectPath);
            vscode.window.showInformationMessage('📋 Path copied!');
        }

    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error creating project: ${error}`);
        console.error(error);
    }
}

// Helper function to create folders by architecture
function createFoldersByArchitecture(architecture: string, projectPath: string) {
    const commonFolders = [
        'public/css', 'public/js', 'public/images', 'public/uploads',
        'tests/unit', 'tests/integration', 'tests/e2e',
        'logs', 'tmp', 'docs', 'scripts'
    ];
    
    const architectureFolders: Record<string, string[]> = {
        mvc: [
            'src/controllers', 'src/models', 'src/views', 'src/routes',
            'src/middleware', 'src/config', 'src/utils', 'src/validators'
        ],
        mmvc: [
            'modules/user/controllers', 'modules/user/models', 'modules/user/services',
            'modules/product/controllers', 'modules/product/models', 'modules/product/services',
            'shared/middleware', 'shared/utils', 'shared/validators'
        ],
        ddd: [
            'src/domain/entities', 'src/domain/value-objects', 'src/domain/repositories',
            'src/application/usecases', 'src/application/dtos', 'src/application/mappers',
            'src/infrastructure/persistence', 'src/infrastructure/http',
            'src/interfaces/controllers', 'src/interfaces/routes'
        ],
        clean: [
            'src/entities', 'src/usecases', 'src/controllers',
            'src/gateways', 'src/presenters', 'src/frameworks'
        ],
        hexagonal: [
            'src/core/domain', 'src/core/application',
            'src/ports/incoming', 'src/ports/outgoing',
            'src/adapters/incoming', 'src/adapters/outgoing'
        ],
        'event-driven': [
            'src/events', 'src/handlers', 'src/consumers',
            'src/publishers', 'src/commands', 'src/queries',
            'src/domain', 'src/infrastructure'
        ]
    };
    
    // Create architecture-specific folders
    const folders = architectureFolders[architecture] || architectureFolders.mvc;
    [...commonFolders, ...folders].forEach(folder => {
        fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });
}

// Helper function to create base files
function createBaseFiles(projectPath: string, projectName: string, architecture: string) {
    // README.md
    const readmeContent = `# ${projectName}

## Architecture: ${architecture.toUpperCase()}

## Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

## Structure

Created with **Constellation CLI**

---
Generated with ❤️
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);

    // .gitignore
    const gitignore = `node_modules/
.env
logs/
dist/
.DS_Store
`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

    // .env.example
    const envExample = `PORT=3000
NODE_ENV=development
`;
    fs.writeFileSync(path.join(projectPath, '.env.example'), envExample);
}