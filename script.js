/* ========================================
   CUTE CAKE - MAIN JAVASCRIPT FILE
   ======================================== */

/* ========================================
   1. LOADING ANIMATION
   ======================================== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2000);
});

/* ========================================
   2. NAVIGATION SYSTEM
   ======================================== */

// Navigation Elements
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Enhanced scroll effect on navigation
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    
    // Show/hide navigation based on scroll position
    if (currentScrollY <= 50) {
        // At the very top - hide nav
        header.classList.remove('visible');
        header.classList.remove('scrolled');
    } else if (currentScrollY > 50) {
        // Scrolled down - show nav
        header.classList.add('visible');
        
        // Add scrolled styling
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    lastScrollY = currentScrollY;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
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
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

/* ========================================
   3. GALLERY SYSTEM
   ======================================== */

// Gallery Filter Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Gallery Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

/* ========================================
   4. MODAL CAROUSEL SYSTEM
   ======================================== */

// Modal Elements
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const currentImageSpan = document.getElementById('currentImage');
const totalImagesSpan = document.getElementById('totalImages');
const modalImageContainer = document.querySelector('.modal-image-container');

// Gallery Images Database - Product-specific collections
const galleryImages = {
    'fraise-vanille': [
        {
            src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop",
            title: "🍓 Fraise Vanille",
            description: "Gâteau moelleux à la crème chantilly maison avec fraises fraîches"
        },
        {
            src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop",
            title: "🍓 Fraise Vanille",
            description: "Vue détaillée de la décoration délicate aux fraises"
        },
        {
            src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop",
            title: "🍓 Fraise Vanille",
            description: "Présentation élégante avec garniture de fraises et crème"
        }
    ],
    
    'chocodream': [
        {
            src: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&h=800&fit=crop",
            title: "🍫 ChocoDream",
            description: "Gâteau chocolat noir premium avec noisettes grillées"
        },
        {
            src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=800&fit=crop",
            title: "🍫 ChocoDream",
            description: "Texture riche et onctueuse du chocolat noir artisanal"
        },
        {
            src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=800&fit=crop",
            title: "🍫 ChocoDream",
            description: "Finition parfaite avec ganache chocolat et éclats de noisettes"
        }
    ],

    'cupcakes-rainbow': [
        {
            src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=800&fit=crop",
            title: "🌈 Cupcakes Rainbow",
            description: "Collection colorée de 6 cupcakes assortis aux saveurs variées"
        },
        {
            src: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&h=800&fit=crop",
            title: "🌈 Cupcakes Rainbow",
            description: "Détail des décorations colorées et créatives"
        },
        {
            src: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=800&h=800&fit=crop",
            title: "🌈 Cupcakes Rainbow",
            description: "Présentation festive sur plateau élégant"
        }
    ],

    'buffet-mariage': [
        {
            src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&h=800&fit=crop",
            title: "💍 Buffet Mariage",
            description: "Assortiment complet pour 50 personnes - gâteaux et mignardises"
        },
        {
            src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=800&fit=crop",
            title: "💍 Buffet Mariage",
            description: "Table de desserts élégante avec variétés de pâtisseries"
        },
        {
            src: "https://images.unsplash.com/photo-1519640110749-d3fa033d8b8b?w=800&h=800&fit=crop",
            title: "💍 Buffet Mariage",
            description: "Présentation raffinée pour événements spéciaux"
        }
    ],

    'red-velvet': [
        {
            src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=800&fit=crop",
            title: "❤️ Red Velvet Classic",
            description: "Le fameux gâteau américain avec ganache cream cheese"
        },
        {
            src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
            title: "❤️ Red Velvet Classic",
            description: "Texture moelleuse caractéristique du Red Velvet"
        },
        {
            src: "https://images.unsplash.com/photo-1556450559-47d2e7a69f18?w=800&h=800&fit=crop",
            title: "❤️ Red Velvet Classic",
            description: "Décoration classique avec cream cheese frosting"
        }
    ],

    'cupcakes-licorne': [
        {
            src: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&h=800&fit=crop",
            title: "🦄 Cupcakes Licorne",
            description: "Pack de 12 cupcakes spécialement conçus pour les enfants"
        },
        {
            src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=800&fit=crop",
            title: "🦄 Cupcakes Licorne",
            description: "Décoration magique avec couleurs pastel et paillettes comestibles"
        },
        {
            src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=800&fit=crop",
            title: "🦄 Cupcakes Licorne",
            description: "Thème licorne adorable qui fait le bonheur des petits"
        }
    ]
};

// Modal State Variables
let currentImageIndex = 0;
let currentFilter = 'all';
let currentItemImages = [];

// Modal Helper Functions
function updateImageCounter() {
    totalImagesSpan.textContent = currentItemImages.length;
    currentImageSpan.textContent = currentImageIndex + 1;
}

function displayModalImage(index, direction = 'none') {
    const image = currentItemImages[index];
    if (!image) return;
    
    // Add slide animation
    if (direction !== 'none') {
        modalImageContainer.classList.remove('slide-left', 'slide-right');
        modalImageContainer.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
        
        setTimeout(() => {
            modalImageContainer.classList.remove('slide-left', 'slide-right');
        }, 300);
    }
    
    modalImg.src = image.src;
    modalImg.alt = image.title;
    modalTitle.textContent = image.title;
    modalDescription.textContent = image.description;
    updateImageCounter();
}

function navigateCarousel(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentItemImages.length;
        displayModalImage(currentImageIndex, 'next');
    } else {
        currentImageIndex = (currentImageIndex - 1 + currentItemImages.length) % currentItemImages.length;
        displayModalImage(currentImageIndex, 'prev');
    }
}

