type workerEvent = {
    waitUntil: (promise: Promise<any>) => void,
    respondWith: (response: Promise<Response>) => void,
    request: Request
};

self.addEventListener("install", e => {
    let event = e as unknown as workerEvent;
    event.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./", // index.html
                "./key.css", 
                "./img/favicon/android-chrome-192x192.png", 
                "./img/favicon/favicon.ico"
            ]);
        })
    );
}); 

self.addEventListener("fetch", e => {
    let event = e as unknown as workerEvent;
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});