// Sélection de l'élément fluff-container
const fluffContainer = document.querySelector('.fluff-container');
const fluffStyle = fluffContainer.style;

// Fonction pour gérer l'intersection de l'élément fluff-container avec la fenêtre
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fluffStyle.visibility = 'visible';
      fluffContainer.classList.add('appearfl');
    } else {
      fluffStyle.visibility = 'hidden';
      fluffContainer.classList.remove('appearfl');
    }
  });
}

// Options pour l'IntersectionObserver
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

// Création et observation de l'IntersectionObserver pour fluff-container
const observer = new IntersectionObserver(handleIntersection, options);
observer.observe(fluffContainer);

// Initialise l'état de visibilité de l'élément fluff-container
fluffStyle.visibility = 'hidden';
const initialEntry = {
  isIntersecting: fluffContainer.getBoundingClientRect().top < window.innerHeight,
  target: fluffContainer
};
handleIntersection([initialEntry], observer);

// Fonction pour basculer entre les traductions de texte
function toggleTranslation() {
    const textsFr = document.querySelectorAll(".text-fr");
    const textsEn = document.querySelectorAll(".text-en");
    const translationButton = document.getElementById("translation-button");
  
    // Basculer la visibilité des textes en français
    textsFr.forEach((textFr) => {
      if (textFr.classList.contains("text-active")) {
        textFr.classList.remove("text-active");
        textFr.classList.add("text-hidden");
      } else {
        textFr.classList.remove("text-hidden");
        textFr.classList.add("text-active");
      }
    });
  
    // Basculer la visibilité des textes en anglais
    textsEn.forEach((textEn) => {
      if (textEn.classList.contains("text-active")) {
        textEn.classList.remove("text-active");
        textEn.classList.add("text-hidden");
      } else {
        textEn.classList.remove("text-hidden");
        textEn.classList.add("text-active");
      }
    });
  
    // Basculer la classe du bouton de traduction
    translationButton.classList.toggle("text-fr-active");
}

// Ajout d'écouteurs d'événements pour la barre de navigation et le curseur personnalisé
window.addEventListener("load", function () {
// Ajouter la classe "visible" à la barre de navigation
document.querySelector(".custom-top").classList.add("visible");
});

document.addEventListener("DOMContentLoaded", function () {
  const customCursor = document.getElementById("loading-cursor");

  function showCustomCursor() {
      customCursor.style.display = "block";
  }

  function hideCustomCursor() {
      customCursor.style.display = "none";

      // Supprimer les écouteurs d'événements
      document.removeEventListener("mousemove", moveCustomCursor);
      document.removeEventListener("mouseleave", hideCustomCursor);
      document.removeEventListener("mouseenter", showCustomCursor);
  }

  function moveCustomCursor(e) {
      customCursor.style.left = e.pageX + "px";
      customCursor.style.top = e.pageY + "px";
      showCustomCursor();
  }

  document.addEventListener("mousemove", moveCustomCursor);
  document.addEventListener("mouseleave", hideCustomCursor);
  document.addEventListener("mouseenter", showCustomCursor);
});

    
const coutureCarousel = document.querySelector(".couture-carousel");
const coutureSection = document.getElementById("couture");

if (coutureCarousel) {
  const coutureImages = coutureCarousel.querySelectorAll("img");
  const waitForImages = () =>
    new Promise((resolve) => {
      if (!coutureImages.length) {
        resolve();
        return;
      }
      let loaded = 0;
      const handleLoad = () => {
        loaded += 1;
        if (loaded === coutureImages.length) {
          resolve();
        }
      };
      coutureImages.forEach((image) => {
        if (image.complete) {
          handleLoad();
        } else {
          image.addEventListener("load", handleLoad, { once: true });
          image.addEventListener("error", handleLoad, { once: true });
        }
      });
    });

  waitForImages();
}

