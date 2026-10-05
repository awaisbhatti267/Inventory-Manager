import { app, BrowserWindow } from "electron";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let backendProcess = null;
let logStream = null;

function startBackend() {
  let backendPath;
  let backendDir;

  // Development vs Installed App
  if (app.isPackaged) {
    backendDir = path.join(process.resourcesPath, "server");
    backendPath = path.join(backendDir, "app.js");
  } else {
    backendDir = path.join(__dirname, "../src/server");
    backendPath = path.join(backendDir, "app.js");
  }

  // Backend log file
  const logPath = path.join(
    app.getPath("userData"),
    "backend.log"
  );

  fs.appendFileSync(
    logPath,
    `\n\n========== APP START ==========\n` +
    `Packaged: ${app.isPackaged}\n` +
    `Backend directory: ${backendDir}\n` +
    `Backend path: ${backendPath}\n` +
    `Backend exists: ${fs.existsSync(backendPath)}\n` +
    `===============================\n`
  );

  logStream = fs.openSync(logPath, "a");

  // Start Express backend
  backendProcess = spawn(
    process.execPath,
    [backendPath],
    {
      cwd: backendDir,

      env: {
        ...process.env,

        // Run Electron executable as Node.js
        ELECTRON_RUN_AS_NODE: "1",

        // Allow backend to find packaged dependencies
        NODE_PATH: app.isPackaged
          ? path.join(
              process.resourcesPath,
              "app.asar",
              "node_modules"
            )
          : path.join(
              __dirname,
              "../node_modules"
            ),
      },

      stdio: [
        "ignore",
        logStream,
        logStream
      ],
    }
  );

  backendProcess.on("error", (error) => {
    fs.appendFileSync(
      logPath,
      `\nBACKEND START ERROR:\n${error.stack}\n`
    );
  });

  backendProcess.on("exit", (code, signal) => {
    fs.appendFileSync(
      logPath,
      `\nBACKEND EXIT\nCode: ${code}\nSignal: ${signal}\n`
    );
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

  win.loadFile(
    path.join(__dirname, "../dist/index.html")
  );
}

function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }

  if (logStream !== null) {
    try {
      fs.closeSync(logStream);
    } catch {
      // Already closed
    }

    logStream = null;
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", () => {
  stopBackend();
});

app.on("window-all-closed", () => {
  stopBackend();

  if (process.platform !== "darwin") {
    app.quit();
  }
});