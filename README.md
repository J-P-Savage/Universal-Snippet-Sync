# UniversalSnippetSync

Universal Snippet Sync is a productivity tool that allows you to maintain "single source" code blocks across your entire workspace. Whether it's a shared navigation bar in HTML, common variables in CSS, or a header comment in JavaScript, this extension ensures your changes are mirrored everywhere instantly.

## Features

* **Syntax Agnostic:** Works with any comment or tag style—`// JS`, `/* CSS */`, ``, or even custom markers like `[start]`. If it matches, it syncs.
* **Surgical Replacement:** Only replaces the code between your defined start and end comments.
* **Auto Type-Detection:** Right-click any file, and the extension finds all other files of that same type to update.
* **Workspace-Wide:** Scans your entire project folder while respecting your custom exclusion rules.
* **Safety:** Skips files that have a starting comment but are missing a closing comment to prevent accidental code deletion.

## How To Use

1.  **Tag your code:** Wrap the code you want to sync in start and end comments. 
    > **Note:** The tags are **case-sensitive** and must match exactly (including spacing).

``` 
<!-- my-snippet-start -->
    ... your code here ...
<!-- my-snippet-end -->
```

2.  **Right-Click:** In the File Explorer, right-click the file that contains your "master" version of that code.
3.  **Sync:** Select **"Sync Snippet Across Files"** from the context menu.

## Extension Settings

* `snippetQuickChange.snippetFile`: The default relative path to your primary snippet file.
* `snippetQuickChange.exludeFolders`: An array of folder names or files to skip.
    * **Default:** `[".git"]`

## Known Issues

* **Case Sensitivity:** Ensure your start and end lines match exactly. `// Start` will not match `// start`.
* **Regex Sensitivity:** Ensure spacing matches perfectly between the master file and target files.

## Release Notes

### 1.0.2

* Updated documentation to highlight syntax-agnostic support and case sensitivity.
* Fixed README formatting issues for better Marketplace visibility.

### 1.0.0
* Initial release

---
**Enjoy!**