// SCRIPT.JS

// 1. MENU BURGER (mobile)
const burger = document.querySelector('.burger');
const navUl = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navUl.classList.toggle('show');
  burger.classList.toggle('active');
});

// 2. SCROLL ACTIF POUR LES LIENS DU MENU
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// 3. ANIMATION DES BARRES DE COMPÉTENCES AU SCROLL
const skillBars = document.querySelectorAll('.bar span');

function animateSkills() {
  const triggerBottom = window.innerHeight * 0.8;

  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;

    if (barTop < triggerBottom) {
      bar.style.width = bar.getAttribute('data-progress');
    } else {
      bar.style.width = '0';
    }
  });
}

window.addEventListener('scroll', animateSkills);

// 4. VALIDATION ET ENVOI DU FORMULAIRE
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Récupérer valeurs
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Simple validation
  if (name === '' || email === '' || message === '') {
    showMessage('Veuillez remplir tous les champs.', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showMessage('Veuillez entrer une adresse email valide.', 'error');
    return;
  }

  // Simulation envoi (tu peux remplacer par fetch ajax)
  showMessage('Envoi en cours...', 'info');

  setTimeout(() => {
    showMessage('Merci pour votre message, je vous recontacte vite !', 'success');
    form.reset();
  }, 2000);
});

function showMessage(msg, type) {
  formMessage.textContent = msg;
  formMessage.style.color = type === 'error' ? '#e63946' : (type === 'success' ? '#2a9d8f' : '#555');
}

// Fonction simple pour valider un email
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(email.toLowerCase());
}

// 5. EFFET DE DÉFILEMENT POUR LES ANIMATIONS DIVERS (facultatif)
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
