const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const dataFile = () => path.join(app.getPath('userData'), 'shortcuts.json');

function readShortcuts() {
  try { return JSON.parse(fs.readFileSync(dataFile(), 'utf8')); }
  catch { return []; }
}
function writeShortcuts(items) {
  fs.mkdirSync(path.dirname(dataFile()), { recursive: true });
  fs.writeFileSync(dataFile(), JSON.stringify(items, null, 2), 'utf8');
}
function createWindow() {
  const win = new BrowserWindow({ width: 1060, height: 720, minWidth: 760, minHeight: 560, backgroundColor: '#0b1020', webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false } });
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  ipcMain.handle('shortcuts:list', () => readShortcuts());
  ipcMain.handle('shortcuts:save', (_, items) => { writeShortcuts(items); return true; });
  ipcMain.handle('path:choose', async (_, kind) => {
    const properties = kind === 'folder' ? ['openDirectory'] : ['openFile'];
    const result = await dialog.showOpenDialog({ properties, title: kind === 'folder' ? 'Choose a folder' : 'Choose an application or file' });
    return result.canceled ? null : result.filePaths[0];
  });
  ipcMain.handle('path:execute', async (_, target) => {
    if (!target || typeof target !== 'string') throw new Error('Invalid path');
    try {
      if (process.platform === 'win32') {
        const child = spawn('cmd.exe', ['/c', 'start', '', target], { detached: true, stdio: 'ignore', windowsHide: true });
        child.unref();
      } else {
        await shell.openPath(target);
      }
      return { ok: true };
    } catch (error) { return { ok: false, error: error.message }; }
  });
  ipcMain.handle('path:reveal', (_, target) => shell.showItemInFolder(target));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
