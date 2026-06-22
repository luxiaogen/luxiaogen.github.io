/* ══════════════════════════════════════════════
   Theme Toggle
   ══════════════════════════════════════════════ */
(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');

  // Resolve initial theme: saved > system > light
  function resolveTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Apply on load (no flash)
  apply(resolveTheme());

  // Toggle on click
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
  });

  // Follow system changes when no manual override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      apply(e.matches ? 'dark' : 'light');
    }
  });
})();
