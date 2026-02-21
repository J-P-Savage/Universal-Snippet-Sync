// The module 'vscode' contains the VS Code extensibility API
 

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	 
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('universalsnippetsync.runUpdate', async (uri) => {
		try{
			const qtyChanged =await replaceContent(uri);
			 vscode.window.showInformationMessage(qtyChanged+' Changes Complete!');

		}
		catch (err)
		{
			 vscode.window.showErrorMessage(err.message);
		}
		

		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

async function replaceContent(thisUri) {
	const config = vscode.workspace.getConfiguration('UniversalSnippetSync');
	const excludeFolders = config.get('excludeFolders');

	//read file -- make into string
	let snippetFile; 
	if(typeof thisUri == 'undefined' || !thisUri ||!thisUri.fsPath){  
		const snippetPath = config.get('snippetFile'); 
		const workspaceRoot = vscode.workspace.workspaceFolders[0].uri;
		thisUri = vscode.Uri.joinPath(workspaceRoot,snippetPath);
	}
	if(!thisUri || !thisUri.fsPath){
		vscode.window.showErrorMessage("File path was not valid fsPath (File System Path)")
		return 0;
	}
	snippetFile = await vscode.workspace.fs.readFile(thisUri);

	const snippetContent = Buffer.from(snippetFile).toString('utf8');

	//split by lines -- remove empty lines
	const snippetLines = snippetContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

	const startRegexPattern = snippetLines[0].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const endRegexPattern = snippetLines[snippetLines.length-1].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const regex = new RegExp(`${startRegexPattern}[\\s\\S]*?${endRegexPattern}`, 'g');

	const fileType = path.extname(thisUri.fsPath);

	const folderExclusions = `{${excludeFolders.map(folder => `**/${folder}/**`).join(',')}}`; 
	const files = await vscode.workspace.findFiles(`**/*${fileType}`, folderExclusions);

	const transaction = new vscode.WorkspaceEdit();
	
	let counter = 0;
	for (const filePath of files){
		if (filePath.fsPath == thisUri.fsPath) continue; //skip the snippet file

		const doc = await vscode.workspace.openTextDocument(filePath);
		const text = doc.getText();

		regex.lastIndex=0;
		const match = regex.exec(text);

		if (text.includes(startRegexPattern) && text.includes(endRegexPattern)){
			counter++;
			const start = doc.positionAt(match.index);
			const end =  doc.positionAt(match.index + match[0].length); //match[0].length is total length that was found
			const range = new vscode.Range(start,end);

			transaction.replace(filePath , range , snippetContent);			

		}
		else{
			if (text.includes(startRegexPattern)) console.log(`${filePath} contains starting comment but has no closing comment`);
			if (text.includes(endRegexPattern)) console.log(`${filePath} contains closing comment but has no starting comment`);
		}

	}	
	await vscode.workspace.applyEdit(transaction);

	return counter;
}