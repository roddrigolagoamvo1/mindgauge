/* ==========================================================================
   MindGauge — main.js (compartilhado por todas as páginas)
   ========================================================================== */

// ---- Menu mobile -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }
});

// ---- Banner de cookies (placeholder) ---------------------------------------
// IMPORTANTE: este banner é só um AVISO VISUAL básico, não é uma CMP
// certificada pelo Google. Para servir anúncios pra usuários da
// EEA/Reino Unido/Suíça, a política do Google EXIGE uma Consent Management
// Platform certificada e integrada ao IAB TCF (ex.: CookieYes, Cookiebot,
// Quantcast Choice — todas têm plano gratuito). Troque este banner pelo
// snippet da CMP escolhida antes de ativar anúncios para tráfego europeu.
(function () {
  var KEY = 'mg_cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    if (!getConsent()) {
      banner.classList.add('show');
    }

    var acceptBtn = banner.querySelector('[data-accept]');
    var rejectBtn = banner.querySelector('[data-reject]');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setConsent('accepted');
        banner.classList.remove('show');
        // Ponto de integração: dispare aqui o consent mode do gtag, se usar.
        // gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' });
      });
    }
    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        setConsent('rejected');
        banner.classList.remove('show');
        // gtag('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied' });
      });
    }
  });
})();

// ---- Helper do gauge (usado nas páginas de resultado) ----------------------
// Recebe um valor de 0 a 100 e rotaciona a agulha de -90deg (mínimo) a
// +90deg (máximo) sobre um arco semicircular. Usado em reaction-time-test,
// typing-speed-test e em qualquer teste futuro que precise de um "readout".
function setGaugeValue(svgSelector, valueSelector, value, max) {
  max = max || 100;
  var pct = Math.max(0, Math.min(1, value / max));
  var deg = -90 + pct * 180;
  var needle = document.querySelector(svgSelector + ' .gauge-needle');
  var label = document.querySelector(valueSelector);
  if (needle) needle.style.transform = 'rotate(' + deg + 'deg)';
  if (label) label.textContent = Math.round(value);
}
