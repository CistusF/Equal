const { app, BrowserWindow, Menu } = require('electron');
const path = require('path')
const url = require('url');
app.allowRendererProcessReuse = true;

let win;
const paths = path.join
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
    resizable: false
  });
  win.loadURL(url.format({
    pathname: paths(__dirname, './view/versioncheck.html'),
    protocol: 'file:',
    slashes: false
  }));

  win.on('closed', () => {
    app.quit();
  });
  win.webContents.openDevTools();
};
Menu.setApplicationMenu(null);

app.on('ready', () => {
  createWindow();
});