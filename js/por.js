document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  // 1. Fungsi Animasi Scroll Reveal 
  function scrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("show");
      }
    });
  }

  // 2. Fungsi Menu Navigasi Aktif Otomatis Berdasarkan Posisi Halaman
  function highlightMenu() {
    let currentSectionId = "";
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= (sectionTop - 200)) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSectionId)) {
        link.classList.add("active");
      }
    });
  }

  // 3. Efek Navbar Saat Digulir Ke Bawah
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // 4. Hamburger Menu Seluler
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  
  if (hamburger && menu) {
    hamburger.onclick = () => {
      menu.classList.toggle("active");
    };
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }
  
  // --- 5. LOGIKA FILTER GALERI KEGIATAN (KOSONG DI AWAL) ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryHint = document.getElementById("galleryHint"); // Ambil elemen teks petunjuk

  // Sembunyikan semua foto kegiatan saat pertama kali web dimuat
  galleryItems.forEach(item => {
    item.classList.add("hide");
    item.classList.remove("show-active");
  });

  // Logika ketika tombol filter diklik
  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Sembunyikan teks petunjuk "Mohon klik tombol..." dengan efek transisi atau langsung hilang
      if (galleryHint) {
        galleryHint.style.display = "none";
      }

      // Atur tombol yang aktif
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      const targetCategory = this.getAttribute("data-target");

      // Sortir fotonya
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (itemCategory === targetCategory) {
          item.classList.remove("hide");
          setTimeout(() => {
            item.classList.add("show-active");
          }, 20); // Jeda micro-second untuk memicu efek transisi CSS
        } else {
          item.classList.remove("show-active");
          item.classList.add("hide");
        }
      });
    });
  });

  // --- 6. LOGIKA KLIK ZOOM SERTIFIKAT (MODAL LIGHTBOX) ---
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("imgExpanded");
  const captionText = document.getElementById("captionModal");
  const closeModal = document.querySelector(".close-modal");
  
  const certImages = document.querySelectorAll(".cert-img-container img");

  certImages.forEach(img => {
    img.style.cursor = "zoom-in";
    
    img.onclick = function() {
      modal.style.display = "block";
      modalImg.src = this.src; 
      captionText.innerHTML = this.alt; 
    }
  });

  if (closeModal) {
    closeModal.onclick = function() {
      modal.style.display = "none";
    }
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Jalankan fungsi scroll saat halaman digulir
  window.addEventListener("scroll", () => {
    scrollReveal();
    highlightMenu();
    handleNavbarScroll();
  });

  // Eksekusi pemicu awal saat halaman sukses dimuat
  scrollReveal();
  highlightMenu();
  handleNavbarScroll();
  
    // --- LOGIKA SMOOTH LAZY LOADING ---
  const lazyImages = document.querySelectorAll('.lazy-img');

  lazyImages.forEach(img => {
    // Jika gambar ternyata sudah selesai di-load (cache browser)
    if (img.complete) {
      img.setAttribute('data-loaded', 'true');
    } else {
      // Jika baru di-load saat di-scroll
      img.addEventListener('load', () => {
        img.setAttribute('data-loaded', 'true');
      });
    }
  });

});
