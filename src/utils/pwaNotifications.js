/**
 * Helper utility for PWA App Icon Badges & System Push Notifications
 */

export function updatePWABadge() {
  try {
    const stored = JSON.parse(localStorage.getItem("contact_messages") || "[]");
    const unreadCount = stored.filter((m) => !m.read).length;

    if ("setAppBadge" in navigator) {
      if (unreadCount > 0) {
        navigator.setAppBadge(unreadCount).catch(() => {});
      } else {
        navigator.clearAppBadge().catch(() => {});
      }
    }
  } catch (e) {
    console.error("PWA Badge Error:", e);
  }
}

export function triggerNewMessageNotification(name, subject, message) {
  updatePWABadge();

  if ("Notification" in window) {
    const title = `📩 Nouveau message de ${name || "Visiteur"}`;
    const options = {
      body: subject || message || "Nouveau message soumis depuis le portfolio public.",
      icon: "/logoMM.jpg",
      badge: "/logoMM.jpg",
      tag: "contact-message",
    };

    if (Notification.permission === "granted") {
      try {
        new Notification(title, options);
      } catch (err) {
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(title, options);
          });
        }
      }
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          try {
            new Notification(title, options);
          } catch (err) {
            // fallback
          }
        }
      });
    }
  }
}
