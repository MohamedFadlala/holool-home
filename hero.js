/* Paper records become a workspace. Finite, compositor-only, no dependencies. */
(function () {
  'use strict';
  var scene = document.querySelector('.progress-scene');
  if (!scene || !Element.prototype.animate) return;

  var replay = scene.querySelector('.progress-replay');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 760px)');
  var connection = navigator.connection;
  var animations = [];
  var inView = false;
  var played = false;
  var observer;

  function allowed() {
    return !motion.matches && !(connection && connection.saveData);
  }

  function clear() {
    animations.forEach(function (animation) { animation.cancel(); });
    animations = [];
  }

  function add(selector, frames, duration, delay) {
    var animation = scene.querySelector(selector).animate(frames, {
      duration: duration,
      delay: delay || 0,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'both'
    });
    animations.push(animation);
    return animation;
  }

  function play() {
    clear();
    if (!allowed() || !inView || document.hidden) return;
    played = true;
    var compact = mobile.matches;
    var duration = compact ? 1500 : 2600;
    var offsets = compact ? [[60, 30], [0, 40], [-60, 20]] : [[130, 50], [-5, 80], [-145, 30]];
    ['.record-sales', '.record-stock', '.record-team'].forEach(function (selector, index) {
      var rotate = compact ? 0 : [-12, 7, 14][index];
      add(selector, [
        { opacity: 0, transform: 'translateY(16px) rotate(' + rotate + 'deg)', offset: 0 },
        { opacity: 1, transform: 'translateY(0) rotate(' + rotate + 'deg)', offset: .12 },
        { opacity: 1, transform: 'translateY(0) rotate(' + rotate + 'deg)', offset: .38 },
        { opacity: 0, transform: 'translate(' + offsets[index][0] + 'px,' + offsets[index][1] + 'px) scale(.18) rotate(0deg)', offset: .7 },
        { opacity: 0, transform: 'scale(.18)', offset: 1 }
      ], duration, index * (compact ? 45 : 100));
    });
    add('.workspace-shell', [
      { opacity: 0, transform: 'translateY(20px) scale(.94)', offset: 0 },
      { opacity: 0, transform: 'translateY(20px) scale(.94)', offset: .43 },
      { opacity: 1, transform: 'translateY(0) scale(1)', offset: .8 },
      { opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 }
    ], duration);
    ['.module-sales', '.module-stock', '.module-team', '.workspace-checks'].forEach(function (selector, index) {
      add(selector, [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], compact ? 220 : 380, duration * .64 + index * (compact ? 55 : 110));
    });
    var finish = add('.workspace-saved', [
      { opacity: 0, transform: 'translateY(10px) scale(.96)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], compact ? 250 : 450, duration * .83);
    // Remove finished effects; the CSS base state is the complete illustration.
    finish.finished.then(clear, function () {});
  }

  function visibility() {
    animations.forEach(function (animation) {
      if (document.hidden || !inView) animation.pause();
      else animation.play();
    });
    if (!played && inView && !document.hidden) play();
  }

  function preferences() {
    replay.hidden = !allowed();
    if (!allowed()) clear();
  }

  preferences();
  replay.addEventListener('click', play);
  document.addEventListener('visibilitychange', visibility);
  if (motion.addEventListener) motion.addEventListener('change', preferences);
  if (connection && connection.addEventListener) connection.addEventListener('change', preferences);
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      visibility();
    }, { threshold: .15 });
    observer.observe(scene);
  }
  // Browsers without observers keep the complete, static illustration.
  else replay.hidden = true;
})();
