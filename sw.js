self.addEventListener('push', function(event) {
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}
  var title = data.title || "Sunnybrooke Condo Association";
  var body = data.body || '';
  var url = data.url || './notices.html';
  var opts = {
    body: body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: data.vibrate || [200],
    data: { url: url }
  };
  if (data.image) opts.image = data.image;
  event.waitUntil(self.registration.showNotification(title, opts));
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
