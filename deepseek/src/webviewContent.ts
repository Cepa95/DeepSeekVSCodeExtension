import { Webview, Uri } from "vscode";
import { readFile } from "fs/promises";
import { join } from "path";

export async function getWebviewContent(
  panel: Webview,
  extensionPath: string
): Promise<string> {
  const htmlPath = join(extensionPath, "src", "webview", "index.html");
  const cssPath = panel.asWebviewUri(
    Uri.file(join(extensionPath, "src", "webview", "style.css"))
  );
  const scriptPath = panel.asWebviewUri(
    Uri.file(join(extensionPath, "src", "webview", "script.js"))
  );

  try {
    let htmlContent = await readFile(htmlPath, "utf8");

    htmlContent = htmlContent
      .replace("{{styleUri}}", cssPath.toString())
      .replace("{{scriptUri}}", scriptPath.toString());

    return htmlContent;
  } catch (error) {
    console.error("Failed to load HTML file:", error);
    return "<h1>Error loading UI</h1>";
  }
}
