import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import zeroTierProcess from './models/process.js'

// Custom APIs for renderer
const api = {
  zeroTierProcess
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
    
  }
} else {
  window.electron = electronAPI
  window.api = api
}
