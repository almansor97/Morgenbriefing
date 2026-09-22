const CACHE="morgenbrief-v3";
const SHELL=["./","./index.html","./manifest.webmanifest","./icons/icon.svg","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.pathname.includes("/data/")){e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));return}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))});
