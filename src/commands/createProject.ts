import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { generateNodeProject, generateSpringProject, generatePhpProject, generateCSharpProject, generateTypeScriptProject } from '../templates/index';

export async function createProject() {
    // 1. Ask for project name
    const projectName = await vscode.window.showInputBox({
        prompt: '📁 Project name',
        placeHolder: 'my-awesome-project'
    });
    if (!projectName) return;

    // 2. Ask for framework
    const framework = await vscode.window.showQuickPick(
        [
            '🚀 Node.js (Express)',
            '☕ Java (Spring Boot)',
            '🐘 PHP (Slim)',
            '🔷 C# (ASP.NET Core)',
            '📘 TypeScript'
        ],
        { placeHolder: '📌 Select framework' }
    );
    if (!framework) return;

    // 3. Get workspace path
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd();
    const projectPath = path.join(workspacePath, projectName);

    // 4. Create project folder
    fs.mkdirSync(projectPath, { recursive: true });

    // ================================
    // 5. CREATE COMPLETE FOLDER STRUCTURE
    // ================================
    const folders = [
        // Backend core
        'src',
        'src/controllers',
        'src/models',
        'src/services',
        'src/repositories',
        'src/middleware',
        'src/config',
        'src/utils',
        'src/helpers',
        'src/dto',
        'src/validators',
        'src/exceptions',
        'src/routes',
        
        // Frontend (if applicable)
        'public',
        'public/css',
        'public/js',
        'public/images',
        'views',
        
        // Tests
        'tests',
        'tests/unit',
        'tests/integration',
        
        // Documentation
        'docs',
        
        // Infrastructure
        'scripts',
        '.vscode'
    ];

    folders.forEach(folder => {
        fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    // ================================
    // 6. CREATE BASE FILES
    // ================================
    
    // README.md
    const readmeContent = `# ${projectName}

## 📋 Description
Project created with Constellation CLI

## 🚀 Getting Started

### Prerequisites
- Node.js (for JavaScript/TypeScript projects)
- Java 17+ (for Spring Boot)
- PHP 8+ (for Slim)
- .NET 8+ (for C#)

### Installation
\`\`\`bash
npm install
# or
mvn install
# or
composer install
# or
dotnet restore
\`\`\`

### Running the project
\`\`\`bash
npm run dev
# or
mvn spring-boot:run
# or
php -S localhost:8000 -t public
# or
dotnet run
\`\`\`

## 📁 Project Structure

\`\`\`
${projectName}/
├── src/           # Source code
├── tests/         # Test files
├── public/        # Static assets
├── docs/          # Documentation
└── scripts/       # Utility scripts
\`\`\`

## 📄 License
MIT
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);

    // .gitignore
    const gitignoreContent = `# Dependencies
node_modules/
vendor/
packages/

# Build outputs
dist/
build/
out/
target/
bin/
obj/

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
!.vscode/launch.json
!.vscode/tasks.json
.idea/
*.suo
*.user

# OS
.DS_Store
Thumbs.db

# Test coverage
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);

    // .env.example
    const envExampleContent = `# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=
DB_PORT
DB_USER=
DB_PASSWORD=
DB_NAME=

# Security
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=1d

# API Keys
API_KEY=
`;
    fs.writeFileSync(path.join(projectPath, '.env.example'), envExampleContent);

    // LICENSE
    const licenseContent = `MIT License

Copyright (c) 2025 Constellation CLI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
    fs.writeFileSync(path.join(projectPath, 'LICENSE'), licenseContent);

    // Show progress
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Creating ${projectName} project...`,
        cancellable: false
    }, async () => {
        // 7. Framework-specific generation
        if (framework.includes('Node.js')) {
            await generateNodeProject(projectPath, projectName);
        } else if (framework.includes('Spring')) {
            await generateSpringProject(projectPath, projectName);
        } else if (framework.includes('PHP')) {
            await generatePhpProject(projectPath, projectName);
        } else if (framework.includes('C#')) {
            await generateCSharpProject(projectPath, projectName);
        } else if (framework.includes('TypeScript')) {
            await generateTypeScriptProject(projectPath, projectName);
        }
    });

    // 8. Ask to open project
    const openFolder = await vscode.window.showInformationMessage(
        `✅ Project ${projectName} created successfully! Open in VS Code?`,
        'Yes', 'No'
    );
    if (openFolder === 'Yes') {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(projectPath));
    }
}

