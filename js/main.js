/* ============================================================
   MAIN CONTROLLER — js/main.js
   ------------------------------------------------------------
   - Parsing nama tamu dari URL (?to=Nama)
   - Membuka undangan (animasi amplop)
   - Inisialisasi AOS, countdown, galeri, musik
   - Toggle musik latar
   - Salin nomor rekening
   ============================================================ */

/* ── NAMA TAMU DARI URL ──────────────────────
   Akses: index.html?to=Nama+Tamu
   atau   index.html?kepada=Nama+Tamu
   ─────────────────────────────────────────── */
(function setGuestName() {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get('to') || params.get('kepada');
  if (guest) {
    const el = document.getElementById('guest-display');
    if (el) el.textContent = decodeURIComponent(guest);
  }
})();

/* ── BUKA UNDANGAN ────────────────────────── */
function openInvitation() {
  const envelope = document.getElementById('envelope');
  const screen   = document.getElementById('envelope-screen');
  const main     = document.getElementById('main-content');

  if (envelope) envelope.classList.add('open');

  setTimeout(() => {
    if (screen) screen.classList.add('hidden');
    if (main)   main.classList.add('visible');

    // Inisialisasi AOS (animasi scroll)
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 750, once: true, offset: 70 });
    }

    // Hitung mundur
    if (typeof startCountdown === 'function') {
      startCountdown();
    }

    // Galeri lightbox
    if (typeof initGallery === 'function') {
      initGallery();
    }

    // Musik latar
    if (typeof tryPlayMusic === 'function') {
      tryPlayMusic();
    }
  }, 900);
}

/* ── MUSIK ────────────────────────────────── */
function tryPlayMusic() {
  const audio = document.getElementById('bg-music');
  const btn   = document.getElementById('music-toggle');
  if (!audio) return;
  audio.volume = 0.55;
  audio.play()
    .then(() => btn?.classList.remove('paused'))
    .catch(() => { /* autoplay dicegah browser */ });
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const btn   = document.getElementById('music-toggle');
  if (!audio) return;
  if (audio.paused) {
    audio.play();
    btn?.classList.remove('paused');
  } else {
    audio.pause();
    btn?.classList.add('paused');
  }
}

/* ── SALIN NOMOR REKENING ─────────────────── */
function copyNumber(number, btn) {
  navigator.clipboard.writeText(number).then(() => {
    const originalHTML = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove('copied');
    }, 2200);
  }).catch(() => {
    // Fallback untuk browser lama
    const textarea = document.createElement('textarea');
    textarea.value = number;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    const originalHTML = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove('copied');
    }, 2200);
  });
}