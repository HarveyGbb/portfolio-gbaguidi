/* Ceci est un commentaire JS */
// console.log('toto');

// String
let myVar = "ma variable";
myVar = "variable changée";

const myVar2 = "ma variable 2";

// console.log(myVar);

// Boolean
let isTrue = true;
let isFalse = false;

// console.log(isFalse);

// Chiffres et opérateurs
let chiffre1 = 4;
let chiffre2 = 3;

// console.log(typeof chiffre1, typeof chiffre2);

// Template string, littéraux de gabarits et concaténation
let test = 'test ' + myVar + ' value';
let test2 = `test ${myVar} dzqdqzd`;

// console.log(test2);

/*
if (chiffre1 <= 3) {
  console.log('condition est valide');
} else if (chiffre1 <= 4) {
  console.log('je passe la');
} else {
  console.log('condition pas valide')
}
*/

// Tableaux
let array = ['item 1', 'item 2', 'item 3', 'item 4'];
// console.log(array[3]);

// Objets
let obj = {
  title: 'Mon titre',
  description: 'Ma description'
}

// console.log(obj.title, obj.description);

// Les boucles : while, for, forEach
/*
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

array.forEach(item => {
  console.log(item);
})
*/

// Fonctions
/*function myFunction(item, item2) {
  console.log(item, item2);
}*/

const myFunction = (item, item2) => {
  // console.log(item, item2);
}

myFunction('toto', 5);
myFunction('tata', 6);

const calcul = (nb1, nb2) => {
  return nb1 + nb2; // Corrigé : était nb1 + nb1
}

let result = calcul(4, 5);
// console.log(result);

// Interagir avec le DOM : méthodes, propriétés, événements

// Sélecteurs
// let header = document.querySelector('.header');
// console.log(header);

// let grids = document.querySelectorAll('.grid');
/*
grids.forEach(grid => {
  grid.classList.add('titi');
  console.log(grid)
});
*/

// Événements les plus courants
/*
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM entièrement chargé et analysé");
});

header.addEventListener('click', (e) => {
  console.log(e);
});

header.addEventListener('mouseenter', (e) => {
  console.log('souris entre');
});
*/

// Insertion DOM et navigation dans le DOM
let div = document.createElement('div');
div.classList.add('top');
div.innerHTML = `<span>Top zone</span>`;
// console.log(header.nextElementSibling);

// Fin de la théorie 

/* Menu mobile */
function menuMobile() {
  const btn = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.navbar a');

  btn.addEventListener('click', () => {
    header.classList.toggle('show-nav');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
    });
  });
}

menuMobile();

/* Portfolio */
function tabsFilters() {
  const tabs = document.querySelectorAll('.portfolio-filters a');
  const projets = document.querySelectorAll('.portfolio .card');

  const resetActiveLinks = () => {
    tabs.forEach(elem => {
      elem.classList.remove('active');
    });
  };

  const showProjets = (elem) => {
    console.log(elem);
    projets.forEach(projet => {
      let filter = projet.getAttribute('data-category');

      if (elem === 'all') {
        projet.parentNode.classList.remove('hide');
        return;
      }

      console.log('tutu');
      
      // Opérateur ternaire pour afficher/masquer les projets
      filter !== elem ? projet.parentNode.classList.add('hide') : projet.parentNode.classList.remove('hide');
    });
  };

  tabs.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let filter = elem.getAttribute('data-filter');
      showProjets(filter);
      resetActiveLinks();
      elem.classList.add('active');
    });
  });
}

tabsFilters();

function showProjectDetails() {
  const links = document.querySelectorAll('.card__link');
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.modal__close');

  const hideModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('show');
    });
  };

  links.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector(`[id=${elem.dataset.id}]`).classList.add('show');
    });
  });

  btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      hideModals();
    });
  });
}

showProjectDetails();

// Effets
const observerIntersectionAnimation = () => {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');

  sections.forEach((section, index) => {
    if (index === 0) return;
    section.style.opacity = "0";
    section.style.transition = "all 1.6s";
  });

  skills.forEach((elem, index) => {
    elem.style.width = "0";
    elem.style.transition = "all 1.6s";
  });

  let sectionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.opacity = 1;
      }
    });
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  let skillsObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        animateProgressBar(elem, elem.dataset.width);
      }
    });
  });

  skills.forEach(skill => {
    skillsObserver.observe(skill);
  });
};

// Animation fluide de la barre de progression
function animateProgressBar(bar, targetWidth) {
  let currentWidth = 0;
  const duration = 1500; // 1.5 secondes
  const increment = targetWidth / (duration / 16); // 60fps
  
  function step() {
    currentWidth += increment;
    if (currentWidth < targetWidth) {
      bar.style.width = currentWidth + '%';
      requestAnimationFrame(step);
    } else {
      bar.style.width = targetWidth + '%';
    }
  }
  
  requestAnimationFrame(step);
}

// Filtrage des projets
document.addEventListener('DOMContentLoaded', function() {
  const filterLinks = document.querySelectorAll('.portfolio-filters a');
  const projectCards = document.querySelectorAll('.card');
  
  // Fonction de filtrage
  function filterProjects(category) {
    projectCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Gestion des clics sur les filtres
  filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Retirer la classe active de tous les liens
      filterLinks.forEach(l => l.classList.remove('active'));
      
      // Ajouter la classe active au lien cliqué
      this.classList.add('active');
      
      // Filtrer les projets
      const filterValue = this.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });
});

