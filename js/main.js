(() => {
  'use strict';

  const SETTINGS_KEY = 'northbound-settings-v3';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;

  const DEFAULTS = {
    brand:'Northbound',
    pageTitle:'Northbound | Slow roads, big skies',
    metaDescription:'Slow, story-rich motorcycle and SUV journeys through the Himalayas, Ladakh, Himachal and North India.',
    themeColor:'#fbf1de',
    headingFont:'Georgia, "Times New Roman", serif',
    bodyFont:'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    paper:'#fbf1de',
    ink:'#33271f',
    accent:'#c85d32',
    card:'rgba(255,249,237,.88)',
    navDestinations:'Journeys',
    navStories:'Contact',
    navCta:'Plan a trip',
    navHref:'#contact',
    heroEyebrow:'Chapter one',
    heroTitle:'Some roads are meant to be felt.',
    heroTagline:'Slow roads. Big skies.',
    heroCta:'Plan a trip',
    heroHref:'#journey',
    j0Eyebrow:'Chapter two',
    j0Title:'Into the green',
    j0Body:'Pine forests, wet roads and mist that opens like a curtain. The first hours of the climb are the quietest.',
    j0Desktop:'assets/img/green-valley.webp',
    j0Mobile:'assets/img/mobile/green-valley-phone.webp',
    j1Eyebrow:'Chapter three',
    j1Title:'Where the river turns holy',
    j1Body:'Rishikesh, suspension bridges, evening aarti and a slow breakfast by the Ganga before the road climbs again.',
    j1Desktop:'assets/img/rishikesh.webp',
    j1Mobile:'assets/img/mobile/rishikesh-phone.webp',
    j2Eyebrow:'Higher roads',
    j2Title:'Where the valley gets wide.',
    j2Body:'Stone, sky and long empty stretches. The Himalayas start to feel larger than the map.',
    j2Desktop:'assets/img/ladakh-mountain.webp',
    j2Mobile:'assets/img/mobile/ladakh-mountain-phone.webp',
    j3Eyebrow:'Under the stars',
    j3Title:'Blue at the end of the road.',
    j3Body:'A long blue lake, cold wind and a camp pitched before the last light leaves the mountains.',
    j3Desktop:'assets/img/chandratal.webp',
    j3Mobile:'assets/img/mobile/chandratal-phone.webp',
    road0Title:'Manali',
    road0Body:'Pine forests, river bends and mountain air.',
    road1Title:'Ladakh',
    road1Body:'High passes, monasteries and enormous skies.',
    road2Title:'North India',
    road2Body:'A slower route through places with history behind them.',
    contactEyebrow:'The last page',
    contactTitle:"Let's plan the road.",
    contactBody:'Tell us where you want to go, when you want to leave and how you want the journey to feel. We will shape the route with you.',
    contactCta:'Talk on WhatsApp',
    whatsapp:'919800000000',
    whatsappMessage:'Hi Northbound, I want to plan a Himalayan journey.',
    contactDesktop:'assets/img/manali.webp',
    contactMobile:'assets/img/mobile/manali-phone.webp',
    instagram:'https://instagram.com/'
  };

  const clone = value => JSON.parse(JSON.stringify(value));
  const merge = (base, incoming) => Object.assign(base, incoming && typeof incoming === 'object' ? incoming : {});
  let settings = merge(clone(DEFAULTS), readSettings());

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    } catch (_) {
      return {};
    }
  }

  function saveSettings(next) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  }

  function applySettings() {
    document.title = settings.pageTitle || DEFAULTS.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', settings.metaDescription || DEFAULTS.metaDescription);
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute('content', settings.themeColor || DEFAULTS.themeColor);

    const root = document.documentElement;
    root.style.setProperty('--paper', settings.paper || DEFAULTS.paper);
    root.style.setProperty('--ink', settings.ink || DEFAULTS.ink);
    root.style.setProperty('--accent', settings.accent || DEFAULTS.accent);
    root.style.setProperty('--card', settings.card || DEFAULTS.card);
    root.style.setProperty('--heading', settings.headingFont || DEFAULTS.headingFont);
    root.style.setProperty('--body', settings.bodyFont || DEFAULTS.bodyFont);

    document.querySelectorAll('[data-bind]').forEach(el => {
      const key = el.dataset.bind;
      if (Object.prototype.hasOwnProperty.call(settings, key)) el.textContent = settings[key];
    });
    document.querySelectorAll('[data-bind-href]').forEach(el => {
      const key = el.dataset.bindHref;
      if (Object.prototype.hasOwnProperty.call(settings, key)) el.setAttribute('href', settings[key]);
    });

    const navCta = document.querySelector('[data-bind="navCta"]');
    if (navCta) navCta.setAttribute('href', settings.navHref || '#contact');

    const contactHref = buildWhatsAppHref(settings.whatsapp, settings.whatsappMessage);
    const contact = document.querySelector('[data-bind-href="contactHref"]');
    if (contact) contact.setAttribute('href', contactHref);

    const ig = document.querySelector('[data-bind-href="instagram"]');
    if (ig) ig.setAttribute('href', settings.instagram || '#');

    const contactImg = document.querySelector('[data-bind-src="contactDesktop"]');
    if (contactImg && settings.contactDesktop) contactImg.src = settings.contactDesktop;
    const mobileContact = document.querySelector('.contact-art source');
    if (mobileContact && settings.contactMobile) mobileContact.srcset = settings.contactMobile;

    updateJSONLD();
  }

  function buildWhatsAppHref(number, message) {
    const digits = String(number || '').replace(/\D/g, '');
    return `https://wa.me/${digits || '919800000000'}?text=${encodeURIComponent(message || '')}`;
  }

  function updateJSONLD() {
    const node = document.getElementById('site-schema');
    if (!node) return;
    try {
      const data = JSON.parse(node.textContent);
      data.name = settings.brand;
      data.description = settings.metaDescription;
      node.textContent = JSON.stringify(data);
    } catch (_) {}
  }

  function seedParticles() {
    // Birds are tiny CSS-only silhouettes, so the page needs no extra bird image.
    document.querySelectorAll('[data-birds]').forEach(container => {
      const count = container.dataset.birds === 'hero' ? 14 : 9;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i += 1) {
        const bird = document.createElement('i');
        bird.className = 'bird';
        bird.style.setProperty('--y', `${8 + Math.random() * 45}%`);
        bird.style.setProperty('--o', `${0.35 + Math.random() * 0.55}`);
        bird.style.setProperty('--s', `${0.55 + Math.random() * 0.8}`);
        bird.style.setProperty('--dur', `${28 + Math.random() * 30}s`);
        bird.style.setProperty('--delay', `${-Math.random() * 35}s`);
        bird.style.color = container.closest('.ride--suv') ? 'rgba(239,244,246,.7)' : 'rgba(52,43,34,.55)';
        fragment.appendChild(bird);
      }
      container.appendChild(fragment);
    });

    document.querySelectorAll('[data-leaf-count]').forEach(container => {
      const count = Number(container.dataset.leafCount) || 10;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i += 1) {
        const leaf = document.createElement('i');
        leaf.className = 'leaf';
        leaf.style.setProperty('--x', `${Math.random() * 100}%`);
        leaf.style.setProperty('--size', `${7 + Math.random() * 12}px`);
        leaf.style.setProperty('--rot', `${Math.random() * 360}deg`);
        leaf.style.setProperty('--drift', `${(Math.random() - .5) * 16}vw`);
        leaf.style.setProperty('--dur', `${8 + Math.random() * 8}s`);
        leaf.style.setProperty('--delay', `${-Math.random() * 14}s`);
        leaf.style.setProperty('--leaf', Math.random() > .55 ? '#6f8f4e' : '#8a9a53');
        fragment.appendChild(leaf);
      }
      container.appendChild(fragment);
    });

    document.querySelectorAll('[data-snow-count]').forEach(container => {
      const count = Number(container.dataset.snowCount) || 20;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i += 1) {
        const flake = document.createElement('i');
        flake.className = 'flake';
        flake.style.setProperty('--x', `${Math.random() * 100}%`);
        flake.style.setProperty('--size', `${1.5 + Math.random() * 4}px`);
        flake.style.setProperty('--drift', `${(Math.random() - .5) * 10}vw`);
        flake.style.setProperty('--dur', `${6 + Math.random() * 8}s`);
        flake.style.setProperty('--delay', `${-Math.random() * 13}s`);
        fragment.appendChild(flake);
      }
      container.appendChild(fragment);
    });

    seedDust('.vehicle-dust--bike', 12);
    seedDust('.vehicle-dust--suv', 14);
  }

  function seedDust(selector, count) {
    const container = document.querySelector(selector);
    if (!container) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement('i');
      dot.className = 'dust-dot';
      dot.style.setProperty('--s', `${5 + Math.random() * 11}px`);
      dot.style.setProperty('--x', `${-8 - Math.random() * 12}vw`);
      dot.style.setProperty('--y', `${-2 - Math.random() * 8}vh`);
      dot.style.setProperty('--d', `${1.8 + Math.random() * 1.5}s`);
      dot.style.setProperty('--delay', `${-Math.random() * 2}s`);
      fragment.appendChild(dot);
    }
    container.appendChild(fragment);
  }

  function setupHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero || reduceMotion) return;
    const layers = [...document.querySelectorAll('.hero-cutout[data-depth]')];
    const copy = hero.querySelector('.hero-copy');

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      layers.forEach(el => {
        const depth = Number(el.dataset.depth) || .1;
        el.style.transform = `translate3d(0,${progress * depth * 10}vh,0) scale(${1 + progress * depth * .16})`;
      });
      if (copy) {
        copy.style.opacity = String(Math.max(0, 1 - progress * 2.2));
        copy.style.transform = `translate3d(-50%,${-progress * 7}vh,0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', update, {passive:true});
    update();

    if (finePointer) {
      window.addEventListener('pointermove', e => {
        const nx = e.clientX / Math.max(1, innerWidth) - .5;
        layers.forEach(el => {
          const depth = Number(el.dataset.depth) || .1;
          el.style.marginLeft = `${-nx * depth * 28}px`;
        });
      }, {passive:true});
    }
  }

  function setupNav() {
    const nav = document.getElementById('site-nav');
    const toggle = nav?.querySelector('.nav-toggle');
    if (!toggle) return;

    const setOpen = open => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', e => { if (!nav.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 701px)').addEventListener('change', () => setOpen(false));
  }

  function setupCoupled(section) {
    const scenes = [...section.querySelectorAll('.coupled-scene')];
    if (scenes.length < 2) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const max = Math.max(1, rect.height - innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / max));
      let first;
      let second;
      if (reduceMotion) {
        // Swap scenes at the midpoint without a crossfade or drift.
        first = p < .5 ? 1 : 0;
        second = 1 - first;
      } else {
        const fadeWindow = .16;
        first = p < .5 ? 1 : Math.max(0, 1 - (p - .5) / fadeWindow);
        second = p < .5 - fadeWindow ? 0 : Math.min(1, (p - (.5 - fadeWindow)) / fadeWindow);
        scenes.forEach((scene, index) => {
          scene.style.transform = `translate3d(0,${(index === 0 ? -p * 2.5 : (1 - p) * 2.5)}vh,0)`;
        });
      }
      scenes[0].style.opacity = String(first);
      scenes[1].style.opacity = String(second);
      scenes[0].style.visibility = first > .01 ? 'visible' : 'hidden';
      scenes[1].style.visibility = second > .01 ? 'visible' : 'hidden';
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', update, {passive:true});
    update();
  }

  function setupRide(section) {
    const rideStage = section.querySelector('.ride-stage');
    const vehicle = section.querySelector('.vehicle');
    const cards = [...section.querySelectorAll('.journey-card')];
    const progressBar = section.querySelector('.ride-progress span');
    if (!rideStage || !vehicle) return;

    const cardSpecs = [
      {start:.00, inEnd:.11, holdEnd:.28, outEnd:.36, from:-25, to:20},
      {start:.29, inEnd:.40, holdEnd:.59, outEnd:.67, from:-23, to:22},
      {start:.60, inEnd:.71, holdEnd:.90, outEnd:1.0, from:-22, to:24}
    ];

    // Breakpoint-dependent values come from CSS custom properties so the layout lives in one place.
    let stagger = 0;
    let vehicleEnd = 80;
    let centeredX = 0;
    const measure = () => {
      const styles = getComputedStyle(section);
      stagger = parseFloat(styles.getPropertyValue('--card-stagger')) || 0;
      vehicleEnd = parseFloat(styles.getPropertyValue('--vehicle-end')) || 80;
      // Resting x (vw) that centres a card; used as a cap so no card rests past the right edge.
      const cardWidth = cards[0]?.offsetWidth || 0;
      centeredX = (innerWidth - cardWidth) / 2 / Math.max(1, innerWidth) * 100;
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const max = Math.max(1, section.offsetHeight - innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / max));

      // Background never moves horizontally. Only this actor layer responds to scroll.
      const vehicleStart = -32;
      const vehicleX = reduceMotion ? 28 : vehicleStart + (vehicleEnd - vehicleStart) * p;
      vehicle.style.transform = `translate3d(${vehicleX}vw,0,0)`;

      if (progressBar) progressBar.style.width = `${p * 100}%`;

      cards.forEach((card, i) => {
        const s = cardSpecs[i] || cardSpecs[cardSpecs.length - 1];
        const to = Math.min(s.to, centeredX);
        let opacity = 0;
        let x = s.from;
        let y = 0;
        if (reduceMotion) {
          // Show one card at a time in its resting spot, with no movement.
          const next = cardSpecs[i + 1];
          opacity = p >= s.start && (!next || i === cards.length - 1 || p < next.start) ? 1 : 0;
          x = to;
        } else if (p <= s.start) {
          opacity = 0;
          x = s.from;
          y = 22;
        } else if (p < s.inEnd) {
          const t = (p - s.start) / (s.inEnd - s.start);
          opacity = t;
          x = s.from + (to - s.from) * t;
          y = 22 - 22 * t;
        } else if (p < s.holdEnd) {
          opacity = 1;
          x = to;
          y = 0;
        } else if (p < s.outEnd) {
          const t = (p - s.holdEnd) / Math.max(.001, s.outEnd - s.holdEnd);
          opacity = 1 - t;
          x = to + 25 * t;
          y = -10 * t;
        } else {
          opacity = 0;
          x = to + 25;
          y = -10;
        }
        card.style.opacity = opacity.toFixed(3);
        // Each card moves with the road timeline. The stage itself stays still.
        const vertical = (i % 2 === 0 ? -1 : 1) * stagger;
        card.style.transform = `translate3d(${x}vw,${vertical + y}vh,0)`;
      });
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', () => { measure(); update(); }, {passive:true});
    measure();
    update();
  }

  function initSettingsPage() {
    const form = document.getElementById('settingsForm');
    if (!form) return;

    const fields = [...form.querySelectorAll('[name]')];
    fields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(settings, field.name)) field.value = settings[field.name];
    });

    const status = document.getElementById('saveStatus');
    const setStatus = msg => { if (status) status.textContent = msg; };

    document.getElementById('saveSettings')?.addEventListener('click', () => {
      const next = clone(settings);
      fields.forEach(field => { next[field.name] = field.value; });
      settings = merge(clone(DEFAULTS), next);
      saveSettings(settings);
      setStatus('Saved in this browser. Refresh the website to preview it.');
    });

    document.getElementById('resetSettings')?.addEventListener('click', () => {
      settings = clone(DEFAULTS);
      saveSettings(settings);
      fields.forEach(field => { if (Object.prototype.hasOwnProperty.call(settings, field.name)) field.value = settings[field.name]; });
      setStatus('Defaults restored.');
    });

    document.getElementById('exportSettings')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(settings, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'northbound-settings.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus('JSON exported.');
    });

    document.getElementById('importSettings')?.addEventListener('change', async e => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await file.text());
        settings = merge(clone(DEFAULTS), parsed);
        saveSettings(settings);
        fields.forEach(field => { if (Object.prototype.hasOwnProperty.call(settings, field.name)) field.value = settings[field.name]; });
        setStatus('JSON imported and saved.');
      } catch (_) {
        setStatus('That file is not valid Northbound settings JSON.');
      }
      e.target.value = '';
    });
  }

  applySettings();
  initSettingsPage();

  if (!document.querySelector('[data-settings-page]')) {
    if (reduceMotion) document.documentElement.classList.add('calm');
    setupNav();
    seedParticles();
    setupHeroParallax();
    document.querySelectorAll('.coupled').forEach(setupCoupled);
    document.querySelectorAll('.ride').forEach(setupRide);
  }
})();
