/* Trimmed from the original "Flowers for Someone" repo: no title
   typewriter here (the host page already has its own heading) —
   this just kicks off the grow/bloom animation shortly after the
   embed loads (which, thanks to loading="lazy" on the <iframe> in
   the host page, is roughly when it scrolls into view). */
onload = () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
  }, 500);
};

/* Halaman utama mengirim perintah:
     "restart" -> bunga mekar lagi dari awal (tiap kali di-scroll ke sini)
     "play"    -> lanjut (mis. kembali dari tab lain)
     "pause"   -> jeda (di luar layar, hemat baterai) */
addEventListener("message", (e) => {
  const d = e.data;
  if (!d || typeof d.flower !== "string") return;
  const root = document.documentElement;

  if (d.flower === "pause") {
    root.classList.add("is-paused");
  } else if (d.flower === "play") {
    root.classList.remove("is-paused");
  } else if (d.flower === "restart") {
    root.classList.add("is-reset");
    void root.offsetWidth;                 // paksa browser menghitung ulang -> animasi di-reset
    root.classList.remove("is-reset", "is-paused");
  }
});
