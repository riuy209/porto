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

  window.addEventListener("scroll", () => {
    scrollReveal();
    highlightMenu();
    handleNavbarScroll();
  });

  // Eksekusi Pemicu Awal Pemuatan
  scrollReveal();
  highlightMenu();
  handleNavbarScroll();
    // --- LOGIKA KLIK ZOOM SERTIFIKAT ---
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("imgExpanded");
  const captionText = document.getElementById("captionModal");
  const closeModal = document.querySelector(".close-modal");
  
  // Ambil semua gambar yang ada di dalam kartu sertifikat
  const certImages = document.querySelectorAll(".cert-img-container img");

  certImages.forEach(img => {
    // Buat kursor berubah jadi icon zoom-in saat diarahkan ke gambar
    img.style.cursor = "zoom-in";
    
    img.onclick = function() {
      modal.style.display = "block";
      modalImg.src = this.src; // Ambil gambar yang diklik
      captionText.innerHTML = this.alt; // Ambil teks alternatif sebagai judul popup
    }
  });

  // Fungsi menutup modal saat tombol (X) diklik
  if (closeModal) {
    closeModal.onclick = function() {
      modal.style.display = "none";
    }
  }

  // Fungsi menutup modal otomatis jika user klik area kosong di luar gambar
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
