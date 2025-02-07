import * as vscode from "vscode";
import axios from "axios";
import { getWebviewContent } from "./webviewContent";

async function queryDeepSeek(input: string, panel: vscode.WebviewPanel) {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "deepseek-r1:1.5b",
        prompt: input,
        stream: true,
      },
      { responseType: "stream" }
    );

    let accumulatedResponse = "";

    response.data.on("data", (chunk: Buffer) => {
      const textChunk = chunk.toString();
      try {
        const parsedChunk = JSON.parse(textChunk);
        accumulatedResponse += parsedChunk.response;
        panel.webview.postMessage({
          command: "responseChunk",
          text: parsedChunk.response,
        });
      } catch (error) {
        console.error("Error parsing response chunk:", error);
      }
    });

    response.data.on("end", () => {
      panel.webview.postMessage({
        command: "responseComplete",
        text: accumulatedResponse,
      });
    });

    console.log("Done streaming response.");
  } catch (error) {
    console.error("Error querying DeepSeek:", error);
  }
}

async function saveResponseToFile(responseText: string) {
  const uri = await vscode.window.showSaveDialog({
    saveLabel: "Save Response",
    filters: {
      "Text Files": ["txt"],
      "All Files": ["*"],
    },
  });

  if (uri) {
    await vscode.workspace.fs.writeFile(uri, Buffer.from(responseText, "utf8"));
    vscode.window.showInformationMessage(`Response saved to ${uri.fsPath}`);
  } else {
    vscode.window.showWarningMessage("Save operation was cancelled.");
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
          const response = await queryDeepSeek(message.text, panel);
          panel.webview.postMessage({ command: "response", text: response });
        } else if (message.command === "saveResponse") {
          const responseText = message.text;
          await saveResponseToFile(responseText);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
