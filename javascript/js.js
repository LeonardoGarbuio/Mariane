// ===== CONFIGURAÇÕES GERAIS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeTestimonials();
});

// ===== NAVEGAÇÃO MOBILE =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Dropdown menu
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===== ANIMAÇÕES DE ENTRADA =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-image, .about-card, .course-card, .testimonial-card, .section-header'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// ===== EFEITOS DE SCROLL =====
function initializeScrollEffects() {
    // Parallax suave para hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Contador animado para estatísticas
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// ===== ANIMAÇÃO DE CONTADOR =====
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// ===== TESTIMONIALS SLIDER =====
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (testimonials.length > 1) {
        // Auto-rotate testimonials
        setInterval(() => {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.opacity = index === currentIndex ? '1' : '0.5';
                testimonial.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.95)';
            });
            
            currentIndex = (currentIndex + 1) % testimonials.length;
        }, 5000);
    }
}

// ===== FUNÇÕES UTILITÁRIAS =====

// Smooth scroll para links internos
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Formatação de números
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Debounce function
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

// ===== EVENT LISTENERS ADICIONAIS =====

// Smooth scroll para links com hash
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

// Lazy loading para imagens
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== ANIMAÇÕES CSS ADICIONAIS =====
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-content {
        animation-delay: 0.2s;
    }
    
    .hero-image {
        animation-delay: 0.4s;
    }
    
    .about-card:nth-child(1) { animation-delay: 0.1s; }
    .about-card:nth-child(2) { animation-delay: 0.2s; }
    .about-card:nth-child(3) { animation-delay: 0.3s; }
    
    .course-card:nth-child(1) { animation-delay: 0.1s; }
    .course-card:nth-child(2) { animation-delay: 0.2s; }
    .course-card:nth-child(3) { animation-delay: 0.3s; }
    
    .testimonial-card {
        transition: all 0.3s ease;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .btn:hover {
        animation: pulse 0.3s ease;
    }
`;

document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATIONS =====

// Throttle scroll events
const throttledScroll = debounce(() => {
    // Scroll-based animations
}, 16);

window.addEventListener('scroll', throttledScroll);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'imagem/logo.jpg',
        'imagem/home3.jpg',
        'imagem/cursoOnline.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// ===== FUNCIONALIDADES ESPECÍFICAS DA PÁGINA DE LOCALIZAÇÃO =====

// Map markers interaction
function initializeLocationPage() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const city = this.dataset.city;
            showCityInfo(city);
        });
        
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function showCityInfo(city) {
    // Criar tooltip ou modal com informações da cidade
    const tooltip = document.createElement('div');
    tooltip.className = 'city-tooltip';
    tooltip.innerHTML = `
        <h3>${city}</h3>
        <p>${city === 'Curitiba' ? 'Capital do Paraná - Centro de referência em saúde' : 'Região dos Campos Gerais - Polo educacional e médico'}</p>
    `;
    
    document.body.appendChild(tooltip);
    
    // Remover tooltip após 3 segundos
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// Animate location stats on scroll
function animateLocationStats() {
    const locationStats = document.querySelectorAll('.location-stats .stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                const suffix = stat.textContent.replace(/\d/g, '');
                
                animateCounter(stat, target, suffix);
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    locationStats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize location page features if on location page
if (window.location.pathname.includes('index2.html') || document.querySelector('.location-hero')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeLocationPage();
        animateLocationStats();
    });
}

// ===== FUNCIONALIDADES ESPECÍFICAS DA PÁGINA DE PRODUTOS =====

// Product cards interaction
function initializeProductsPage() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                const overlay = this.querySelector('.product-overlay');
                overlay.style.opacity = '1';
                setTimeout(() => {
                    overlay.style.opacity = '0';
                }, 300);
            }
        });
    });
    
    // Animate product badges
    const badges = document.querySelectorAll('.product-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Animate benefits cards on scroll
function animateBenefitsCards() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        benefitsObserver.observe(card);
    });
}

// Initialize products page features if on products page
if (window.location.pathname.includes('index1.html') || document.querySelector('.products-hero')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeProductsPage();
        animateBenefitsCards();
    });
}