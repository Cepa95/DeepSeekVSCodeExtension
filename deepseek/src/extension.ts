import * as vscode from "vscode";
import axios from "axios";
import { getWebviewContent } from "./webviewContent";

async function queryDeepSeek(input: string): Promise<string> {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-r1:1.5b",
      prompt: input,
      stream: false,
    });

    return response.data.response;
  } catch (error) {
    console.error("Error querying DeepSeek:", error);
    return "Error fetching response from DeepSeek.";
  }
}

export function activate(context: vscode.ExtensionContext) {
  // let disposable = vscode.commands.registerCommand(
  //   "deepseek.askDeepSeek",
  //   async () => {
  //     const input = await vscode.window.showInputBox({
  //       prompt: "Enter your prompt for DeepSeek AI",
  //     });
  //     if (!input) {
  //       return;
  //     }

  //     const response = await queryDeepSeek(input);
  //     vscode.window.showInformationMessage(response);
  //   }
  // );

  let disposable = vscode.commands.registerCommand(
    "deepseek.askDeepSeek",
    async () => {
      const panel = vscode.window.createWebviewPanel(
        "deepseekPanel",
        "DeepSeek AI",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = await getWebviewContent(
        panel.webview,
        context.extensionPath
      );

      panel.webview.onDidReceiveMessage(async (message) => {
        if (message.command === "ask") {
          const response = await queryDeepSeek(message.text);
          panel.webview.postMessage({ command: "response", text: response });
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
