self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('invos-v1').then(c=>c.addAll([
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './coin.wav',
    './icons/icon-180.png',
    './icons/icon-512.png'
  ])));
});
self.addEventListener('fetch',(e)=>{
  e.respondWith(caches.match(e.request).then(res=> res || fetch(e.request)));
});