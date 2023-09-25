const vscode = require('vscode');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.insertLineNumber', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = editor.selection.active;
      const lineNumber = position.line + 1;
      const lineText = editor.document.lineAt(position.line).text;
      const indentation = lineText.substring(0, lineText.length - lineText.trimLeft().length);

      editor.edit((editBuilder) => {
        editBuilder.insert(position, `${indentation}${lineNumber.toString()}: `);
      });
    }
  });

  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;