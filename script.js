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

// Gallery images data - each item now has multiple images
const galleryImages = [
    // Birthday Cakes
    {
        src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop",
        title: "Gâteau d'Anniversaire",
        description: "Trois étages, décoration florale élégante",
        category: "cakes",
        itemId: "birthday-cakes"
    },
    {
        src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop",
        title: "Gâteau d'Anniversaire",
        description: "Design coloré avec bougies festives",
        category: "cakes",
        itemId: "birthday-cakes"
    },
    {
        src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop",
        title: "Gâteau d'Anniversaire",
        description: "Style moderne avec décoration en fondant",
        category: "cakes",
        itemId: "birthday-cakes"
    },
    
    // Wedding Cakes
    {
        src: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&h=800&fit=crop",
        title: "Gâteau de Mariage",
        description: "Design romantique, roses en sucre délicates",
        category: "cakes",
        itemId: "wedding-cakes"
    },
    {
        src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=800&fit=crop",
        title: "Gâteau de Mariage",
        description: "Élégance classique à plusieurs étages",
        category: "cakes",
        itemId: "wedding-cakes"
    },
    {
        src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=800&fit=crop",
        title: "Gâteau de Mariage",
        description: "Design minimaliste et raffiné",
        category: "cakes",
        itemId: "wedding-cakes"
    },

    // Cupcakes Assorted
    {
        src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=800&fit=crop",
        title: "Cupcakes Assortis",
        description: "Différentes saveurs et décorations colorées",
        category: "cupcakes",
        itemId: "cupcakes-assorted"
    },
    {
        src: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&h=800&fit=crop",
        title: "Cupcakes Assortis",
        description: "Collection gourmande aux multiples parfums",
        category: "cupcakes",
        itemId: "cupcakes-assorted"
    },
    {
        src: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=800&h=800&fit=crop",
        title: "Cupcakes Assortis",
        description: "Présentation élégante sur plateau",
        category: "cupcakes",
        itemId: "cupcakes-assorted"
    },

    // Event Buffets
    {
        src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&h=800&fit=crop",
        title: "Buffet Événement",
        description: "Assortiment complet pour 50 personnes",
        category: "events",
        itemId: "event-buffets"
    },
    {
        src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=800&fit=crop",
        title: "Buffet Événement",
        description: "Table sucrée pour grandes occasions",
        category: "events",
        itemId: "event-buffets"
    },
    {
        src: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=800&fit=crop",
        title: "Buffet Événement",
        description: "Desserts variés pour célébrations",
        category: "events",
        itemId: "event-buffets"
    },

    // Chocolate Cakes
    {
        src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=800&fit=crop",
        title: "Gâteau Chocolat",
        description: "Ganache riche et fruits rouges frais",
        category: "cakes",
        itemId: "chocolate-cakes"
    },
    {
        src: "https://images.unsplash.com/photo-1571197119282-5bfa64632de8?w=800&h=800&fit=crop",
        title: "Gâteau Chocolat",
        description: "Mousse au chocolat et décoration artistique",
        category: "cakes",
        itemId: "chocolate-cakes"
    },
    {
        src: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=800&fit=crop",
        title: "Gâteau Chocolat",
        description: "Fondant au chocolat avec garniture",
        category: "cakes",
        itemId: "chocolate-cakes"
    },

    // Kids Cupcakes
    {
        src: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&h=800&fit=crop",
        title: "Cupcakes Enfants",
        description: "Thème licorne et arc-en-ciel magique",
        category: "cupcakes",
        itemId: "kids-cupcakes"
    },
    {
        src: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&h=800&fit=crop",
        title: "Cupcakes Enfants",
        description: "Décorations amusantes et colorées",
        category: "cupcakes",
        itemId: "kids-cupcakes"
    },
    {
        src: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&h=800&fit=crop",
        title: "Cupcakes Enfants",
        description: "Personnages et thèmes de dessins animés",
        category: "cupcakes",
        itemId: "kids-cupcakes"
    }
];

let currentImageIndex = 0;
let currentFilter = 'all';
let filteredImages = [...galleryImages];
let currentItemImages = []; // Images for the current gallery item

// Update total images count
function updateImageCounter() {
    totalImagesSpan.textContent = currentItemImages.length;
    currentImageSpan.textContent = currentImageIndex + 1;
}

// Display image in modal
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

// Navigate carousel
function navigateCarousel(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentItemImages.length;
        displayModalImage(currentImageIndex, 'next');
    } else {
        currentImageIndex = (currentImageIndex - 1 + currentItemImages.length) % currentItemImages.length;
        displayModalImage(currentImageIndex, 'prev');
    }
}

// Filter images based on current filter
function updateFilteredImages() {
    if (currentFilter === 'all') {
        filteredImages = [...galleryImages];
    } else {
        filteredImages = galleryImages.filter(img => img.category === currentFilter);
    }
}

// Get all images for a specific item
function getImagesForItem(itemId) {
    return galleryImages.filter(img => img.itemId === itemId);
}

// Open modal when view button is clicked
document.querySelectorAll('.view-btn').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Get the clicked gallery item
        const card = btn.closest('.gallery-card');
        const img = card.querySelector('img');
        const imgSrc = img.src;
        
        // Find the clicked image in galleryImages array
        const clickedImage = galleryImages.find(image => 
            imgSrc.includes(image.src.split('?')[0].split('/').pop())
        );
        
        if (clickedImage) {
            // Get all images for this item
            currentItemImages = getImagesForItem(clickedImage.itemId);
            
            // Find the index of the clicked image within this item's images
            currentImageIndex = currentItemImages.findIndex(img => img.src === clickedImage.src);
            if (currentImageIndex === -1) currentImageIndex = 0;
            
            modal.style.display = 'block';
            displayModalImage(currentImageIndex);
            document.body.style.overflow = 'hidden';
        }
    });
});

// Carousel navigation
carouselNext.addEventListener('click', () => navigateCarousel('next'));
carouselPrev.addEventListener('click', () => navigateCarousel('prev'));

// Keyboard navigation
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

// Close modal
const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

modalClose.addEventListener('click', closeModal);

// Close modal when clicking backdrop
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});

// Update filter tracking
const originalFilterBtns = document.querySelectorAll('.filter-btn');
originalFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.getAttribute('data-filter');
        updateFilteredImages();
    });
});

// Parallax effect for hero section
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

// Scroll animations for service cards
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

// WhatsApp button pulse effect
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    setInterval(() => {
        whatsappBtn.classList.add('pulse-effect');
        setTimeout(() => {
            whatsappBtn.classList.remove('pulse-effect');
        }, 1000);
    }, 5000);
}

// Form submission (if you add a contact form later)
function handleFormSubmission(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Create WhatsApp message
        const message = `Nouvelle demande de contact:
Nom: ${data.name}
Email: ${data.email}
Message: ${data.message}`;
        
        const whatsappUrl = `https://wa.me/21612345678?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Lazy loading for images
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

// Add smooth reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

// Add reveal class to elements that should animate
document.querySelectorAll('.section-title, .section-subtitle, .gallery-item, .contact-method').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

.pulse-effect {
    animation: buttonPulse 1s ease-in-out;
}

@keyframes buttonPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.nav-menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    padding: 20px;
    box-shadow: 0 5px 20px rgba(255, 154, 162, 0.1);
    border-radius: 0 0 20px 20px;
    animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 20px;
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
}

.img.loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
}
`;

document.head.appendChild(style);

// Enhanced scroll indicator
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading states for dynamic content
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        this.alt = 'Image non disponible';
    });
});

console.log('🎂 Cute Cake - Site initialisé avec succès!');
