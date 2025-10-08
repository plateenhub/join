// popup.js — Works for both index.html & lander.html with INSTANT redirect on close (lander)
document.addEventListener('DOMContentLoaded', () => {
  const path = (location.pathname || '').toLowerCase();
  const isLander = /lander\.html$/.test(path);
  const isHome   = /(^\/$|index\.html$)/.test(path) || path.endsWith('/');

  if (!isLander && !isHome) return; // run only on those pages

  // 🎯 configurations
  const cfg = isLander
    ? {
        title: 'Welcome Notice',
        text:  'Welcome to our landing page. Please review and accept our usage policy to continue exploring.',
        yes:   'Agree',
        no:    'Close',
        redirectOnClose:  'link paste here', // redirect when closed (lander)
        redirectOnAccept: 'link paste here'                                         // no redirect on accept (lander)
      }
    : {
        title: 'Policy Notice',
        text:  'Do you accept our policy before exploring our content?',
        yes:   'Yes, Accept',
        no:    'Close',
        redirectOnClose:  '',                                        // no redirect on close (index)
        redirectOnAccept: ''             // redirect on accept (index)
      };

  // Build modal (namespaced classes to avoid Bootstrap conflicts)
  const bd = document.createElement('div');
  bd.className = 'ttf-backdrop active';
  bd.innerHTML = `
    <div class="ttf-modal show" role="dialog" aria-modal="true">
      <button class="close-btn" aria-label="Close">×</button>
      <h3 style="margin-top:0">${cfg.title}</h3>
      <p>${cfg.text}</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px">
        <button class="btn" id="yes-btn">${cfg.yes}</button>
        <button class="btn ghost" id="no-btn">${cfg.no}</button>
      </div>
    </div>
  `;
  document.body.appendChild(bd);
  document.body.classList.add('ttf-modal-open');

  // Helper: close + optional redirect
  function closeModal(redirectUrl = null) {
    // If redirecting, do it RIGHT AWAY (no 300ms wait)
    if (redirectUrl) {
      try {
        // Clean up quickly (non-blocking)
        document.body.classList.remove('ttf-modal-open');
        bd.remove();
      } catch {}
      // Instant navigation (replace avoids back-button returning to modal)
      window.location.replace(redirectUrl);
      return;
    }

    // No redirect → allow a tiny animation if you like
    // Set to 0 if you want ZERO delay always
    const ANIM_MS = 150;

    bd.querySelector('.ttf-modal')?.classList.remove('show');
    bd.classList.remove('active');
    document.body.classList.remove('ttf-modal-open');
    setTimeout(() => {
      try { bd.remove(); } catch {}
    }, ANIM_MS);
  }

  // Accept
  bd.querySelector('#yes-btn').addEventListener('click', () => {
    if (cfg.redirectOnAccept) closeModal(cfg.redirectOnAccept); // INSTANT
    else closeModal();                                          // just close
  });

  // Close paths (button, X, outside, ESC)
  function handleClose() {
    if (cfg.redirectOnClose) closeModal(cfg.redirectOnClose); // INSTANT
    else closeModal();                                        // just close
  }
  bd.querySelector('#no-btn').addEventListener('click', handleClose);
  bd.querySelector('.close-btn').addEventListener('click', handleClose);
  bd.addEventListener('click', (e) => { if (e.target === bd) handleClose(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') handleClose(); });
});


