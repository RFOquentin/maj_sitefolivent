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

// Ajout d'écouteurs d'événements pour les transitions et les interactions avec l'élément ayant l'ID "title"
document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("title");

  // Fonction pour gérer la fin de la transition d'opacité pour l'élément 'title'
  function handleTransitionEnd(event) {
    if (event.propertyName === "opacity") {
      title.classList.add("animation-finished");

      title.addEventListener("mouseover", function () {
        title.classList.add("hovered");
      });

      title.addEventListener("mouseout", function () {
        title.classList.remove("hovered");
      });
    }
  }
});


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

    
// Initialisation de Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smoothMobile: false,
  lerp: 0.03,
});

    
/*/ Initialisation de Locomotive Scroll
const scroll = new LocomotiveScroll({
el: document.querySelector("[data-scroll-container]"),
smooth: true,
smoothMobile: true,
multiplier: 1.4, // Effect Multiplier
touchMultiplier: 2.22,
//lerp: .03, // Linear Interpolation, 0 > 1 // Try 0.01
smartphone: {
  smooth: true,
  breakpoint: 767
},
tablet: {
  smooth: true,
  breakpoint: 1024
},


});


/*const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  lerp: 0.03, // Linear Interpolation, 0 > 1 // Try 0.01
  multiplier: 1.4, // Effect Multiplier
  reloadOnContextChange: true,
  touchMultiplier: 2,
  smoothMobile: 0,
  smartphone: {
      smooth: !0,
      breakpoint: 767
  },
  tablet: {
      smooth: !1,
      breakpoint: 1024
  },
});*/



// Mise à jour de Locomotive Scroll lors du redimensionnement de la fenêtre
new ResizeObserver(() => scroll.update()).observe(
document.querySelector("[data-scroll-container]")
);

// Gestion du défilement vers les sections lors du clic sur les liens de navigation
const links = document.querySelectorAll(".nav-lien");
links.forEach(link => {
link.addEventListener("click", e => {
    e.preventDefault();
    scroll.scrollTo(link.getAttribute("href"));
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
let pointerEnabled = false;
scroll.on('scroll', () => {
const sectionImgd = document.querySelector('.section-imgd');

if (sectionImgd.classList.contains('is-inview')) {
    if (!sectionImgd.classList.contains('pointer-enabled') && !pointerEnabled) {
    setTimeout(() => {
        sectionImgd.classList.add('pointer-enabled');
        console.log('Classe pointer-enabled ajoutée !');
    }, 1000);
    pointerEnabled = true;
    }
} else {
    if (sectionImgd.classList.contains('pointer-enabled')) {
    sectionImgd.classList.remove('pointer-enabled');
    console.log('Classe pointer-enabled retirée !');
    pointerEnabled = false;
    }
}

});
  
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
    // Faites défiler le viewport jusqu'à la fin de la page en utilisant Locomotive Scroll
    scroll.scrollTo(document.body.scrollHeight);
  }, 50);
});
