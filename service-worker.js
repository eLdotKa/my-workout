const CACHE='shortcut-to-size-checklist-v22';const ASSETS=['./','./index.html','./manifest.webmanifest','./exercise-illustrations.js','./forum-online.js','./workout-catalog.js','./custom-workouts.html','./guide.html','./apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon.svg'];self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('shortcut-to-size-checklist-v')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
// Real Web Push. Show a user-visible notification immediately (required by iOS).
self.addEventListener('push',event=>{
  let payload={};
  try{payload=event.data?.json()||{}}catch(_){payload={}}
  const valid=/^[0-9a-f-]{36}$/i.test(payload.groupId||'');
  const destination=new URL(self.registration.scope);
  destination.searchParams.set('mw_push','1');
  if(valid)destination.searchParams.set('mw_group',payload.groupId);
  const tag=/^[0-9a-f-]{36}$/i.test(payload.messageId||'')?'mw-'+payload.messageId:'mw-new';
  event.waitUntil(self.registration.showNotification('My Workout',{
    body:'Nowa wiadomość w prywatnej grupie / New message in a private team',
    icon:new URL('icons/icon-192.png',self.registration.scope).href,
    badge:new URL('icons/icon-192.png',self.registration.scope).href,
    tag,
    data:{url:destination.href},
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=new URL(self.registration.scope);
  try{
    const candidate=new URL(event.notification.data?.url||target.href);
    if(candidate.origin===target.origin&&candidate.pathname.startsWith(target.pathname)){
      target.search=candidate.search;
    }
  }catch(_){}
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    const existing=windows.find(w=>new URL(w.url).origin===target.origin && new URL(w.url).pathname.startsWith(target.pathname));
    if(existing){if('navigate' in existing)await existing.navigate(target.href);return existing.focus()}
    return self.clients.openWindow(target.href);
  })());
});
