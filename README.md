# DeepSeekVSCodeExtension

A VS Code extension that integrates DeepSeek AI with Ollama, allowing offline AI response generation directly in the editor. 

![deepsek](https://github.com/user-attachments/assets/43825283-d71f-4121-a093-3bf52c1e3c89)

---

## Table of Contents 📜
* [Pros of Using DeepSeek Locally](#-pros-of-using-deepseek-locally)
* [Features](#-features)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)
  * [Clone the Repository](#1️⃣-clone-the-repository)
  * [Install Dependencies](#2️⃣-install-dependencies)
  * [Run the Extension in VS Code](#3️⃣-run-the-extension-in-vs-code)
---

### **🔹 Pros of Using DeepSeek Locally**  

- **🛡️ Full Privacy & Security** – Your data stays on your machine, ensuring that no sensitive information is sent to third parties.  
- **⚡ Faster Response Times** – No need to wait for network requests; everything runs locally, making interactions quicker.  
- **🚀 Works Offline** – Since the model is running on your computer, you can use it even without an internet connection.  
- **🔧 Full Control & Customization** – You can tweak and optimize the model, upgrade hardware, or switch models based on your needs.  
- **💸 No API Costs** – Avoid recurring fees or limitations from paid API services.  
---

### **🚀 Features**  
- Query DeepSeek AI directly from VS Code  
- Webview-based UI for easy interaction  
- Ability to save responses to a file  
- Supports different models based on your hardware  

---

### **🛠 Prerequisites**  
Ensure you have the following installed before using this extension:  

1. **[Node.js](https://nodejs.org/)** (for package management)  
2. **[Ollama](https://ollama.com/download)** (to run the AI model)  

After installing Ollama, choose a model to run. The default model used is:  
```sh
ollama run deepseek-r1:1.5b
```
You can select a different model depending on your hardware. If you do, remember to update the model name in `extension.ts`.  

---

### **📦 Installation**  

#### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Cepa95/DeepSeekVSCodeExtension.git
```
Ensure that `deepseek` is your main working directory, not `DeepSeekVSCodeExtension`.

#### **2️⃣ Install Dependencies**  
```sh
npm install
```

#### **3️⃣ Run the Extension in VS Code**  

Inside the editor, open `src/extension.ts` and press `F5`, or run the command `Debug: Start Debugging` from the Command Palette (Ctrl+Shift+P). This will compile and run the extension in a new `Extension Development Host` window.
Once the extension is running, open the Command Palette in the `Extension Development Host` and type `Ask DeepSeek AI` to open the webview UI. Alternatively, you can package and install the extension to use it.
If you do not see the `Ask DeepSeek AI` command, check the `package.json` file and ensure that the `engines.vscode` version is compatible with your installed version of VS Code.

---
