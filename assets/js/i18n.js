/* Language switcher.
 *
 * Georgian is the source language and stays in the HTML, so the site reads
 * correctly with JavaScript off. English strings live in assets/i18n/en/*.js
 * and are merged into window.I18N before this file runs.
 *
 * Markup contract:
 *   data-i18n="key"                  replace textContent
 *   data-i18n-html="key"             replace innerHTML (for text with <br>, <strong>, ...)
 *   data-i18n-attr="alt:key|title:key"  replace attributes
 * <title> and <meta name="description"> are picked up automatically under the
 * keys meta.title and meta.desc.
 */
(function () {
  var STORAGE_KEY = 'ba-lang';
  var DEFAULT_LANG = 'ka';
  var LANG_NAMES = { ka: 'ქართული', en: 'English' };
  var slots = [];
  var originals = [];

  function stored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function remember(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  function textSlot(el) {
    return {
      get: function () { return el.textContent; },
      set: function (v) { el.textContent = v; }
    };
  }

  function htmlSlot(el) {
    return {
      get: function () { return el.innerHTML; },
      set: function (v) { el.innerHTML = v; }
    };
  }

  function attrSlot(el, attr) {
    return {
      get: function () { return el.getAttribute(attr); },
      set: function (v) { el.setAttribute(attr, v); }
    };
  }

  function add(key, slot) {
    slot.key = key;
    slots.push(slot);
    originals.push(slot.get());
  }

  function collect() {
    each('[data-i18n]', function (el) {
      add(el.getAttribute('data-i18n'), textSlot(el));
    });
    each('[data-i18n-html]', function (el) {
      add(el.getAttribute('data-i18n-html'), htmlSlot(el));
    });
    each('[data-i18n-attr]', function (el) {
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        var split = pair.indexOf(':');
        if (split < 0) return;
        add(pair.slice(split + 1).trim(), attrSlot(el, pair.slice(0, split).trim()));
      });
    });

    var title = document.querySelector('title');
    if (title) add('meta.title', textSlot(title));

    var desc = document.querySelector('meta[name="description"]');
    if (desc) add('meta.desc', attrSlot(desc, 'content'));
  }

  function apply(lang) {
    var dict = lang === DEFAULT_LANG ? null : (window.I18N || {});

    slots.forEach(function (slot, i) {
      // Fall back to the Georgian original whenever a key has no translation,
      // so a missing string shows real text rather than a blank or a key name.
      var value = dict && dict[slot.key] != null ? dict[slot.key] : originals[i];
      if (slot.get() !== value) slot.set(value);
    });

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    each('[data-lang]', function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-lang') === lang);
    });

    var current = document.querySelector('.lang-current');
    if (current && LANG_NAMES[lang]) current.textContent = LANG_NAMES[lang];
  }

  function reveal() {
    document.documentElement.classList.remove('i18n-pending');
    var style = document.getElementById('i18n-fouc');
    if (style && style.parentNode) style.parentNode.removeChild(style);
  }

  function setOpen(dropdown, open) {
    if (!dropdown) return;
    dropdown.classList.toggle('open', open);
    var toggle = dropdown.querySelector('.lang-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeAll() {
    each('.lang-dropdown', function (d) { setOpen(d, false); });
  }

  function bindSwitcher() {
    each('.lang-toggle', function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = toggle.parentNode;
        var open = dropdown.classList.contains('open');
        closeAll();
        setOpen(dropdown, !open);
      });
    });

    each('[data-lang]', function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var lang = el.getAttribute('data-lang');
        remember(lang);
        apply(lang);
        closeAll();
      });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  }

  function start() {
    collect();
    bindSwitcher();
    apply(stored() === 'en' ? 'en' : DEFAULT_LANG);
    reveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // If anything above throws, never leave the page hidden.
  window.addEventListener('load', reveal);
})();
