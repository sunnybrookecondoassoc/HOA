self.addEventListener('push', function(event) {
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}
  var title = data.title || "Sunnybrooke Condo Association";
  var body = data.body || '';
  var url = data.url || './notices.html';
  event.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: { url: url }
  }));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || './notices.html';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
    for (var i = 0; i < windowClients.length; i++) {
      var client = windowClients[i];
      if ('focus' in client) { client.navigate(url); return client.focus(); }
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
