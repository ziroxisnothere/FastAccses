const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('fastAccses', {
  list: () => ipcRenderer.invoke('shortcuts:list'),
  save: (items) => ipcRenderer.invoke('shortcuts:save', items),
  choosePath: (kind) => ipcRenderer.invoke('path:choose', kind),
  execute: (target) => ipcRenderer.invoke('path:execute', target),
  reveal: (target) => ipcRenderer.invoke('path:reveal', target)
});