function updateFilteredImages() {
    // This function is no longer needed with the new structure
}

function getImagesForItem(itemId) {
    // This function is no longer needed with the new structure
    return [];
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openProductCarousel(productId) {
    if (galleryImages[productId]) {
        currentItemImages = galleryImages[productId];
        currentImageIndex = 0;
        
        modal.style.display = 'block';
        displayModalImage(currentImageIndex);
        document.body.style.overflow = 'hidden';
    }
}

// Modal Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = btn.getAttribute('data-product');
            openProductCarousel(productId);
        });
    });
});

// Carousel Navigation
carouselNext.addEventListener('click', () => navigateCarousel('next'));
carouselPrev.addEventListener('click', () => navigateCarousel('prev'));

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigateCarousel('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateCarousel('next');
                break;
            case 'Escape':
                e.preventDefault();
                closeModal();
                break;
        }
    }
});

// Modal Close Events
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});

// Update Filter Tracking
const originalFilterBtns = document.querySelectorAll('.filter-btn');
originalFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.getAttribute('data-filter');
        // Filter functionality is handled by the existing gallery filter system
    });
});

/* ========================================
   5. VISUAL EFFECTS & ANIMATIONS
   ======================================== */

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// Scroll Animations for Service Cards
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    serviceObserver.observe(card);
});

// Enhanced Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrolled > heroHeight * 0.8) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Smooth Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-title, .section-subtitle, .gallery-item, .contact-method').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

/* ========================================
   6. WHATSAPP INTEGRATION
   ======================================== */

// WhatsApp Button Pulse Effect
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    setInterval(() => {
        whatsappBtn.classList.add('pulse-effect');
        setTimeout(() => {
            whatsappBtn.classList.remove('pulse-effect');
        }, 1000);
    }, 5000);
}

// Form Submission Handler (for future contact forms)
function handleFormSubmission(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const message = `Nouvelle demande de contact:
Nom: ${data.name}
Email: ${data.email}
Message: ${data.message}`;
        
        const whatsappUrl = `https://wa.me/21612345678?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

/* ========================================
   7. PERFORMANCE OPTIMIZATIONS
   ======================================== */

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Performance Optimization: Debounce Scroll Events
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

const debouncedScrollHandler = debounce(() => {
    // Additional scroll handling if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

/* ========================================
   8. UTILITY FUNCTIONS
   ======================================== */

// Loading States for Dynamic Content
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Error Handling for Images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        this.alt = 'Image non disponible';
    });
});

/* ========================================
   9. INITIALIZATION & DEBUG
   ======================================== */

// Initialize the application
console.log('🎂 Cute Cake - Site initialisé avec succès!');

// Debug information (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('📊 Debug Info:', {
        galleryImagesCount: galleryImages.length,
        categoriesFound: [...new Set(galleryImages.map(img => img.category))],
        itemIdsFound: [...new Set(galleryImages.map(img => img.itemId))]
    });
}
