// v7: 이 사이트(GitHub)의 화면·아이콘을 기기에 저장해 두고 바로 띄움. 동시에 새 버전을 받아 다음에 열 때 반영
// 구글(데이터) 요청은 건드리지 않음
var CACHE = 'h5-4';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  var u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== self.location.origin || u.searchParams.has('nosw')) return;   // nosw: 새 버전 받기(저장본 거치지 않음)
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(r, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(r).then(function (res) { if (res && res.ok) c.put(r.url.split('?')[0], res.clone()); return res; });
      if (hit) { e.waitUntil(net.catch(function () {})); return hit; }
      return net;
    });
  }));
});
