// ===================================
// NAVIGATION MOBILE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation du burger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu lors du clic sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// FORMULAIRE DE CONTACT
// ===================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Désactiver le bouton submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        
        try {
            // Si vous utilisez Formspree ou un service similaire
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Succès
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
                contactForm.reset();
            } else {
                // Erreur
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Une erreur est survenue. Veuillez réessayer ou m\'envoyer un email directement.';
            }
        } catch (error) {
            // Erreur réseau
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.';
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            // Masquer le message après 5 secondes
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
    
    // Alternative simple si pas de service de formulaire backend
    // Remplacer le bloc try-catch ci-dessus par ceci :
    /*
    // Créer le lien mailto
    const name = formData.get('name');
    const email = formData.get('email');
    const organization = formData.get('organization');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    const mailtoLink = `mailto:camille@medjigbodo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Nom: ${name}\nOrganisation: ${organization}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    formStatus.className = 'form-status success';
    formStatus.textContent = 'Votre client email va s\'ouvrir. Vous pouvez également m\'écrire directement à camille@medjigbodo.com';
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    */
}

// ===================================
// SCROLL REVEAL ANIMATION (optionnel)
// ===================================

// Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux éléments
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.expertise-block, .project-card, .pillar');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// NAVIGATION ACTIVE STATE
// ===================================

// Mettre en évidence le lien de navigation actif
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// ===================================
// LAZY LOADING IMAGES (si nécessaire)
// ===================================

if ('loading' in HTMLImageElement.prototype) {
    // Le navigateur supporte le lazy loading natif
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour les navigateurs plus anciens
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}
