// 설치(앱) 조건을 맞추기 위한 최소 서비스 워커. 저장(캐시) 없이 그대로 통과
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('fetch', function (e) { e.respondWith(fetch(e.request)); });
