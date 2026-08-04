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
        { img: 'imgs/logos/BOK-logo.jpg',         name: 'بنك الخرطوم' },
        { img: 'imgs/logos/elgwharacafelogo.jpg',      name: 'كافيه الجوهرة' },
        { img: 'imgs/logos/goldencafelogo.jpg',         name: 'كافيه قولدن' },];
      var track = document.getElementById('marqueeTrack');
      if (track) {
        var buildLogoItems = function(hidden){
          return companies.map(function(c){
            return '<span class="logo-item"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
              '<img class="logo-mark-img" src="' + c.img + '" alt="' + c.name + ' logo" loading="lazy">' +
             '</span></span>';
          }).join('');  };
        track.innerHTML = buildLogoItems(false) + buildLogoItems(true); }
      /* =========إضافة مشروع======== */
          var projects = [
        { img: 'imgs/projects/bahgaAgashi.jpg',         name: 'اقاشي البهجة',            category: 'مطعم' },
        { img: 'imgs/projects/barbeRestaurant.jpg',     name: 'مطعم باربي',        category: 'مطعم' },
        { img: 'imgs/projects/booshe.jpg',               name: 'بوتيك بوشي',                  category: 'بوتيك' },
        { img: 'imgs/projects/elawalJuices.jpg',         name: 'عصائر الأول',          category: ' عصائر' },
        { img: 'imgs/projects/eljwharaRest.jpg',         name: 'كافتيريا الجوهرة',   category: 'مطعم' },
        { img: 'imgs/projects/generalElectric.jpg',      name: 'جينيرال اليكتريك',  category: 'تجزئة إلكترونيات' },
        { img: 'imgs/projects/GFitnessClub.jpg',         name: 'جيم',          category: 'لياقة ونادي رياضي' },
        { img: 'imgs/projects/goldenCafe&rest.jpg',      name: 'مطعم وكافيه قولدن',category: 'مقهى ومطعم' },
        { img: 'imgs/projects/harbyTravelTourism.jpg',   name: 'وكالة سفر الحربي',  category: 'سفر وسياحة' },
        { img: 'imgs/projects/karamElsham.jpg',          name: 'كرم الشام',           category: 'مطعم' },
        { img: 'imgs/projects/lemonRest.jpg',            name: 'ليمون',        category: 'مطعم' },
        { img: 'imgs/projects/megaStore.jpg',            name: 'ميجا ستور',              category: 'تجزئة' },
        { img: 'imgs/projects/myIcecreem.jpg',           name: 'آيسكريمي',            category: 'حلويات وآيس كريم' },
        { img: 'imgs/projects/pharmacySys.jpg',          name: 'نظام إدرة الصيدليات', category: 'صيدلية' },
        { img: 'imgs/projects/quickBurger.jpg',          name: 'كويك بيرقر',            category: 'مطعم' },
        { img: 'imgs/projects/redJewelcafe.jpg',         name: 'كافيه الجوهرة الحمراء',          category: 'مقهى' },
        { img: 'imgs/projects/restaurantSys.jpg',        name: 'نظام إدرة المطاعم', category: 'مطعم' },
        { img: 'imgs/projects/saifCenter.jpg',           name: 'سيف للأسماك',             category: 'مطعم' },
        { img: 'imgs/projects/shahdElsham.jpg',          name: 'شهد الشام',           category: 'مطعم' },
        { img: 'imgs/projects/supermarketSys.jpg',       name: 'نظام ادارة السوبرماركت', category: 'تجزئة' }
        ,        { img: 'imgs/projects/lap-sys.jpg',          name: 'نظام إدارة المعامل الطبية', category: 'معمل' },
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
          dot.setAttribute('aria-label', 'الانتقال إلى المشروع ' + (i + 1));
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
      var iconPaths = {
        pharmacy: '<circle cx="22" cy="22" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M22 16v12M16 22h12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
        labs: '<path d="M18 12h8M19 12v6l-6 10a2 2 0 0 0 2 3h14a2 2 0 0 0 2-3l-6-10v-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 26h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
        warehouse: '<rect x="10" y="20" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="24" y="20" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="17" y="10" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="2.2"/>',
        attendance: '<circle cx="22" cy="22" r="10" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M22 15v7l5 3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
        supermarket: '<path d="M10 12h3l3 15h14l3-11H16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="31" r="1.8" fill="currentColor"/><circle cx="28" cy="31" r="1.8" fill="currentColor"/>',
        restaurant: '<path d="M15 10v10a3 3 0 0 0 3 3v11M15 10v6M18 10v6M21 10v6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M29 10c-3 0-4 4-4 8s1 5 4 5v11" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
        school: '<path d="M22 13 L36 19 L22 25 L8 19 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M14 22v6c0 2 4 4 8 4s8-2 8-4v-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 19v8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
        cctv: '<rect x="8" y="17" width="18" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M26 20l8-4v14l-8-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="14" cy="22" r="2" fill="currentColor"/>',
        network: '<circle cx="22" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="30" r="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="32" cy="30" r="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M22 15.5 L14 27 M22 15.5 L30 27" stroke="currentColor" stroke-width="2" fill="none"/>',
        touchscreen: '<rect x="8" y="8" width="28" height="20" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M17 34h10M22 28v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="22" cy="18" r="2" fill="currentColor"/>',
        printer: '<rect x="10" y="15" width="24" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="14" y="8" width="16" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="27" width="16" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/>',
        scanner: '<path d="M14 12 L30 28" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><rect x="24" y="24" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 10l4 4M12 14l4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
        drawer: '<rect x="8" y="14" width="28" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 22h28" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="27" r="1.8" fill="currentColor"/>',
        posAllInOne: '<rect x="10" y="8" width="24" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M16 24l-2 10h16l-2-10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><rect x="18" y="12" width="8" height="4" rx="1" fill="currentColor"/>',
        labelPrinter: '<rect x="10" y="14" width="24" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M16 28l2 6h8l2-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 21h16" stroke="currentColor" stroke-width="1.6"/>',
        fingerprint: '<path d="M22 12a10 10 0 0 1 10 10v4a10 10 0 0 1-3 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 16a6 6 0 0 1 6 6v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 22a8 8 0 0 1 8-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 20a2 2 0 0 1 2 2v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        ipCamera: '<path d="M10 24a12 6 0 0 1 24 0" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="10" y="24" width="24" height="6" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="22" cy="27" r="2" fill="currentColor"/>',
        nvr: '<rect x="8" y="14" width="28" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="14" cy="22" r="2" fill="currentColor"/><path d="M20 22h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        netSwitch: '<rect x="8" y="16" width="28" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M13 20v4M19 20v4M25 20v4M31 20v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        computer: '<rect x="7" y="10" width="19" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12.5 27h9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M16.5 23v4" stroke="currentColor" stroke-width="2.2"/><rect x="29" y="11" width="8" height="21" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="33" cy="27.5" r="1.2" fill="currentColor"/>',
        visaCard: '<rect x="2" y="10" width="40" height="24" rx="5" fill="#fff" stroke="#e2e6ec" stroke-width="1.5"/><rect x="2" y="10" width="40" height="6" fill="#f4f6f9"/><text x="22" y="28" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="800" font-style="italic" fill="#1A1F71" text-anchor="middle">VISA</text>',
        mastercardCard: '<rect x="2" y="10" width="40" height="24" rx="5" fill="#fff" stroke="#e2e6ec" stroke-width="1.5"/><circle cx="18" cy="22" r="8" fill="#EB001B"/><circle cx="27" cy="22" r="8" fill="#F79E1B"/><path d="M22.5 15.8a8 8 0 0 1 0 12.4 8 8 0 0 1 0-12.4Z" fill="#FF5F00"/>',
        bankTransfer: '<rect x="2" y="10" width="40" height="24" rx="5" fill="#fff" stroke="#e2e6ec" stroke-width="1.5"/><path d="M22 14 L34 21H10Z" fill="#2457c5"/><rect x="12" y="22" width="4" height="8" fill="#2457c5"/><rect x="20" y="22" width="4" height="8" fill="#2457c5"/><rect x="28" y="22" width="4" height="8" fill="#2457c5"/><rect x="9" y="31" width="26" height="2.5" rx="1" fill="#2457c5"/>',
        bankak: '<rect x="2" y="6" width="40" height="32" rx="9" fill="#0e63d6"/><rect x="10" y="15" width="24" height="15" rx="3" fill="#fff"/><rect x="10" y="15" width="24" height="4.5" fill="#0e63d6" opacity=".18"/><circle cx="29" cy="23" r="2.2" fill="#0e63d6"/>',
        fawry: '<rect x="2" y="6" width="40" height="32" rx="9" fill="#f7941d"/><rect x="15" y="12" width="14" height="20" rx="3" fill="#fff"/><path d="M18 21l3 3 5-6" stroke="#f7941d" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
        ocash: '<rect x="2" y="6" width="40" height="32" rx="9" fill="#0fa968"/><circle cx="17" cy="23" r="6.5" fill="none" stroke="#fff" stroke-width="2.1"/><circle cx="27" cy="19" r="6.5" fill="none" stroke="#fff" stroke-width="2.1"/>'
      };
      var iconSvg = function(name, bg){
        return '<svg viewBox="0 0 44 44"><rect width="44" height="44" rx="14" fill="' + bg + '"/>' + (iconPaths[name] || '') + '</svg>'; };
      var iconSvgPlain = function(name){
        return '<svg viewBox="0 0 44 44">' + (iconPaths[name] || '') + '</svg>'; };
      /* ==================الأنظمة================== */
      var softwareSystems = [
        { icon:'pharmacy', tag:'صيدليات', name:'نظام إدارة الصيدليات', desc:'إدارة كاملة للأدوية والمخزون والمبيعات، مدعومة بذكاء اصطناعي للكشف عن التفاعلات الدوائية وتقارير متقدمة.', price:'_', note:'ابتداءً من', cta:'اطلب ' },
        { icon:'labs', tag:'معامل وعيادات', name:'نظام المعامل والعيادات', desc:'إدارة مواعيد المرضى، التحاليل، الأشعة، والنتائج والفواتير الطبية في نظام واحد متكامل مع المختبرات.', price:'_', note:'ابتداءً من', cta:'اطلب ' },
        { icon:'warehouse', tag:'مخازن', name:'نظام إدارة المخازن', desc:'إدارة متعددة المستودعات، تتبع الأصناف، صلاحيات المستخدمين، حركات الإدخال والإخراج، والجرد الآلي.', price:'_', note:'ابتداءً من', cta:'اطلب ' },
        { icon:'attendance', tag:'موارد بشرية', name:'نظام الحضور والانصراف', desc:'بصمة إلكترونية، تقارير الغياب والتأخير، احتساب الرواتب تلقائياً، وإدارة إجازات الموظفين.', price:'_', note:'ابتداءً من', cta:'اطلب ' },
        { icon:'supermarket', tag:'تجزئة', name:'نظام إدارة السوبر ماركت', desc:'نقطة بيع متكاملة، إدارة العملاء والعروض وبرنامج الولاء، مع تقارير مبيعات ومخزون لحظية.', price:'_', note:'ابتداءً من', cta:'اطلب ' },
        { icon:'restaurant', tag:'مطاعم', name:'نظام إدارة المطاعم والكاشير', desc:'إدارة الطاولات والطلبات، ربط المطبخ بالكاشير، الفواتير والتوصيل، مع تقارير مبيعات لحظية.', price:'_', note:'ابتداءً من', cta:'اطلب ' },
        { icon:'school', tag:'مدارس', name:'نظام إدارة المدارس', desc:'إدارة الطلاب، المعلمين، الصفوف، الدرجات، الشهادات، والمدفوعات المدرسية.', price:'_', note:'ابتداءً من', cta:'اطلب' }
      ];
      var softwareGrid = document.getElementById('softwareGrid');
      if (softwareGrid) {
        softwareGrid.innerHTML = softwareSystems.map(function(s){
          return '<article class="software-card' + (s.comingSoon ? ' coming-soon' : '') + '">' +
            '<div class="software-icon" style="color:var(--primary)">' + iconSvg(s.icon, 'var(--primary-soft)') + '</div>' +
            '<div class="status-row"><span class="tag">' + s.tag + '</span>' + (s.comingSoon ? '<span class="badge-soon">' + s.badge + '</span>' : '<span class="status-ready">✓ جاهز للتشغيل</span>') + '</div>' +
            '<h3>' + s.name + '</h3>' +
            '<p>' + s.desc + '</p>' +
            '<div class="price-row"><span class="price-tag" dir="ltr">' + s.price + '</span>' + '</div>' +
          '</article>';
        }).join(''); }
      /* ==================خدمات التركيب================== */
      var techServices = [
        { icon:'cctv', name:'تركيب كاميرات المراقبة', desc:'توريد وتركيب أحدث أنظمة المراقبة IP وCCTV، مع ربطها بهاتفك وتخزين سحابي، لضمان أمن منشأتك على مدار الساعة.', price:'_', note:'ابتداءً من', cta:'اطلب ' },
        { icon:'network', name:'إنشاء شبكات وربط الأجهزة', desc:'تصميم وتركيب شبكات محلية (LAN/WAN)، ربط الفروع، حلول VPN، وإدارة الخوادم لضمان استمرارية عملك دون انقطاع.', price:'_', note:'ابتداءً من', cta:'اطلب ' }
      ];
      var techGrid = document.getElementById('techGrid');
      if (techGrid) {
        techGrid.innerHTML = techServices.map(function(t){
          return '<article class="tech-card">' +
            '<div class="tech-icon" style="color:var(--accent)">' + iconSvg(t.icon, 'var(--accent-soft)') + '</div>' +
            '<div>' +
              '<h3>' + t.name + '</h3>' +
              '<p>' + t.desc + '</p>' +
              '<div class="price-row"><span class="price-tag" dir="ltr">' + t.price + '</span><span class="price-note">'+ '</span></div>' +
            
            '</div>' +
          '</article>';
        }).join(''); }
      /* ==================الأجهزة والمعدات================== */
      var hardwareItems = [
        { icon:'printer', img:'imgs/hardware/printer.webp', name:'طابعة فواتير X-Printer', price:'48$' },
        { icon:'posAllInOne', img:'imgs/hardware/pos-all-in-one.jpg', name:'جهاز كاشير All-in-One', price:'' },
        { icon:'touchscreen', img:'imgs/hardware/touchscreen-dell.jpg', name:'شاشة لمس Dell', price:'360$' },
        { icon:'touchscreen', img:'imgs/hardware/touchscreen-nigachi.jpg', name:'شاشة لمس Nigachi', price:'' },
        { icon:'printer', img:'imgs/hardware/printer-nigachi.jpg', name:'طابعة فواتير حرارية Nigachi', price:'' },
        { icon:'labelPrinter', img:'imgs/hardware/barcode-printer-nigachi.jpg', name:'طابعة باركود Nigachi', price:'' },
        { icon:'scanner', img:'imgs/hardware/barcode-scanner-wired.jpg', name:'قارئ باركود سلكي', price:'' },
        { icon:'scanner', img:'imgs/hardware/barcode-scanner-wireless.jpg', name:'قارئ باركود لاسلكي', price:'' },
        { icon:'scanner', img:'imgs/hardware/2d-presentation-scanner.jpg', name:'سكانر 2D Presentation', price:'' },
        { icon:'drawer', img:'imgs/hardware/cash-drawer.jpg', name:'درج نقدي إلكتروني', price:'' },
        { icon:'computer', img:'imgs/hardware/computer.jpg', name:'جهاز كمبيوتر Dell ,HP , Lenovo', price:'' },
        { icon:'fingerprint', img:'imgs/hardware/fingerprint-attendance.jpg', name:'جهاز بصمة الحضور والانصراف', price:'' },
      ];
      var hardwareGrid = document.getElementById('hardwareGrid');
      if (hardwareGrid) {
        hardwareGrid.innerHTML = hardwareItems.map(function(h){
          var media = h.img
            ? '<div class="hardware-media"><img src="' + h.img + '" alt="' + h.name + '" loading="lazy" onerror="this.parentElement.outerHTML=\'<div class=&quot;hardware-icon&quot; style=&quot;color:var(--primary)&quot;>' + iconSvgPlain(h.icon).replace(/'/g, "&#39;").replace(/"/g, '&quot;') + '</div>\'"></div>'
            : '<div class="hardware-icon" style="color:var(--primary)">' + iconSvgPlain(h.icon) + '</div>';
          return '<article class="hardware-card">' +
            media +
            '<h4>' + h.name + '</h4>' +
            (h.price ? '<span class="hardware-price" dir="ltr">' + h.price + '</span>' : '<span class="hardware-price hardware-price-empty">_</span>') +
          '</article>';
        }).join(''); }
      /* ==================وسائل الدفع================== */
      var paymentMethods = [
        { icon:'visaCard', name:'فيزا كارد' },
        { icon:'mastercardCard', name:'ماستر كارد' },
        { icon:'bankTransfer', name:'حساب بنكي دولي' },
        { icon:'bankak', img:'imgs/logos/bankak.png', name:'بنكك' },
        { icon:'fawry', img:'imgs/logos/fawry.png', name:'فوري' },
        { icon:'ocash', img:'imgs/logos/O-Cash.jpg', name:'أوكاش' }
      ];
      var paymentGrid = document.getElementById('paymentGrid');
      if (paymentGrid) {
        paymentGrid.innerHTML = paymentMethods.map(function(p){
          var media = p.img
            ? '<div class="payment-icon payment-logo"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy" onerror="this.parentElement.outerHTML=\'<div class=&quot;payment-icon&quot;>' + iconSvgPlain(p.icon).replace(/'/g, "&#39;").replace(/"/g, '&quot;') + '</div>\'"></div>'
            : '<div class="payment-icon">' + iconSvgPlain(p.icon) + '</div>';
          return '<div class="payment-card">' + media + '<span>' + p.name + '</span></div>';
        }).join(''); }
      /* ==================الباقات================== */
      var packages = [
        { name:'باقة المتجر الأساسية', price:'$890', period:'دفعة واحدة', features:['نظام إدارة السوبر ماركت','شاشة لمس','طابعة فواتير X-Printer','ماسح باركود لاسلكي','درج نقدية إلكتروني'], cta:'اطلب الباقة الآن' },
        { name:'باقة الصيدلية المتكاملة', price:'$1,950', period:'دفعة واحدة', featured:true, badge:'الأكثر طلباً', features:['نظام إدارة الصيدليات','جهاز نقاط بيع متكامل','طابعة فواتير حرارية','ماسح باركود لاسلكي','تركيب وتدريب الفريق مجاناً'], cta:'اطلب الباقة الآن' },
      ];
      var packageGrid = document.getElementById('packageGrid');
      if (packageGrid) {
        packageGrid.innerHTML = packages.map(function(p){
          if (p.custom) {
            return '<article class="package-card custom-package">' +
              '<h3>' + p.name + '</h3>' +
              '<p>' + p.desc + '</p>' +
              '<a class="btn" href="#contact">' + p.cta + '</a>' +
            '</article>';
          }
          return '<article class="package-card' + (p.featured ? ' featured' : '') + '">' +
            (p.badge ? '<span class="popular-badge">' + p.badge + '</span>' : '') +
            '<h3>' + p.name + '</h3>' +
            '<div class="package-price"><span class="amount" dir="ltr">' + p.price + '</span><span class="period">' + p.period + '</span></div>' +
            '<ul class="package-features">' + p.features.map(function(f){ return '<li>' + f + '</li>'; }).join('') + '</ul>' +
            '<a class="btn" href="#contact">' + p.cta + '</a>' +
          '</article>';
        }).join(''); }
      document.querySelectorAll('.copyable').forEach(function(el){
        var pressTimer = null, longPressed = false;
        var LONG_PRESS_MS = 550;
        var showCopied = function(){
          var toast = document.createElement('span');
          toast.className = 'copy-toast';
          toast.textContent = 'تم النسخ';
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