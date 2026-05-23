import * as vscode from 'vscode';
import { createProject } from './commands/createProject';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 Constellation Project Creator is now active!');

    let disposable = vscode.commands.registerCommand('constellation.createProject', async () => {
        await createProject();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}