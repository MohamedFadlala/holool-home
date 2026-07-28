(function(){
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var header = document.getElementById('siteHeader');
      var setHeaderOffset = function(){  document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px'); };
      setHeaderOffset();
      window.addEventListener('resize', setHeaderOffset);
      window.addEventListener('orientationchange', setHeaderOffset);
      if (document.fonts && document.fonts.ready) {  document.fonts.ready.then(setHeaderOffset);}
      var onScroll = function(){
        if (window.scrollY > 8) header.classList.add('scrolled');
        else header.classList.remove('scrolled'); };
      document.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      var toggle = document.getElementById('navToggle');
      var nav = document.getElementById('siteNav');
      toggle.addEventListener('click', function(){
        var open = nav.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      var navigateToHash = function(hash){
        var target = document.querySelector(hash);
        if (!target) return;
        var top = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 12;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' }); };
      var pages = document.querySelectorAll('.page');
      var pageNames = ['home', 'services', 'projects'];
      var revealInPage = function(pageEl){
        pageEl.querySelectorAll('.reveal:not(.in-view)').forEach(function(el){  el.classList.add('in-view');});
        pageEl.querySelectorAll('.metric-num').forEach(function(el){
          if (!el.dataset.started && typeof animateCount === 'function') {
            el.dataset.started = '1';
            animateCount(el);    }  });};
      var showPage = function(name){
        if (pageNames.indexOf(name) === -1) return false;
        pages.forEach(function(p){
          var isActive = p.dataset.page === name;
          p.classList.toggle('active', isActive); });
        var activePage = document.querySelector('.page[data-page="' + name + '"]');
        if (activePage) revealInPage(activePage);
        return true; };
      var scrollToTop = function(){   window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); };
      var handleNavClick = function(hash){
        var name = hash.slice(1);
        if (name === 'contact') {
          navigateToHash(hash);
          history.pushState(null, '', hash);
          return;}
        if (showPage(name)) {
          scrollToTop();
          history.pushState(null, '', hash);  }};
      nav.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(e){
          var hash = a.getAttribute('href');
          if (hash && hash.charAt(0) === '#' && hash.length > 1) {
            e.preventDefault();
            nav.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            handleNavClick(hash);
          } else {
            nav.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');  }  });  });
      document.querySelectorAll('a[href^="#"]').forEach(function(a){
        if (a.closest('#siteNav')) return;
        var hash = a.getAttribute('href');
        if (hash && hash.length > 1) {
          a.addEventListener('click', function(e){
            e.preventDefault();
            handleNavClick(hash);      });    }  });
      (function initialPage(){
        var initial = window.location.hash ? window.location.hash.slice(1) : 'home';
        if (initial === 'contact') {
          showPage('home');
          window.addEventListener('load', function(){ navigateToHash('#contact'); });
        } else if (!showPage(initial)) {  showPage('home');} })();
      window.addEventListener('popstate', function(){
        var name = window.location.hash ? window.location.hash.slice(1) : 'home';
        if (name !== 'contact') showPage(name);});
      var revealEls = document.querySelectorAll('.reveal');
      if ('IntersectionObserver' in window && !reduceMotion) {
        var io = new IntersectionObserver(function(entries){
          entries.forEach(function(entry){
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);    }  });
        }, { threshold: 0.15 });
        revealEls.forEach(function(el){ io.observe(el); });
      } else {  revealEls.forEach(function(el){ el.classList.add('in-view'); });}
      var metrics = document.querySelectorAll('.metric-num');
      var animateCount = function(el){
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var isDecimal = target % 1 !== 0;
        if (reduceMotion) { el.textContent = target + suffix; return; }
        var start = 0;
        var duration = 1200;
        var startTime = null;
        function step(ts){
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = start + (target - start) * eased;
          el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
          if (progress < 1) requestAnimationFrame(step)  }
        requestAnimationFrame(step); };
      var initiallyActivePage = document.querySelector('.page.active');
      if (initiallyActivePage) revealInPage(initiallyActivePage);
      if ('IntersectionObserver' in window) {
        var mio = new IntersectionObserver(function(entries){
          entries.forEach(function(entry){
            if (entry.isIntersecting) {
              animateCount(entry.target);
              mio.unobserve(entry.target);  }});
        }, { threshold: 0.5 });
        metrics.forEach(function(el){ mio.observe(el); });
      } else {  metrics.forEach(animateCount);}
      /* ==================إضافة لوقو شركة=================== */
      var companies = [
        { img: 'imgs/logos/elgwharacafelogo.jpg',      name: 'El Gwhara Cafe' },
        { img: 'imgs/logos/goldencafelogo.jpg',         name: 'Golden Cafe' },];
      var track = document.getElementById('marqueeTrack');
      if (track) {
        var buildLogoItems = function(hidden){
          return companies.map(function(c){
            return '<span class="logo-item"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
              '<img class="logo-mark-img" src="' + c.img + '" alt="' + c.name + ' logo" loading="lazy">' +
              '<span class="logo-name">' + c.name + '</span></span>';
          }).join('');  };
        track.innerHTML = buildLogoItems(false) + buildLogoItems(true); }
      /* =========إضافة مشروع======== */
          var projects = [
        { img: 'imgs/projects/bahgaAgashi.jpg',         name: 'Bahga Agashi',            category: 'Restaurant' },
        { img: 'imgs/projects/barbeRestaurant.jpg',     name: 'Barbe Restaurant',        category: 'Restaurant' },
        { img: 'imgs/projects/booshe.jpg',               name: 'Booshe',                  category: 'Fashion & Retail' },
        { img: 'imgs/projects/elawalJuices.jpg',         name: 'El Awal Juices',          category: 'Juice Bar' },
        { img: 'imgs/projects/eljwharaRest.jpg',         name: 'El Jawhara Restaurant',   category: 'Restaurant' },
        { img: 'imgs/projects/generalElectric.jpg',      name: 'General Electric Store',  category: 'Electronics Retail' },
        { img: 'imgs/projects/GFitnessClub.jpg',         name: 'G Fitness Club',          category: 'Fitness & Gym' },
        { img: 'imgs/projects/goldenCafe&rest.jpg',      name: 'Golden Cafe & Restaurant',category: 'Cafe & Restaurant' },
        { img: 'imgs/projects/harbyTravelTourism.jpg',   name: 'Harby Travel & Tourism',  category: 'Travel & Tourism' },
        { img: 'imgs/projects/karamElsham.jpg',          name: 'Karam El Sham',           category: 'Restaurant' },
        { img: 'imgs/projects/lemonRest.jpg',            name: 'Lemon Restaurant',        category: 'Restaurant' },
        { img: 'imgs/projects/megaStore.jpg',            name: 'Mega Store',              category: 'Retail' },
        { img: 'imgs/projects/myIcecreem.jpg',           name: 'My Icecream',            category: 'Desserts & Ice Cream' },
        { img: 'imgs/projects/pharmacySys.jpg',          name: 'Pharmacy Management System', category: 'Pharmacy' },
        { img: 'imgs/projects/quickBurger.jpg',          name: 'Quick Burger',            category: 'Restaurant' },
        { img: 'imgs/projects/redJewelcafe.jpg',         name: 'Red Jewel Cafe',          category: 'Cafe' },
        { img: 'imgs/projects/restaurantSys.jpg',        name: 'Restaurant Management System', category: 'Restaurant' },
        { img: 'imgs/projects/saifCenter.jpg',           name: 'Saif Center',             category: 'Restaurant' },
        { img: 'imgs/projects/shahdElsham.jpg',          name: 'Shahd El Sham',           category: 'Restaurant' },
        { img: 'imgs/projects/supermarketSys.jpg',       name: 'Supermarket Management System', category: 'Retail' }
      ];
      var gallery = document.getElementById('projectGallery');
      if (gallery) {
        gallery.innerHTML = projects.map(function(p){
          return '<article class="gallery-card">' +
            '<div class="gallery-media">' +
              '<img class="gallery-img" src="' + p.img + '" alt="' + p.name + '" loading="lazy" ' +
                'data-full="' + p.img + '" data-name="' + p.name + '" data-category="' + p.category + '">' +
              '<span class="gallery-chip">' + p.category + '</span>' +
            '</div>' +
            '<div class="gallery-info"><h4>' + p.name + '</h4></div>' +
          '</article>';
        }).join('');
        var prevBtn = document.getElementById('galPrev');
        var nextBtn = document.getElementById('galNext');
        var dotsWrap = document.getElementById('galDots');
        var cards = gallery.querySelectorAll('.gallery-card');
        dotsWrap.innerHTML = '';
        cards.forEach(function(_, i){
          var dot = document.createElement('button');
          dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
          dot.addEventListener('click', function(){ cards[i].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', inline: 'start', block: 'nearest' }); });
          dotsWrap.appendChild(dot); });
        var dots = dotsWrap.querySelectorAll('button');
        var updateDots = function(){
          var scrollLeft = gallery.scrollLeft;
          var closest = 0, min = Infinity;
          cards.forEach(function(card, i){
            var diff = Math.abs(card.offsetLeft - gallery.offsetLeft - scrollLeft);
            if (diff < min) { min = diff; closest = i; }});
          dots.forEach(function(d, i){ d.classList.toggle('active', i === closest); }); };
        gallery.addEventListener('scroll', function(){ requestAnimationFrame(updateDots); }, { passive: true });
        updateDots();
        var scrollByCard = function(dir){
          if (!cards.length) return;
          var step = cards[0].getBoundingClientRect().width + 20;
          gallery.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' });};
        prevBtn.addEventListener('click', function(){ scrollByCard(-1); });
        nextBtn.addEventListener('click', function(){ scrollByCard(1); });
        var isDown = false, startX, scrollStart;
        gallery.addEventListener('pointerdown', function(e){
          isDown = true; gallery.classList.add('dragging');
          startX = e.clientX; scrollStart = gallery.scrollLeft; });
        window.addEventListener('pointerup', function(){ isDown = false; gallery.classList.remove('dragging'); });
        gallery.addEventListener('pointermove', function(e){
          if (!isDown) return;
          gallery.scrollLeft = scrollStart - (e.clientX - startX); });
        var overlay = document.getElementById('lightboxOverlay');
        var overlayImg = document.getElementById('lightboxImg');
        var overlayCaption = document.getElementById('lightboxCaption');
        var closeBtn = document.getElementById('lightboxClose');
        var openLightbox = function(imgEl){
          overlayImg.src = imgEl.dataset.full || imgEl.src;
          overlayImg.alt = imgEl.dataset.name || imgEl.alt;
          overlayCaption.textContent = [imgEl.dataset.name, imgEl.dataset.category].filter(Boolean).join(' · ');
          overlay.classList.add('open');
          document.body.style.overflow = 'hidden'; };
        var closeLightbox = function(){
          overlay.classList.remove('open');
          document.body.style.overflow = '';};
        gallery.addEventListener('click', function(e){
          var img = e.target.closest('.gallery-img');
          if (img) openLightbox(img); });
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', function(e){  if (e.target === overlay) closeLightbox();});
        window.addEventListener('keydown', function(e){  if (e.key === 'Escape') closeLightbox();}); }
      document.querySelectorAll('.copyable').forEach(function(el){
        var pressTimer = null, longPressed = false;
        var LONG_PRESS_MS = 550;
        var showCopied = function(){
          var toast = document.createElement('span');
          toast.className = 'copy-toast';
          toast.textContent = 'Copied';
          el.appendChild(toast);
          requestAnimationFrame(function(){ toast.classList.add('show'); });
          setTimeout(function(){
            toast.classList.remove('show');
            setTimeout(function(){ toast.remove(); }, 200);
          }, 1100);
        };
        var doCopy = function(){
          longPressed = true;
          var text = el.dataset.copy;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(showCopied);
          } else {
            var ta = document.createElement('textarea');
            ta.value = text; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); } catch (err) {}
            document.body.removeChild(ta);
            showCopied();
          }
          if (navigator.vibrate) navigator.vibrate(15);
        };
        var start = function(){
          longPressed = false;
          pressTimer = setTimeout(doCopy, LONG_PRESS_MS);};
        var cancel = function(){ clearTimeout(pressTimer); };
        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start, { passive: true });
        ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(function(evt){
          el.addEventListener(evt, cancel); });
        el.addEventListener('click', function(e){
          if (longPressed) { e.preventDefault(); }  }); });
      var heroCards = document.querySelectorAll('.hero-card');
      if (window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
        heroCards.forEach(function(heroCard){
          heroCard.addEventListener('mousemove', function(e){
            var r = heroCard.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5;
            var y = (e.clientY - r.top) / r.height - 0.5;
            heroCard.style.transform = 'rotateY(' + (x * 6) + 'deg) rotateX(' + (y * -6) + 'deg)'; });
          heroCard.addEventListener('mouseleave', function(){
            heroCard.style.transform = '';          });        });      }
    })();