# UniversalSnippetSync README

Universal Snippet Sync is a productivity tool that allows you to maintain "single source" code blocks across your entire workspace. Whether it's a shared navigation bar in HTML, a common set of variables in CSS, or a header comment in Javascript, this extension ensures your changes are mirrored everywhere instantly.

## Features

Surgical Replacement: Only replaces the code between your defined start and end comments.

Auto Type-Detection: Right-click any file (HTML, CSS, JS, etc.), and the extension automatically finds all other files of that same type to update.

Workspace-Wide: Scans your entire project folder while respecting your custom exclusion rules.

Safety: Skips files that have a starting comment but are missing a closing comment to prevent accidental code deletion.

## How To Use

Tag your code: Wrap the code you want to sync in start and end comments in both the snippet file and the target files you wish to update.
<!-- nav start -->
... your code here ...
<!-- nav end -->

Right-Click: In the File Explorer, right-click the file that contains your "master" version of that code.

Sync: Select "Sync Snippet Across Files" from the menu.

## Extension Settings

snippetQuickChange.snippetFile: The default relative path to your primary snippet file (used when running via Command Palette).

snippetQuickChange.exludeFolders: An array of folder names or files to skip (e.g., node_modules, .git, dist).
Default: [".git"]

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes
Regex Sensitivity: Ensure your start and end lines in the snippet file match the targets exactly (including spacing).
### 1.0.0

Initial release

  

**Enjoy!**
