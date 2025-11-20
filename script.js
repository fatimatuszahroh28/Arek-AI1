// script.js
document.addEventListener('DOMContentLoaded', () => {
  // DARK MODE TOGGLE
  const toggle = document.querySelector('.toggle-dark');
  if (toggle) {
    const applyIcon = () => {
      toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    };

    // restore preference (optional)
    try {
      if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
    } catch (e) {}

    applyIcon();

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      try {
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      } catch (e) {}
      applyIcon();
    });
  }

  // scroll reveal for .wisata-item and gallery images
  const revealItems = () => {
    const items = document.querySelectorAll('.wisata-item, .galeri-grid img');
    items.forEach(i => {
      const rect = i.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        i.classList.add('visible');
      }
    });
  };

  revealItems();
  window.addEventListener('scroll', revealItems);
  window.addEventListener('resize', revealItems);
});

// slider-safe.js
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const slides = Array.from(document.querySelectorAll('.slides'));
    if (!slides.length) { 
      console.info('Slider: tidak ada elemen .slides pada halaman ini.'); 
      return;
    }

    let index = 0;
    let autoTimer = null;
    const intervalMs = 4000;

    function show(i) {
      if (!slides.length) return;
      slides.forEach(s => s.style.display = 'none');
      slides[i].style.display = 'block';
    }

    function go(n) {
      index = (n + slides.length) % slides.length;
      show(index);
    }

    // prev / next buttons (jika ada)
    const prevBtns = document.querySelectorAll('.prev');
    const nextBtns = document.querySelectorAll('.next');
    prevBtns.forEach(btn => btn.addEventListener('click', function (e) {
      e.preventDefault();
      go(index - 1);
      resetAuto();
    }));
    nextBtns.forEach(btn => btn.addEventListener('click', function (e) {
      e.preventDefault();
      go(index + 1);
      resetAuto();
    }));

    // start auto
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => go(index + 1), intervalMs);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    function resetAuto() { startAuto(); }

    // initial show
    show(index);
    startAuto();

    // optional: pause on hover (if desired)
    const sliderEl = document.querySelector('.slider-detail');
    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', stopAuto);
      sliderEl.addEventListener('mouseleave', startAuto);
    }
  });
})();

// LOADING ketika pindah ke halaman destinasi
document.addEventListener("DOMContentLoaded", () => {
    const btnDestinasi = document.querySelector(".btn-primary");
    const loader = document.getElementById("loader");

    if (btnDestinasi) {
        btnDestinasi.addEventListener("click", (e) => {
            e.preventDefault(); // tahan dulu supaya loader muncul
            loader.style.display = "flex";

            setTimeout(() => {
                window.location.href = btnDestinasi.getAttribute("href");
            }, 1500); // delay 1.5 detik
        });
    }
});

// Ambil semua elemen wisata-item
const items = document.querySelectorAll('.wisata-item');

function showItemsOnScroll() {
    const triggerBottom = window.innerHeight / 5 * 4; // 80% dari viewport

    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if(itemTop < triggerBottom){
            item.classList.add('show');
        }
    });
}


// Jalankan saat scroll
window.addEventListener('scroll', showItemsOnScroll);

// Jalankan juga sekali saat halaman load
showItemsOnScroll();

// Buat objek audio
const klikSound = new Audio('musik/klik.wav');

// Ambil semua tombol detail
const detailButtons = document.querySelectorAll('.btn-detail');

// Tambahkan event click
detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // hentikan sementara navigasi
        klikSound.currentTime = 0; // mulai dari awal
        klikSound.play();

        // Pindah halaman setelah 200ms supaya suara terdengar
        setTimeout(() => {
            window.location.href = button.href;
        }, 200);
    });
});
