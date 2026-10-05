import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

// ESM mein __dirname available nahi hota,
// isliye manually create kar rahe hain.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let backendProcess = null;

function startBackend() {
  // Backend app.js
  const backendPath = path.join(
    __dirname,
    "../src/server/app.js"
  );

  // Backend folder
  // .env bhi isi folder mein hai
  const backendDir = path.join(
    __dirname,
    "../src/server"
  );

  backendProcess = spawn(
    process.execPath,
    [backendPath],
    {
      // Isse dotenv src/server/.env find karega
      cwd: backendDir,

      env: {
        ...process.env,

        // Electron executable ko Node process ki tarah run karo
        ELECTRON_RUN_AS_NODE: "1",
      },

      // Backend logs terminal mein show honge
      stdio: "inherit",
    }
  );

  backendProcess.on("error", (error) => {
    console.error("Failed to start backend:", error);
  });

  backendProcess.on("exit", (code) => {
    console.log(`Backend stopped with code: ${code}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // React production build
  win.loadFile(
    path.join(__dirname, "../dist/index.html")
  );
}

app.whenReady().then(() => {
  // Express backend automatically start
  startBackend();

  // Electron window
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  // Electron close ho to backend bhi close
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
});