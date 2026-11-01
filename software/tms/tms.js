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

})();