// Animation des barres de progression INTERACTIVES
document.addEventListener('DOMContentLoaded', function() {
  const bars = document.querySelectorAll('.bar');
  
  bars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    
    // Rendre la barre interactive
    makeProgressBarInteractive(bar, width);
  });
});

// Fonction pour rendre les barres de progression interactives
function makeProgressBarInteractive(bar, originalWidth) {
  
  // Effet au survol - faire bouger la jauge
  bar.addEventListener('mouseenter', function() {
    this.style.transform = 'scaleY(1.2)';
    this.style.transition = 'all 0.3s ease';
    this.style.boxShadow = '0 0 15px rgba(91, 108, 120, 0.6)';
    
    // Animation de vibration légère
    let vibrationCount = 0;
    const vibrate = () => {
      if (vibrationCount < 6) {
        const shake = vibrationCount % 2 === 0 ? 2 : -2;
        this.style.transform = `scaleY(1.2) translateX(${shake}px)`;
        vibrationCount++;
        setTimeout(vibrate, 50);
      } else {
        this.style.transform = 'scaleY(1.2) translateX(0)';
      }
    };
    vibrate();
  });
  
  bar.addEventListener('mouseleave', function() {
    this.style.transform = 'scaleY(1) translateX(0)';
    this.style.boxShadow = 'none';
  });
  
  // Clic pour faire osciller la jauge
  bar.addEventListener('click', function() {
    // Animation de rebond
    this.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Réduire puis augmenter la largeur
    const currentWidth = parseFloat(this.style.width);
    this.style.width = (currentWidth * 0.7) + '%';
    
    setTimeout(() => {
      this.style.width = originalWidth + '%';
    }, 200);
    
    setTimeout(() => {
      this.style.transition = 'all 0.3s ease';
    }, 500);
    
    // Créer un tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = `${originalWidth}%`;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--color-primary);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 1.2rem;
      font-weight: bold;
      z-index: 100;
      transform: translateY(-100%);
      margin-top: -10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      animation: bounceIn 0.5s ease;
    `;
    
    // Positionner le tooltip
    const barRect = this.getBoundingClientRect();
    tooltip.style.left = (barRect.width / 2 - 20) + 'px';
    
    this.parentNode.style.position = 'relative';
    this.parentNode.appendChild(tooltip);
    
    // Supprimer le tooltip après 2 secondes
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.style.animation = 'bounceOut 0.3s ease';
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 300);
      }
    }, 2000);
  });
  
  // Double-clic pour animation spéciale
  bar.addEventListener('dblclick', function() {
    // Animation de remplissage rapide
    this.style.transition = 'width 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    this.style.width = '0%';
    
    setTimeout(() => {
      this.style.width = originalWidth + '%';
    }, 100);
    
    // Effet de vague
    const wave = document.createElement('div');
    wave.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: waveEffect 0.8s ease-out;
      border-radius: inherit;
    `;
    
    this.appendChild(wave);
    
    setTimeout(() => {
      if (wave.parentNode) {
        wave.parentNode.removeChild(wave);
      }
    }, 800);
  });
  
  // Animation de pulsation périodique
  let pulseInterval = setInterval(() => {
    if (!bar.matches(':hover')) {
      bar.style.boxShadow = '0 0 0 4px rgba(91, 108, 120, 0.4)';
      bar.style.transform = 'scaleY(1.1)';
      
      setTimeout(() => {
        bar.style.boxShadow = 'none';
        bar.style.transform = 'scaleY(1)';
      }, 400);
    }
  }, 6000);
  
  // Nettoyer l'intervalle si l'élément est supprimé
  bar.dataset.pulseInterval = pulseInterval;
}

// CSS animations pour les tooltips
const style = document.createElement('style');
style.textContent = `
  @keyframes bounceIn {
    0% { transform: translateY(-100%) scale(0.3); opacity: 0; }
    50% { transform: translateY(-100%) scale(1.05); }
    100% { transform: translateY(-100%) scale(1); opacity: 1; }
  }
  
  @keyframes bounceOut {
    0% { transform: translateY(-100%) scale(1); opacity: 1; }
    100% { transform: translateY(-100%) scale(0.3); opacity: 0; }
  }
  
  @keyframes waveEffect {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .bar {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Démarrer toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Application initialisée');
  
  // Vos fonctions existantes
  menuMobile();
  tabsFilters();
  showProjectDetails();
  observerIntersectionAnimation();
  
  // Initialiser les barres de progression interactives
  initInteractiveProgressBars();
});

// Fonction d'initialisation des barres interactives
function initInteractiveProgressBars() {
  const bars = document.querySelectorAll('.skills .bar');
  
  bars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    makeProgressBarInteractive(bar, width);
  });
}// Menu mobile
const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');
const menuLinks = document.querySelectorAll('.menu a');

// Ouvre/ferme le menu mobile
burger.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Ferme le menu après clic sur un lien
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
  });
});