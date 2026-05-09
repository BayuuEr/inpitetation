/* ============================================================
   COUNTDOWN TIMER
   ------------------------------------------------------------
   Hitung mundur otomatis menuju tanggal pernikahan.
   Ubah WEDDING_DATE sesuai jadwal acara.
   ============================================================ */

const WEDDING_DATE = new Date('2026-07-12T08:00:00');

function startCountdown() {
  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const pad = n => String(n).padStart(2, '0');

  const tick = () => {
    const diff = WEDDING_DATE - new Date();

    if (diff <= 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    daysEl.textContent    = pad(Math.floor(diff / 86400000));
    hoursEl.textContent   = pad(Math.floor((diff % 86400000) / 3600000));
    minutesEl.textContent = pad(Math.floor((diff % 3600000) / 60000));
    secondsEl.textContent = pad(Math.floor((diff % 60000) / 1000));
  };

  tick();
  setInterval(tick, 1000);
}