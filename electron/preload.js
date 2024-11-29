
// import { contextBridge } from 'electron';

// // contextBridge.exposeInMainWorld('electronAPI', {
// //   fetchPosts: async () => {
// //     const response = await fetch('http://headless-wordpress.local/wp-json/wp/v2/posts');
// //     return response.json();
// //   },
// // });



const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload.js cargado'); 

contextBridge.exposeInMainWorld('electronAPI', {
  customFunction: () => {
    console.log('customFunction llamada desde el renderizador'); 
    ipcRenderer.send('custom-function');
  },
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});
