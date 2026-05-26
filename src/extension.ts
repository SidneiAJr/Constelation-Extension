import * as vscode from 'vscode';
import { createProject } from './commands/createProject';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 Constellation Project Creator is now active!');

    // Comando principal (com arquitetura opcional)
    let disposable = vscode.commands.registerCommand('constellation.createProject', async () => {
        // Perguntar a arquitetura primeiro
        const architecture = await vscode.window.showQuickPick(
            [
                { label: '🏗️ MVC', description: 'Model-View-Controller', value: 'mvc' },
                { label: '📦 MMVC', description: 'Modular MVC', value: 'mmvc' },
                { label: '🎯 DDD', description: 'Domain-Driven Design', value: 'ddd' },
                { label: '✨ Clean Architecture', description: 'Clean Architecture', value: 'clean' },
                { label: '🔷 Hexagonal', description: 'Ports & Adapters', value: 'hexagonal' },
                { label: '📡 Event-Driven', description: 'Event-Driven Architecture', value: 'event-driven' }
            ],
            { placeHolder: '🏛️ Select architecture for your project' }
        );
        
        if (!architecture) return;
        
        await createProject(architecture.value);
    });

    // Comando específico para DDD
    let dddCommand = vscode.commands.registerCommand('constellation.createDDDProject', async () => {
        await createProject('ddd');
    });

    // Comando específico para Clean Architecture
    let cleanCommand = vscode.commands.registerCommand('constellation.createCleanProject', async () => {
        await createProject('clean');
    });

    // Comando específico para Hexagonal
    let hexagonalCommand = vscode.commands.registerCommand('constellation.createHexagonalProject', async () => {
        await createProject('hexagonal');
    });

    context.subscriptions.push(disposable, dddCommand, cleanCommand, hexagonalCommand);
}

export function deactivate() {}