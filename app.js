// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 250, 229, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 2px 20px rgba(30, 44, 76, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 250, 229, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .value-card, .info-card, .testimonial-card, .plan-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Download button interactions - Fixed timing issue
function initDownloadButtons() {
  const downloadButtons = document.querySelectorAll('.btn-download');

  downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Se o botão NÃO tiver href (ou seja, for <button>), bloqueia e executa animação
      if (!this.href) {
        e.preventDefault();

        // Add loading state
        const originalText = this.textContent;
        this.textContent = 'Preparando...';
        this.disabled = true;
        this.style.opacity = '0.7';

        setTimeout(() => {
          this.textContent = 'Enviando!';
          this.style.background = '#9bb1c1';
          this.style.opacity = '1';

          setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
            this.style.background = '';
            this.style.opacity = '1';
          }, 2000);
        }, 1000);

        // Mensagem de sucesso para downloads simulados
        showNotification('Material será enviado por email.', 'success');
      } else {
        // Para links com href (como WhatsApp), mostra notificação mas deixa seguir normalmente
        showNotification('Continue a solicitação enviando a mensagem pelo WhatsApp.', 'success');
        // Não impede o clique, não mexe no texto
      }
    });
  });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#9bb1c1' : '#e9ce8a'};
        color: #1e2c4c;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(30, 44, 76, 0.2);
        z-index: 1001;
        font-family: 'Cormorant Garamond', serif;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Contact form simulation
function initContactInteractions() {
    const contactButtons = document.querySelectorAll('.contact-cta .btn-primary, .contact-cta .btn-secondary');

    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.includes('Planos') ? 'planos' : 'contato';
            showNotification(`Redirecionando para ${action}...`, 'info');
        });
    });
}

// Values cards stagger animation
function initValuesAnimation() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    const valuesSection = document.getElementById('valores');
    const valuesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                valueCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
                
                valuesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    valuesObserver.observe(valuesSection);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initSmoothScrolling();
    initScrollAnimations();
    initDownloadButtons();
    initContactInteractions();
    
    // Animations
    initValuesAnimation();
    
    // Add scroll event listeners with debouncing
    const debouncedScrollHandler = debounce(() => {
        updateActiveNavLink();
        updateNavbarBackground();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Add loading animation for the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Global functions that can be called from HTML
window.scrollToSection = scrollToSection;

// Handle browser back/forward navigation
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.section) {
        scrollToSection(e.state.section);
    }
});

// Add state to history when navigating
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const sectionId = this.getAttribute('href').substring(1);
        history.pushState({ section: sectionId }, '', `#${sectionId}`);
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
