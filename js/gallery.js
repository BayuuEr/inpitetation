/* ============================================================
   GALLERY / LIGHTBOX
   ------------------------------------------------------------
   Mengaktifkan lightbox untuk galeri foto (GLightbox).
   Dipanggil setelah undangan dibuka.
   ============================================================ */

function initGallery() {
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: false
    });
  }
}