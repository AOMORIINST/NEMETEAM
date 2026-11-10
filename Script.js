
// =======================================
// IRON FIGHT CLUB - JAVASCRIPT
// =======================================

// CONFIGURACIÓN DEL GIMNASIO
// Reemplazar con datos reales.

const CONFIG = {
  whatsapp: "549XXXXXXXXXX",
  instagram: "https://www.instagram.com/",
  mensajeWhatsApp:
    "Hola! Quisiera recibir información sobre las clases del gimnasio."
};

// ELEMENTOS

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-link");

// =======================================
// HEADER AL HACER SCROLL
// =======================================

function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

// =======================================
// MENÚ RESPONSIVE
// =======================================

function openMenu() {
  navLinks.classList.add("open");
  menuToggle.classList.add("open");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Cerrar menú");

  document.body.classList.add("menu-open");
}

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");

  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  if (navLinks.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Cerrar al seleccionar un enlace

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Cerrar con Escape

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Cerrar al pasar a escritorio

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    closeMenu();
  }
});

// =======================================
// ANIMACIONES AL HACER SCROLL
// =======================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}

// =======================================
// NAVEGACIÓN ACTIVA
// =======================================

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navigationLinks.forEach(link => {
          const isActive =
            link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("active", isActive);
        });

      });

    },
    {
      rootMargin: "-30% 0px -55% 0px"
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

}

// =======================================
// FILTRO DE HORARIOS
// =======================================

const scheduleTabs = document.querySelectorAll(".schedule-tab");
const scheduleRows = document.querySelectorAll(
  ".schedule-table tbody tr"
);

scheduleTabs.forEach(tab => {

  tab.addEventListener("click", () => {

    scheduleTabs.forEach(button => {
      button.classList.remove("active");
    });

    tab.classList.add("active");

    const filter = tab.dataset.filter;

    scheduleRows.forEach(row => {

      const category = row.dataset.category;

      const shouldShow =
        filter === "all" || filter === category;

      row.hidden = !shouldShow;

    });

  });

});

// =======================================
// CONTACTO WHATSAPP
// =======================================

const whatsappLink = document.getElementById("whatsappLink");
const floatingWhatsapp = document.getElementById("floatingWhatsapp");

const whatsappNumber = CONFIG.whatsapp.replace(/\D/g, "");

const whatsappURL =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(CONFIG.mensajeWhatsApp)}`;

if (whatsappNumber.includes("X") || whatsappNumber.length < 10) {
  // Se evita enviar a un número de demostración.
  whatsappLink.removeAttribute("href");
  floatingWhatsapp.removeAttribute("href");

  [whatsappLink, floatingWhatsapp].forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert("Configurá el número de WhatsApp en script.js.");
    });
  });
} else {
  whatsappLink.href = whatsappURL;
  floatingWhatsapp.href = whatsappURL;
}

// =======================================
// INSTAGRAM
// =======================================

const instagramLink = document.getElementById("instagramLink");

instagramLink.href = CONFIG.instagram;

// =======================================
// AÑO AUTOMÁTICO
// =======================================

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// =======================================
// EFECTO PARALLAX SUAVE EN HERO
// =======================================

const heroContent = document.querySelector(".hero-content");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let ticking = false;

function updateParallax() {

  if (!reduceMotion.matches && window.innerWidth > 850) {

    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {
      heroContent.style.transform =
        `translateY(${scrollPosition * 0.12}px)`;
    }

  } else {
    heroContent.style.transform = "";
  }

  ticking = false;
}

window.addEventListener("scroll", () => {

  if (!ticking) {

    window.requestAnimationFrame(updateParallax);

    ticking = true;

  }

}, { passive: true });

// =======================================
// MENSAJE DE INICIALIZACIÓN
// =======================================

console.log("IRON FIGHT CLUB - Web inicializada");