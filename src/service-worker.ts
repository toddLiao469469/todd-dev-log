/// <reference lib="webworker" />

import { build, files, prerendered, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const STATIC_CACHE = `cache${version}`;
const DYNAMIC_CACHE = `offline${version}`;
const to_cache = build.concat(files).concat(prerendered);
const staticAssets = new Set(to_cache);

const TTL = 24 * 60 * 60 * 1000;

const ongoingRequests = new Map<string, Promise<Response>>();

worker.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(to_cache))
      .then(() => {
        worker.skipWaiting();
      })
      .catch((err) => {
        console.error('Failed to pre-cache static assets:', err);
      })
  );
});

worker.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const validCaches = [STATIC_CACHE, DYNAMIC_CACHE];
      const deletePromises = cacheNames
        .filter((name) => !validCaches.includes(name))
        .map((name) => caches.delete(name));
      await Promise.all(deletePromises);
      worker.clients.claim();
    })()
  );
});

async function fetchAndCache(request: Request): Promise<Response> {
  const cache = await caches.open(DYNAMIC_CACHE);
  const now = Date.now();

  if (ongoingRequests.has(request.url)) {
    return ongoingRequests.get(request.url)!;
  }

  const fetchPromise = (async () => {
    try {
      const response = await fetch(request);

      if (response.ok) {
        await cache.put(request, response.clone());

        const metadata = { url: request.url, expiryTime: now + TTL };

        const metadataRequest = new Request(`${request.url}|metadata`);
        const metadataResponse = new Response(JSON.stringify(metadata));
        await cache.put(metadataRequest, metadataResponse);
      }

      return response;
    } catch (err) {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        try {
          const metadataResponse = await cache.match(`${request.url}|metadata`);
          if (metadataResponse) {
            const metadata = await metadataResponse.json();
            if (metadata && now < metadata.expiryTime) {
              return cachedResponse;
            } else {

              await cache.delete(request);
              await cache.delete(`${request.url}|metadata`);
            }
          }
        } catch (metadataError) {
          console.warn('Failed to parse metadata:', metadataError);

          await cache.delete(request);
          await cache.delete(`${request.url}|metadata`);
        }
      }
      throw err;
    } finally {

      ongoingRequests.delete(request.url);
    }
  })();

  ongoingRequests.set(request.url, fetchPromise);
  return fetchPromise;
}


worker.addEventListener('fetch', (event) => {
  const { request } = event;


  if (request.method !== 'GET' || request.headers.has('range')) return;

  const url = new URL(request.url);
  const isHttp = url.protocol.startsWith('http');
  const isDevServerRequest =
    url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = request.cache === 'only-if-cached' && !isStaticAsset;

  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith(
      (async () => {
        if (isStaticAsset) {
          // 對於靜態資源，直接從快取中回應
          const cachedAsset = await caches.match(request);
          return cachedAsset || fetch(request);
        } else {
          // 對於動態請求，使用 fetchAndCache
          return fetchAndCache(request);
        }
      })()
    );
  }
});