(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  function setHeaderOffset() {
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  setHeaderOffset();
  window.addEventListener('resize', setHeaderOffset, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setHeaderOffset);
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  var primaryButton = document.getElementById('downloadGym');
  var downloadButtons = [primaryButton].concat(Array.from(document.querySelectorAll('[data-download-gym]')));
  var status = document.getElementById('downloadStatus');
  downloadButtons.forEach(function (button) {
    button.disabled = false;
    button.addEventListener('click', downloadLatest);
  });

  async function downloadLatest() {
    downloadButtons.forEach(function (button) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
    });
    status.textContent = 'جارٍ البحث عن أحدث إصدار رسمي…';
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 15000);
    try {
      var response = await fetch('https://api.github.com/repos/MohamedFadlala/gym-releases/releases/latest', {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Release lookup failed');
      var release = await response.json();
      var installer = (release.assets || []).find(function (asset) {
        return /^Holool-Gym-Manager-.*-Setup\.exe$/i.test(asset.name) && asset.state === 'uploaded';
      });
      if (!installer) throw new Error('Windows installer unavailable');
      var url = new URL(installer.browser_download_url);
      if (url.origin !== 'https://github.com' || !url.pathname.startsWith('/MohamedFadlala/gym-releases/releases/download/') || !url.pathname.toLowerCase().endsWith('.exe')) {
        throw new Error('Invalid installer URL');
      }
      status.textContent = 'جارٍ تنزيل ' + installer.name + ' من الإصدار ' + release.tag_name + '…';
      window.location.assign(url.href);
    } catch (error) {
      status.textContent = 'تعذّر بدء التنزيل المباشر. افتح رابط أحدث إصدار على GitHub أو تواصل معنا للمساعدة.';
    } finally {
      clearTimeout(timeout);
      downloadButtons.forEach(function (button) {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      });
    }
  }
})();
