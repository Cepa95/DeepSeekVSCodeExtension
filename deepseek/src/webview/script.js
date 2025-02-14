const vscode = acquireVsCodeApi();

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById("inputBox").value.trim();
  if (!input) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent =
      "Please enter a valid prompt.";
    return;
  }

  document.getElementById("response").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  document.getElementById("error").style.display = "none";

  vscode.postMessage({ command: "ask", text: input });
}

function clearInput() {
  document.getElementById("inputBox").value = "";
  document.getElementById("response").textContent = "";
  document.getElementById("response").style.display = "none";
  document.getElementById("spinner").style.display = "none";
  document.getElementById("error").style.display = "none";
}

window.addEventListener("message", (event) => {
  const message = event.data;
  if (message.command === "responseChunk") {
    document.getElementById("response").textContent += message.text;
    document.getElementById("spinner").style.display = "none";
    document.getElementById("response").style.display = "block";
  } else if (message.command === "responseComplete") {
    document.getElementById("response").textContent = message.text;
    document.getElementById("spinner").style.display = "none";
    document.getElementById("response").style.display = "block";
  }
});

document
  .getElementById("saveResponseButton")
  .addEventListener("click", function () {
    const responseText = document.getElementById("response").textContent;
    if (responseText) {
      vscode.postMessage({ command: "saveResponse", text: responseText });
    }
  });
