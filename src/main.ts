import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { join } from 'path';

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 628, // Todo add windows's height
        resizable: false,
        title: "Equal",
        transparent: true,
        frame: true,
        titleBarStyle: "hiddenInset",
        titleBarOverlay: true,
        fullscreenable: false,
        // alwaysOnTop: true,
        webPreferences: {
            devTools: true,
            preload: join(app.getAppPath(), './script/global.js'),
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    });
    win.setMenuBarVisibility(false);
    win.webContents.openDevTools()
    win.loadFile(join(app.getAppPath(), './views/index.html'));

    if (process.env.dev) {
        win.webContents.openDevTools();
    };
});


Menu.setApplicationMenu(null);

ipcMain.on('ready', () => {
    console.log("App is ready");
});

app.on('window-all-closed', () => {
    app.quit();
});