// commands/createProject.ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { generateCSharpProject, generatePhpProject, generateTypeScriptProject, generateNodeProject, generateSparkProject, generateSpringProject } from '../templates';
import { generateStructure } from '../templates/TemplateStrure';
import { generateBaseFiles } from '../templates/TemplateFiles';

export async function createProject() {
    // 1. Nome do projeto
    const projectName = await vscode.window.showInputBox({ 
        prompt: 'Nome do projeto',
        placeHolder: 'meu-backend',
        validateInput: (value) => {
            if (!value) return 'Nome obrigatório';
            if (!/^[a-z0-9-_]+$/.test(value)) return 'Use letras minúsculas, números, - ou _';
            return null;
        }
    });
    if (!projectName) return;

    // 2. Framework
    const framework = await vscode.window.showQuickPick([
        { label: '💙 TypeScript (Node.js)', value: 'typescript' },
        { label: '🟨 JavaScript (Node.js)', value: 'javascript' },
        { label: '☕ Java (Spark Framework)', value: 'java' },
         { label: '☕ Java (Spring Boot)', value: 'javaspring' },
        { label: '🐘 PHP (Slim Framework)', value: 'php' },
        { label: '🟦 C# (ASP.NET Core)', value: 'csharp' }
    ], { placeHolder: 'Escolha o framework' });
    if (!framework) return;

    // 3. Arquitetura
    const architecture = await vscode.window.showQuickPick([
        { label: '🏗️ MVC (padrão)', value: 'mvc', picked: true },
        { label: '🎯 DDD', value: 'ddd' },
        { label: '✨ Clean Architecture', value: 'clean' },
        { label: '🔷 Hexagonal', value: 'hexagonal' }
    ], { placeHolder: 'Arquitetura' });
    
    // 4. Banco de dados (opcional)
    await vscode.window.showQuickPick([
        { label: '🐬 MySQL', value: 'mysql', picked: true },
        { label: '🐘 PostgreSQL', value: 'postgres' },
        { label: '🍃 MongoDB', value: 'mongodb' },
        { label: '💾 SQLite', value: 'sqlite' },
        { label: 'Nenhum', value: 'none' }
    ], { placeHolder: 'Banco de dados (seleção futura)' });

    // 5. Local do projeto
    let workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspacePath) {
        const selected = await vscode.window.showOpenDialog({ 
            canSelectFolders: true,
            title: 'Onde criar o projeto?'
        });
        if (!selected) return;
        workspacePath = selected[0].fsPath;
    }

    const projectPath = path.join(workspacePath, projectName);

    // 6. Verificar se já existe
    if (fs.existsSync(projectPath)) {
        const overwrite = await vscode.window.showWarningMessage(
            `Pasta ${projectName} já existe. Sobrescrever?`,
            'Sim', 'Não'
        );
        if (overwrite !== 'Sim') return;
        fs.rmSync(projectPath, { recursive: true, force: true });
    }

    // 7. Criar projeto
    fs.mkdirSync(projectPath, { recursive: true });

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `🚀 Criando ${projectName}...`,
        cancellable: false
    }, async (progress) => {
        progress.report({ increment: 0, message: 'Criando estrutura...' });

        const archValue = architecture?.value || 'mvc';
        generateStructure(archValue, projectPath);

        progress.report({ increment: 20, message: 'Criando arquivos base...' });
        
        // Cria os arquivos vazios da estrutura
        generateBaseFiles(projectPath, framework.value);

        progress.report({ increment: 30, message: 'Gerando arquivos do framework...' });

        const fw = framework.value;
        
        if (fw === 'javascript') {
            await generateNodeProject(projectPath, projectName);
        } else if (fw === 'typescript') {
            await generateTypeScriptProject(projectPath, projectName);
        } else if (fw === 'java') {
            await generateSparkProject(projectPath, projectName);
        } else if (fw === 'php') {
            await generatePhpProject(projectPath, projectName);
        } else if (fw === 'csharp') {
            await generateCSharpProject(projectPath, projectName);
        }else if (fw === 'javaspring') {
            await generateSpringProject(projectPath, projectName);
        }

        progress.report({ increment: 100, message: 'Concluído!' });
    });

    // 8. Docker
    const withDocker = await vscode.window.showQuickPick(
        ['Sim', 'Não'],
        { placeHolder: '🐳 Gerar Dockerfile?' }
    );

    if (withDocker === 'Sim') {
        vscode.window.showInformationMessage('✅ Dockerfile já está no projeto!');
    }

    // 9. Abrir projeto
    const open = await vscode.window.showInformationMessage(
        `✅ ${projectName} criado com sucesso!`,
        '📂 Abrir projeto'
    );
    
    if (open === '📂 Abrir projeto') {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(projectPath));
    }
}