if (coutureCarousel && coutureSection) {
  let scrollLocked = false;
  const rootElement = document.documentElement;
  const bodyElement = document.body;
  const canScrollCarousel = (deltaY) => {
    const maxScrollLeft =
      coutureCarousel.scrollWidth - coutureCarousel.clientWidth;
    if (maxScrollLeft <= 0) {
      return false;
    }
    if (deltaY > 0) {
      return coutureCarousel.scrollLeft < maxScrollLeft;
    }
    return coutureCarousel.scrollLeft > 0;
  };

  const isSectionInView = () => {
    const rect = coutureSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    return rect.top < viewportHeight * 0.6 && rect.bottom > viewportHeight * 0.4;
  };

  const setScrollLock = (locked) => {
    if (locked === scrollLocked) {
      return;
    }
    scrollLocked = locked;
    if (locked) {
      rootElement.style.overflow = "hidden";
      bodyElement.style.overflow = "hidden";
    } else {
      rootElement.style.overflow = "";
      bodyElement.style.overflow = "";
    }
  };

  window.addEventListener(
    "wheel",
    (event) => {
      if (!isSectionInView()) {
        setScrollLock(false);
        return;
      }
      if (canScrollCarousel(event.deltaY)) {
        event.preventDefault();
        setScrollLock(true);
        coutureCarousel.scrollBy({
          left: event.deltaY,
          behavior: "smooth",
        });
      } else {
        setScrollLock(false);
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (!isSectionInView()) {
        setScrollLock(false);
        return;
      }
      if (canScrollCarousel(1)) {
        event.preventDefault();
        setScrollLock(true);
      } else {
        setScrollLock(false);
      }
    },
    { passive: false }
  );

  window.addEventListener("scroll", () => {
    if (!isSectionInView()) {
      setScrollLock(false);
      return;
    }
    if (canScrollCarousel(1) || canScrollCarousel(-1)) {
      setScrollLock(true);
    } else {
      setScrollLock(false);
    }
  });
}

// Gestion du défilement vers les sections lors du clic sur les liens de navigation
const links = document.querySelectorAll(".nav-lien");
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }
  });
});

// Gestion du preloader
const loader = document.querySelector(".loader");
window.addEventListener("load", vanish);

function vanish() {
  loader.classList.add("disappear");
}

// Sélection des éléments de la barre de navigation et du titre
const navs = document.querySelectorAll('nav');
const herot = document.querySelector(".hero-title-container");

// Ajout des classes "appear" et "titleappear" après la fin de l'animation du preloader
loader.addEventListener('animationend', () => {
  // Parcourir chaque élément <nav> et ajouter la classe 'appear'
  navs.forEach(nav => {
    nav.classList.add('appear');
  });

  herot.classList.add('titleappear');
});




// Gestion de l'ajout et de la suppression de la classe 'pointer-enabled' en fonction de la visibilité de l'élément
const sectionImgd = document.querySelector('.section-imgd');
if (sectionImgd) {
  let pointerEnabled = false;
  const pointerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!sectionImgd.classList.contains('pointer-enabled') && !pointerEnabled) {
          setTimeout(() => {
            sectionImgd.classList.add('pointer-enabled');
          }, 1000);
          pointerEnabled = true;
        }
      } else {
        if (sectionImgd.classList.contains('pointer-enabled')) {
          sectionImgd.classList.remove('pointer-enabled');
          pointerEnabled = false;
        }
      }
    });
  }, { threshold: 0.3 });

  pointerObserver.observe(sectionImgd);
}
  
document.getElementById('show-contact-form').addEventListener('click', function(event) {
  event.preventDefault();
  var contactForm = document.getElementById('contact-form');
  contactForm.style.display = 'block';
});

function triggerWindowResize() {
  const resizeEvent = new Event("resize");
  window.dispatchEvent(resizeEvent);
}

window.addEventListener("load", () => {
  setTimeout(triggerWindowResize, 100);
});

// Obtenez l'élément sur lequel vous souhaitez déclencher l'action
const contactLink = document.getElementById('show-contact-form');

// Ajoutez un écouteur d'événements pour capturer le clic
contactLink.addEventListener('click', e => {
  e.preventDefault();
  
  // Attendez 500 millisecondes avant de faire défiler la page
  setTimeout(() => {
    // Faites défiler le viewport jusqu'à la fin de la page
    window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" });
  }, 50);
});
