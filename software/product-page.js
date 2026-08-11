(function () {
  'use strict';

  var products = {
    pharmacy: {
      tag: 'صيدليات', name: 'نظام إدارة الصيدليات',
      headline: 'صيدليتك مترابطة، من الرف إلى القرار.',
      desc: 'رقمنة المبيعات والمخزون والصلاحيات والتقارير، مع تشغيل محلي ومزامنة سحابية تلقائية.',
      features: ['بيع سريع وتتبع دقيق للأدوية', 'تنبيهات النواقص والصلاحية', 'تقارير موحدة للفروع'],
      outcome: 'مخزون أدق وخدمة أسرع ورؤية كاملة للصيدلية.'
    },
    labs: {
      tag: 'معامل وعيادات', name: 'نظام المعامل والعيادات',
      headline: 'رحلة المريض رقمية من الحجز إلى النتيجة.',
      desc: 'اربط المواعيد والفحوصات والنتائج والفواتير في سجل واحد يعمل حتى دون إنترنت.',
      features: ['ملف موحد لكل مريض', 'إدارة التحاليل والنتائج والفواتير', 'وصول آمن للتقارير من أي فرع'],
      outcome: 'وقت انتظار أقل وبيانات طبية منظمة وأسهل في المتابعة.'
    },
    warehouse: {
      tag: 'مخازن', name: 'نظام إدارة المخازن',
      headline: 'كل حركة مخزون واضحة، في كل مستودع.',
      desc: 'حوّل الاستلام والصرف والتحويل والجرد إلى تدفق رقمي موحد ومتزامن مع السحابة.',
      features: ['مخازن وفروع متعددة', 'جرد وحركات بصلاحيات كاملة', 'تنبيهات النقص وسجل تدقيق'],
      outcome: 'فروقات أقل وقرارات شراء مبنية على بيانات حقيقية.'
    },
    attendance: {
      tag: 'موارد بشرية', name: 'نظام الحضور والانصراف',
      headline: 'إدارة حضور لا تتوقف بانقطاع الاتصال.',
      desc: 'تسجيل محلي للحضور والانصراف وربطه آلياً بالورديات والإجازات والرواتب.',
      features: ['ربط أجهزة البصمة والورديات', 'احتساب التأخير والغياب تلقائياً', 'تقارير مركزية لكل الفروع'],
      outcome: 'وقت إداري أقل ورواتب أدق ومتابعة أوضح للموظفين.'
    },
    supermarket: {
      tag: 'تجزئة', name: 'نظام إدارة السوبر ماركت',
      headline: 'متجرك يبيع دائماً، وبياناته تصل إليك أينما كنت.',
      desc: 'نقطة بيع محلية سريعة تربط المبيعات والمخزون والعملاء وتزامنها سحابياً.',
      features: ['بيع وطباعة فواتير دون إنترنت', 'مخزون وعروض وولاء في نظام واحد', 'متابعة المبيعات والفروع عن بُعد'],
      outcome: 'طوابير أقصر وتحكم أفضل في النقد والمخزون.'
    },
    restaurant: {
      tag: 'مطاعم وكافيهات', name: 'نظام إدارة المطاعم والكاشير',
      headline: 'مطعمك لا يتوقف عندما ينقطع الإنترنت.',
      desc: 'نظام متكامل يجمع الكاشير والطاولات والنوادل وشاشة المطبخ KDS والمخزون والفروع. يواصل العمل على الشبكة المحلية، ويحفظ كل طلب، ثم يزامن البيانات تلقائياً عند عودة الاتصال.',
      features: ['الكاشير والفواتير والطباعة دون إنترنت', 'شاشة مطبخ KDS متصلة مباشرة بالطلبات', 'إدارة الطاولات والنوادل وتقسيم الفاتورة', 'حالة الطلب: جديد، قيد التحضير، جاهز، تم التقديم', 'مؤقت تجهيز وأولوية وملاحظات ومحطات مطبخ', 'مخزون مكونات ووصفات وهدر وتنبيهات نقص'],
      details: [
        { title: 'راقب مطعمك من أي مكان', text: 'تابع مبيعات اليوم والطلبات والمصروفات والنقد وBankak والمخزون وأداء الفروع من لوحة واحدة.' },
        { title: 'تحكم في النقد وقلّل التلاعب', text: 'اعرف من أنشأ أو عدّل أو ألغى الطلب، ومن منح الخصم أو فتح درج النقدية، مع موافقات للعمليات الحساسة.' },
        { title: 'إغلاق وردية بلا تخمين', text: 'قارن النقد المتوقع بالفعلي، وسجّل المدفوعات والمردودات والخصومات والمصروفات في تقرير إغلاق واضح.' },
        { title: 'اعرف تكلفة طبقك الحقيقية', text: 'يخصم النظام مكونات الوصفة تلقائياً، ويتابع الهدر والتلف والفروقات غير المفسّرة وتغيّر أسعار الموردين.' },
        { title: 'كل محطة ترى ما يخصها', text: 'وجّه الطلبات إلى الشواية أو المشروبات أو الحلويات، مع الأولوية والملاحظات ووقت التجهيز لكل محطة.' },
        { title: 'كل فروعك في صورة واحدة', text: 'قارن المبيعات والمصروفات والطلبات والمخزون، ووحّد الأسعار والقائمة والصلاحيات بين الفروع.' }
      ],
      outcome: 'لا طلبات مفقودة، أخطاء أقل في المطبخ، وتحكم كامل للمالك في النقد والمخزون والفروع.'
    },
    school: {
      tag: 'مدارس', name: 'نظام إدارة المدارس',
      headline: 'مدرستك الرقمية في سجل واحد موثوق.',
      desc: 'وحّد الطلاب والمعلمين والصفوف والدرجات والمدفوعات، مع عمل محلي ومزامنة سحابية.',
      features: ['ملفات الطلاب والحضور والدرجات', 'الشهادات والرسوم والتقارير', 'صلاحيات واضحة للإدارة والمعلمين'],
      outcome: 'إدارة أسرع وتواصل أفضل وبيانات تعليمية موحدة.'
    }
  };

  var slug = document.body.dataset.product;
  var product = products[slug];
  var root = document.getElementById('productPage');
  if (!product || !root) return;

  var whatsappText = encodeURIComponent('مرحباً حلول التقنية، أريد عرضاً توضيحياً لـ ' + product.name);
  var details = product.details ? '<section class="product-details"><div class="section-head"><span class="eyebrow"><i class="node-glyph" aria-hidden="true"></i>تحكم أعمق</span><h2>كل ما تحتاجه لإدارة المطعم، في نظام واحد.</h2></div><div class="detail-grid">' + product.details.map(function (item) {
    return '<article><h3>' + item.title + '</h3><p>' + item.text + '</p></article>';
  }).join('') + '</div></section>' : '';

  root.innerHTML = '<section class="product-hero">' +
    '<div class="product-copy"><a class="product-back" href="../../#services">→ جميع الأنظمة</a><span class="eyebrow"><i class="node-glyph" aria-hidden="true"></i>' + product.tag + ' · تحول رقمي مستمر</span><h1>' + product.headline + '</h1><p>' + product.desc + '</p><div class="hero-actions"><a class="btn" href="https://wa.me/249124376591?text=' + whatsappText + '" target="_blank" rel="noopener">اطلب عرضاً توضيحياً</a><a class="btn-ghost" href="../../#services">استكشف بقية الأنظمة <span aria-hidden="true">←</span></a></div></div>' +
    '<aside class="continuity-card"><span class="live-dot"></span><strong>مصمم للاستمرارية</strong><div><b>دون إنترنت</b><span>يواصل العمل ويحفظ العمليات محلياً.</span></div><div><b>بعد عودة الاتصال</b><span>يزامن البيانات تلقائياً مع السحابة.</span></div><div><b>بعد انقطاع الكهرباء</b><span>يستعيد البيانات المحفوظة بأمان عند إعادة التشغيل.</span></div><small>تحتاج الأجهزة والشبكة المحلية إلى مصدر كهرباء أو UPS أثناء الانقطاع.</small></aside>' +
    '</section><section class="product-features"><div class="section-head"><span class="eyebrow"><i class="node-glyph" aria-hidden="true"></i>ما الذي يغيّره النظام؟</span><h2>رقمنة عملية. أثر واضح.</h2></div><div class="feature-list">' + product.features.map(function (feature, index) {
      return '<article><span>0' + (index + 1) + '</span><h3>' + feature + '</h3></article>';
    }).join('') + '</div></section>' + details +
    '<section class="product-outcome"><span>النتيجة</span><h2>' + product.outcome + '</h2><a class="btn" href="https://wa.me/249124376591?text=' + whatsappText + '" target="_blank" rel="noopener">ابدأ مع حلول</a></section>';

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  var setHeaderOffset = function () { document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px'); };
  setHeaderOffset();
  window.addEventListener('resize', setHeaderOffset, { passive: true });
  window.addEventListener('scroll', function () { header.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
