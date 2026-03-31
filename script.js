// ===============================
// SCROLL SUAVE
// ===============================
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth"
  });
}

function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
}


// ===============================
// ANIMAÇÃO MODERNA (INTERSECTION OBSERVER)
// ===============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transitionDelay = `${index * 0.15}s`;
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".project").forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(80px)";
  el.style.transition = "all 0.8s ease";
  observer.observe(el);
});


// ===============================
// LIGHTBOX (IMAGEM GRANDE)
// ===============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// abre imagem (funciona com galeria também)
document.querySelectorAll(".project img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

// fechar no X
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// fechar clicando fora
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});

// fechar com ESC (UX top)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
  }
});


// ===============================
// GALERIA (SLIDER)
// ===============================
document.querySelectorAll(".gallery").forEach(gallery => {
  const track = gallery.querySelector(".gallery-track");
  const images = gallery.querySelectorAll("img");

  let index = 0;

  const updateSlide = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  gallery.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateSlide();
  });

  gallery.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateSlide();
  });

  // swipe no celular 🔥
  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      index = (index + 1) % images.length;
    } else if (endX - startX > 50) {
      index = (index - 1 + images.length) % images.length;
    }

    updateSlide();
  });
});