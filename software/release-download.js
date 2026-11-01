(function () {
  'use strict';
  var patterns = {
    'pos-releases': /^Holool-POS-.*-Setup\.exe$/i,
    'tms-releases': /^TMS-.*-Setup\.exe$/i
  };
  document.querySelectorAll('[data-release-repo]').forEach(function (button) {
    var repo = button.dataset.releaseRepo;
    var pattern = patterns[repo];
    var status = document.getElementById(button.getAttribute('aria-describedby'));
    if (!pattern || !status) return;
    button.addEventListener('click', async function (event) {
      event.preventDefault();
      if (button.getAttribute('aria-busy') === 'true') return;
      button.setAttribute('aria-busy', 'true');
      status.textContent = 'جارٍ البحث عن أحدث إصدار…';
      var controller = new AbortController();
      var timeout = setTimeout(function () { controller.abort(); }, 15000);
      try {
        // Look up each download so versioned filenames stay current.
        var response = await fetch('https://api.github.com/repos/MohamedFadlala/' + repo + '/releases/latest', {
          headers: { Accept: 'application/vnd.github+json' },
          cache: 'no-store', signal: controller.signal
        });
        if (!response.ok) throw new Error('Release lookup failed');
        var release = await response.json();
        var installer = (release.assets || []).find(function (asset) {
          return pattern.test(asset.name) && asset.state === 'uploaded';
        });
        if (!installer) throw new Error('Windows installer unavailable');
        var url = new URL(installer.browser_download_url);
        if (url.origin !== 'https://github.com' || !url.pathname.startsWith('/MohamedFadlala/' + repo + '/releases/download/') || !url.pathname.toLowerCase().endsWith('.exe')) {
          throw new Error('Invalid installer URL');
        }
        status.textContent = 'جارٍ تنزيل الإصدار ' + release.tag_name + '. إذا لم يبدأ التنزيل، حاول مجدداً أو افتح أحدث إصدار على GitHub.';
        window.location.assign(url.href);
      } catch (error) {
        status.textContent = 'تعذّر جلب برنامج التثبيت. حاول مجدداً أو افتح أحدث إصدار على GitHub واختر ملف .exe من Assets.';
      } finally {
        clearTimeout(timeout);
        button.removeAttribute('aria-busy');
      }
    });
  });
})();
