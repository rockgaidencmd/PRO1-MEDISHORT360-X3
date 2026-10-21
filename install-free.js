/* Instalación PWA independiente; la activación no es necesaria para instalar. */
(() => {
  const btn = document.getElementById('ms360-install-free');
  let deferred = null;
  let installed = false;
  const standalone = () => installed || matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const refresh = () => { if (btn) btn.hidden = standalone(); };
  async function promptInstall() {
    if (standalone()) return;
    if (!deferred) {
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      alert(ios ? 'Para instalar: abre esta app en Safari, toca Compartir y elige Añadir a pantalla de inicio.' : 'Para instalar: abre esta app en Chrome o Edge y busca Instalar aplicación o Añadir a pantalla de inicio en el menú del navegador. Si estás dentro de TikTok o WhatsApp, ábrela primero en el navegador.');
      return;
    }
    const pending = deferred;
    deferred = null;
    try { await pending.prompt(); await pending.userChoice; } catch { /* El usuario puede cancelar la instalación. */ }
    refresh();
  }
  window.MS360Install = { prompt: promptInstall, isStandalone: standalone };
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferred = event; refresh(); });
  window.addEventListener('appinstalled', () => { installed = true; deferred = null; refresh(); });
  if (btn) btn.addEventListener('click', promptInstall);
  refresh();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(console.warn));
  }
})();
