/* ============================================================
   RSVP & GIFT FORM HANDLERS
   ------------------------------------------------------------
   Mengirim data ke tabel "rsvp" dan "gifts" di Supabase.
   Pastikan tabel sudah dibuat sesuai petunjuk di README.
   ============================================================ */

/**
 * Kirim konfirmasi kehadiran
 */
async function submitRSVP(e) {
  e.preventDefault();

  const btn  = document.getElementById('rsvp-btn');
  const msg  = document.getElementById('rsvp-msg');
  const name = document.getElementById('rsvp-name').value.trim();
  const att  = document.querySelector('input[name="attendance"]:checked')?.value;
  const note = document.getElementById('rsvp-message').value.trim();

  if (!name || !att) return;

  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  try {
    const { error } = await sb.from('rsvp').insert([{
      guest_name: name,
      attendance: att === 'hadir',   // true jika "hadir", false jika "tidak_hadir"
      message: note
    }]);

    if (error) throw error;

    showFormMsg(msg, 'success', '✓ Terima kasih! Konfirmasi Anda telah kami terima.');
    document.getElementById('rsvp-form').reset();
  } catch (err) {
    console.error('RSVP error:', err);
    showFormMsg(msg, 'error', '✗ Gagal mengirim. Silakan coba lagi.');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp;&nbsp;Kirim Konfirmasi';
}

/**
 * Kirim ucapan & doa (amplop digital)
 */
async function submitGift(e) {
  e.preventDefault();

  const btn  = document.getElementById('gift-btn');
  const msg  = document.getElementById('gift-msg');
  const name = document.getElementById('gift-name').value.trim();
  const note = document.getElementById('gift-message').value.trim();

  if (!name) return;

  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  try {
    const { error } = await sb.from('gifts').insert([{
      sender_name: name,
      message: note
    }]);

    if (error) throw error;

    showFormMsg(msg, 'success', '✓ Ucapan Anda telah terkirim. Terima kasih!');
    document.getElementById('gift-form').reset();
  } catch (err) {
    console.error('Gift error:', err);
    showFormMsg(msg, 'error', '✗ Gagal mengirim. Silakan coba lagi.');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-heart"></i>&nbsp;&nbsp;Kirim Ucapan';
}

/**
 * Tampilkan pesan sukses / error di bawah form
 */
function showFormMsg(el, type, text) {
  if (!el) return;
  el.className = 'form-msg ' + type;
  el.textContent = text;
  el.style.display = 'block';
}