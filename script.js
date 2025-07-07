// Restaurant Website JavaScript - Navigation & Mobile Menu

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeBookingModal();
    initializeHeroSlider();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const bookTableBtns = document.querySelectorAll('.btn-book');
    
    // Add click handlers for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Add click handlers for book table buttons
    bookTableBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showBookingModal();
        });
    });
    
    // Handle dropdown menus on mobile
    const dropdownLinks = document.querySelectorAll('.mobile-nav-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const dropdown = this.nextElementSibling;
            if (dropdown && dropdown.classList.contains('mobile-dropdown')) {
                e.preventDefault();
                
                // Toggle dropdown
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    // Close all other dropdowns
                    document.querySelectorAll('.mobile-dropdown').forEach(d => {
                        d.style.display = 'none';
                    });
                    dropdown.style.display = 'block';
                }
            }
        });
    });
}

// Mobile Menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    // Open mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        openMobileMenu();
    });
    
    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close mobile menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function openMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    mobileMenuToggle.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add slide-in animation to menu items
    const menuItems = document.querySelectorAll('.mobile-nav-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function closeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    mobileMenuToggle.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Close all dropdowns
    document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements with scroll animation
    const scrollElements = document.querySelectorAll('.scroll-animation');
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Booking Modal functionality
function initializeBookingModal() {
    // Create booking modal styles if not exists
    if (!document.querySelector('#booking-modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'booking-modal-styles';
        styles.textContent = `
            .booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .booking-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .booking-modal-content {
                background: white;
                padding: 40px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .booking-modal.active .booking-modal-content {
                transform: scale(1);
            }
            
            .booking-modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 30px;
                cursor: pointer;
                color: #666;
                background: none;
                border: none;
                padding: 5px;
                line-height: 1;
            }
            
            .booking-modal-close:hover {
                color: #CB3A1A;
            }
            
            .booking-modal h2 {
                margin-bottom: 30px;
                color: #111;
                text-align: center;
                font-size: 28px;
            }
            
            .booking-form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .form-group {
                display: flex;
                flex-direction: column;
            }
            
            .form-group label {
                margin-bottom: 8px;
                font-weight: 600;
                color: #111;
                font-size: 16px;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
                font-family: 'Jost', sans-serif;
                transition: border-color 0.3s ease;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #CB3A1A;
            }
            
            .form-row {
                display: flex;
                gap: 15px;
            }
            
            .form-row .form-group {
                flex: 1;
            }
            
            .submit-booking-btn {
                background: #CB3A1A;
                color: white;
                border: none;
                padding: 15px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                text-transform: uppercase;
                transition: all 0.3s ease;
                margin-top: 10px;
            }
            
            .submit-booking-btn:hover {
                background: #a02e15;
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .booking-modal-content {
                    padding: 30px 20px;
                }
                
                .form-row {
                    flex-direction: column;
                    gap: 20px;
                }
                
                .booking-modal h2 {
                    font-size: 24px;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

function showBookingModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('booking-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'booking-modal';
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-modal-content">
                <button class="booking-modal-close" onclick="closeBookingModal()">×</button>
                <h2>Book a Table</h2>
                <form class="booking-form" onsubmit="handleBookingSubmit(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="booking-name">Full Name *</label>
                            <input type="text" id="booking-name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-email">Email *</label>
                            <input type="email" id="booking-email" name="email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="booking-phone">Phone Number *</label>
                            <input type="tel" id="booking-phone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-guests">Number of Guests *</label>
                            <select id="booking-guests" name="guests" required>
                                <option value="">Select guests</option>
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="7">7+ Guests</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="booking-date">Preferred Date *</label>
                            <input type="date" id="booking-date" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-time">Preferred Time *</label>
                            <select id="booking-time" name="time" required>
                                <option value="">Select time</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="11:30">11:30 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="12:30">12:30 PM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="13:30">1:30 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="14:30">2:30 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="17:00">5:00 PM</option>
                                <option value="17:30">5:30 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="18:30">6:30 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="19:30">7:30 PM</option>
                                <option value="20:00">8:00 PM</option>
                                <option value="20:30">8:30 PM</option>
                                <option value="21:00">9:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="booking-notes">Special Requests (Optional)</label>
                        <textarea id="booking-notes" name="notes" rows="4" placeholder="Any special requests or dietary requirements..."></textarea>
                    </div>
                    <button type="submit" class="submit-booking-btn">Book Table</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('booking-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBookingModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeBookingModal();
        }
    });
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleBookingSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const bookingData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-booking-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showBookingSuccess(bookingData);
        
        // Reset form
        event.target.reset();
        
        // Close modal
        closeBookingModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateBookingForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'guests', 'date', 'time'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field.charAt(0).toUpperCase() + field.slice(1)} field.`);
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Validate date (not in the past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date.');
        return false;
    }
    
    return true;
}

function showBookingSuccess(bookingData) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'booking-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Booking Confirmed!</h3>
            <p>Thank you, ${bookingData.name}! Your table reservation for ${bookingData.guests} guest(s) on ${bookingData.date} at ${bookingData.time} has been received.</p>
            <p>We'll send a confirmation email to ${bookingData.email} shortly.</p>
            <button onclick="closeBookingSuccess()" class="success-close-btn">Close</button>
        </div>
    `;
    
    // Add success message styles
    const styles = document.createElement('style');
    styles.textContent = `
        .booking-success {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2001;
        }
        
        .success-content {
            background: white;
            padding: 40px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            text-align: center;
        }
        
        .success-icon {
            font-size: 60px;
            color: #28a745;
            margin-bottom: 20px;
        }
        
        .success-content h3 {
            color: #111;
            margin-bottom: 20px;
            font-size: 24px;
        }
        
        .success-content p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .success-close-btn {
            background: #CB3A1A;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
            transition: background 0.3s ease;
        }
        
        .success-close-btn:hover {
            background: #a02e15;
        }
    `;
    
    document.head.appendChild(styles);
    document.body.appendChild(successMessage);
}

function closeBookingSuccess() {
    const successMessage = document.querySelector('.booking-success');
    if (successMessage) {
        successMessage.remove();
    }
}

// Hero Slider Functionality
function initializeHeroSlider() {
    const navDots = document.querySelectorAll('.nav-dot');
    const heroButtons = document.querySelectorAll('.hero-btn');
    let currentSlide = 0;
    let sliderInterval;
    
    // Sample slider data (you can expand this with real images/content)
    const slides = [
        {
            title: "Flavored Food",
            subtitle: "The Great",
            subtitleBottom: "Part Of Us",
            backgroundImage: "url('./IMAGES/food.png')"
        },
        {
            title: "Delicious Meals",
            subtitle: "Amazing",
            subtitleBottom: "Experience",
            backgroundImage: "url('./IMAGES/food.png')"
        },
        {
            title: "Fresh Ingredients",
            subtitle: "Quality",
            subtitleBottom: "Always",
            backgroundImage: "url('./IMAGES/food.png')"
        }
    ];
    
    // Initialize slider
    function initSlider() {
        if (navDots.length > 0) {
            navDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            // Auto-play slider
            startAutoPlay();
        }
        
        // Add hero button functionality
        heroButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (this.classList.contains('book-table')) {
                    showBookingModal();
                } else if (this.classList.contains('view-menu')) {
                    // Scroll to menu section or navigate to menu page
                    const menuSection = document.querySelector('#menu');
                    if (menuSection) {
                        smoothScrollTo('#menu');
                    } else {
                        // You can add navigation to menu page here
                        console.log('Navigate to menu page');
                    }
                }
            });
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoPlay();
    }
    
    // Update slider display
    function updateSlider() {
        const sliderBg = document.querySelector('.slider-bg');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroSubtitleBottom = document.querySelector('.hero-subtitle-bottom');
        
        // Update active dot
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Ensure background image is always visible
        if (sliderBg) {
            sliderBg.style.backgroundImage = "url('./IMAGES/food.png')";
            sliderBg.style.backgroundSize = 'cover';
            sliderBg.style.backgroundPosition = 'center';
            sliderBg.style.backgroundRepeat = 'no-repeat';
        }
        
        // Update content if elements exist
        if (slides[currentSlide] && heroTitle && heroSubtitle && heroSubtitleBottom) {
            heroTitle.textContent = slides[currentSlide].title;
            heroSubtitle.textContent = slides[currentSlide].subtitle;
            heroSubtitleBottom.textContent = slides[currentSlide].subtitleBottom;
        }
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        sliderInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000); // Change slide every 5 seconds
    }
    
    // Reset auto-play
    function resetAutoPlay() {
        clearInterval(sliderInterval);
        startAutoPlay();
    }
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
    
    // Initialize the slider
    initSlider();
    
    // Force initial background image load
    const sliderBg = document.querySelector('.slider-bg');
    if (sliderBg) {
        sliderBg.style.backgroundImage = "url('./IMAGES/food.png')";
        sliderBg.style.backgroundSize = 'cover';
        sliderBg.style.backgroundPosition = 'center';
        sliderBg.style.backgroundRepeat = 'no-repeat';
    }
}

// Additional utility functions for smooth animations
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let opacity = 0;
    const timer = setInterval(() => {
        opacity += 50 / duration;
        if (opacity >= 1) {
            clearInterval(timer);
            opacity = 1;
        }
        element.style.opacity = opacity;
    }, 50);
}

function fadeOut(element, duration = 300) {
    let opacity = 1;
    const timer = setInterval(() => {
        opacity -= 50 / duration;
        if (opacity <= 0) {
            clearInterval(timer);
            opacity = 0;
            element.style.display = 'none';
        }
        element.style.opacity = opacity;
    }, 50);
}

// Utility functions
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Add header scroll effect styles
const headerScrollStyles = document.createElement('style');
headerScrollStyles.textContent = `
    .header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .header.scrolled {
        background-color: rgba(17, 17, 17, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .header.scrolled .header-bg {
        background: rgba(17, 17, 17, 0.95);
    }
`;
document.head.appendChild(headerScrollStyles);

// Initialize scroll animations
window.addEventListener('load', function() {
    // Add scroll animation class to elements
    const elements = document.querySelectorAll('.hero-content, .nav-item');
    elements.forEach((element, index) => {
        element.classList.add('scroll-animation');
        setTimeout(() => {
            element.classList.add('animate');
        }, index * 100);
    });
});

// Add smooth scrolling to all internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(e.target.getAttribute('href'));
    }
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Custom scroll handling here if needed
}, 100));
