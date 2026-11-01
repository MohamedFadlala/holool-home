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

  var button = document.getElementById('downloadErp');
  var status = document.getElementById('downloadStatus');
  
  button.addEventListener('click', async function (event) {
    event.preventDefault();
    if (button.getAttribute('aria-busy') === 'true') return;
    button.setAttribute('aria-busy', 'true');
    status.textContent = 'Finding the latest Windows installer…';
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 15000);
    try {
      // Resolve on each click: release asset filenames contain the version number.
      var response = await fetch('https://api.github.com/repos/MohamedFadlala/erp-releases/releases/latest', {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Release lookup failed');
      var release = await response.json();
      var installer = (release.assets || []).find(function (asset) {
        return /^Holool-ERP-Enterprise-Setup-.*\.exe$/i.test(asset.name) && asset.state === 'uploaded';
      });
      if (!installer) throw new Error('Windows installer unavailable');
      var url = new URL(installer.browser_download_url);
      if (url.origin !== 'https://github.com' || !url.pathname.startsWith('/MohamedFadlala/erp-releases/releases/download/') || !url.pathname.toLowerCase().endsWith('.exe')) {
        throw new Error('Invalid installer URL');
      }
      status.textContent = 'Downloading ' + release.tag_name + '. If the download does not start, try again or open the latest release on GitHub.';
      window.location.assign(url.href);
    } catch (error) {
      status.textContent = 'Could not retrieve the installer. Try again, or use “View latest release on GitHub” and choose the .exe file under Assets.';
    } finally {
      clearTimeout(timeout);
      
      button.removeAttribute('aria-busy');
    }
  });
})();
