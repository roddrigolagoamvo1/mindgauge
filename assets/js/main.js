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

// ---- Botões de compartilhamento de resultado --------------------------------
// Chamada: showMGShare("I got X/10 on the General Knowledge Quiz")
// Renderiza X/WhatsApp/Copy dentro de <div id="share-block"> na página.
function showMGShare(text) {
  var el = document.getElementById('share-block');
  if (!el) return;
  var url = (window.location.href.split('?')[0]).split('#')[0];
  var shareText = text + ' — try it free at mindgauge.fyi';
  var tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
  var waUrl = 'https://wa.me/?text=' + encodeURIComponent(text + '\n' + url);

  el.innerHTML =
    '<div class="share-wrap">' +
    '<span class="share-eyebrow">Share your result</span>' +
    '<div class="share-btns">' +
    '<a class="share-btn x-btn" href="' + tweetUrl + '" target="_blank" rel="noopener">Post on 𝕏</a>' +
    '<a class="share-btn wa-btn" href="' + waUrl + '" target="_blank" rel="noopener">WhatsApp</a>' +
    '<button class="share-btn copy-btn" id="mg-copy-btn">Copy</button>' +
    '</div></div>';

  document.getElementById('mg-copy-btn').addEventListener('click', function () {
    var btn = this;
    var copyText = text + '\n' + url;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText).then(function () {
        btn.textContent = 'Copied ✓';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = copyText;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = 'Copied ✓';
      setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
    }
  });
}

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
