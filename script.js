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

const itemsWisata = document.querySelectorAll('.wisata-item');
const itemsKuliner = document.querySelectorAll('.kuliner-item');

function showItemsOnScroll() {
    const triggerBottom = window.innerHeight / 5 * 4;

    // Animasi WISATA
    itemsWisata.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add('show');
        }
    });

    // Animasi KULINER
    itemsKuliner.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add('show');
        }
    });
}

window.addEventListener('scroll', showItemsOnScroll);
document.addEventListener('DOMContentLoaded', showItemsOnScroll);


// Buat objek audio
const klikSound = new Audio('musik/klik.wav');
const clicksound2 = new Audio('musik/klik2.ogg');

// Ambil semua tombol detail & back
const detailButtons = document.querySelectorAll('.btn-detail');
const detailsButtons = document.querySelectorAll('.btn-back');

// Tombol detail
detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        klikSound.currentTime = 0;
        klikSound.play();

        setTimeout(() => {
            window.location.href = button.href;
        }, 300);
    });
});

// Tombol back
detailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        clicksound2.currentTime = 0;
        clicksound2.play();

        setTimeout(() => {
            window.location.href = button.href;
        }, 300);
    });
});
