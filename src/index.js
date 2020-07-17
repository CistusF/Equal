const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
let win
function createWindow() {
  const paths = path.join
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
    resizable: false
  })
  win.loadURL(url.format({
    pathname: paths(__dirname, './view/index.html'),
    protocol: 'file:',
    slashes: false
  }))

  win.on('closed', () => {

    app.quit()
    win = null
  })
  // win.webContents.openDevTools() for Developers
}
Menu.setApplicationMenu(null);

app.on('ready', () => {
  console.log('Program is started')
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
