// Restaurant Website JavaScript - Navigation & Mobile Menu

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeBookingModal();
    initializeHeroSlider();
    initializeFoodMenu(); // Add this line
    initializeGallery();
    initializeCounters();
    initializeContactForm(); // Add contact form initialization
    initializeReservationForm(); // Add reservation form initialization
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
            // Scroll to reservation section
            const reservationSection = document.getElementById('reservation');
            if (reservationSection) {
                reservationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Add click handlers for hero book table button
    const heroBookBtn = document.querySelector('.hero-btn.book-table');
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to reservation section
            const reservationSection = document.getElementById('reservation');
            if (reservationSection) {
                reservationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
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

// Food Menu Tab Functionality
function initializeFoodMenu() {
    const tabButtons = document.querySelectorAll('.food-tab-btn');
    const foodCards = document.querySelectorAll('.food-card');
    
    // Add click handlers to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide food cards based on category
            foodCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize with "All Food" category active
    if (tabButtons.length > 0) {
        const allButton = document.querySelector('.food-tab-btn[data-category="all"]');
        if (allButton) {
            allButton.click();
        } else {
            tabButtons[0].click();
        }
    }
}

// Gallery Navigation
function initializeGallery() {
    const prevBtn = document.querySelector('.gallery-nav-btn.prev');
    const nextBtn = document.querySelector('.gallery-nav-btn.next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (prevBtn && nextBtn && galleryItems.length > 0) {
        let currentSet = 0;
        const itemsPerSet = 5; // Show 5 items at a time
        const totalSets = Math.ceil(galleryItems.length / itemsPerSet);
        
        function showGallerySet(setIndex) {
            // Hide all items
            galleryItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show items for the current set
            const startIndex = setIndex * itemsPerSet;
            const endIndex = Math.min(startIndex + itemsPerSet, galleryItems.length);
            
            for (let i = startIndex; i < endIndex; i++) {
                if (galleryItems[i]) {
                    galleryItems[i].classList.add('active');
                }
            }
        }
        
        prevBtn.addEventListener('click', () => {
            currentSet = currentSet > 0 ? currentSet - 1 : totalSets - 1;
            showGallerySet(currentSet);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSet = currentSet < totalSets - 1 ? currentSet + 1 : 0;
            showGallerySet(currentSet);
        });
        
        // Initialize with first set
        showGallerySet(0);
    }
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const options = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let current = 0;
                
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 40);
                
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Contact Form functionality
function initializeContactForm() {
    // Create contact form styles if not exists
    if (!document.querySelector('#contact-form-styles')) {
        const styles = document.createElement('style');
        styles.id = 'contact-form-styles';
        styles.textContent = `
            .contact-form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .contact-form h2 {
                margin-bottom: 20px;
                color: #111;
                text-align: center;
                font-size: 28px;
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
            
            .submit-contact-btn {
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
            
            .submit-contact-btn:hover {
                background: #a02e15;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(styles);
    }
}

function showContactForm() {
    // Create form if it doesn't exist
    let form = document.getElementById('contact-form');
    if (!form) {
        form = document.createElement('div');
        form.id = 'contact-form';
        form.className = 'contact-form';
        form.innerHTML = `
            <h2>Contact Us</h2>
            <form onsubmit="handleContactSubmit(event)">
                <div class="form-group">
                    <label for="contact-name">Full Name *</label>
                    <input type="text" id="contact-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="contact-email">Email *</label>
                    <input type="email" id="contact-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="contact-message">Message *</label>
                    <textarea id="contact-message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit" class="submit-contact-btn">Send Message</button>
            </form>
        `;
        document.body.appendChild(form);
    }
    
    // Show form
    form.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close form on outside click
    form.addEventListener('click', function(e) {
        if (e.target === form) {
            closeContactForm();
        }
    });
    
    // Close form on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && form.style.display === 'block') {
            closeContactForm();
        }
    });
}

function closeContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const contactData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(contactData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-contact-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showContactSuccess(contactData);
        
        // Reset form
        event.target.reset();
        
        // Close form
        closeContactForm();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    
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
    
    return true;
}

function showContactSuccess(contactData) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'contact-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you, ${contactData.name}! Your message has been sent successfully.</p>
            <p>We'll get back to you at ${contactData.email} shortly.</p>
            <button onclick="closeContactSuccess()" class="success-close-btn">Close</button>
        </div>
    `;
    
    // Add success message styles
    const styles = document.createElement('style');
    styles.textContent = `
        .contact-success {
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

function closeContactSuccess() {
    const successMessage = document.querySelector('.contact-success');
    if (successMessage) {
        successMessage.remove();
    }
}

// Reservation Form functionality
function initializeReservationForm() {
    // Create reservation form styles if not exists
    if (!document.querySelector('#reservation-form-styles')) {
        const styles = document.createElement('style');
        styles.id = 'reservation-form-styles';
        styles.textContent = `
            .reservation-form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .reservation-form h2 {
                margin-bottom: 20px;
                color: #111;
                text-align: center;
                font-size: 28px;
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
            
            .submit-reservation-btn {
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
            
            .submit-reservation-btn:hover {
                background: #a02e15;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(styles);
    }
}

function showReservationForm() {
    // Create form if it doesn't exist
    let form = document.getElementById('reservation-form');
    if (!form) {
        form = document.createElement('div');
        form.id = 'reservation-form';
        form.className = 'reservation-form';
        form.innerHTML = `
            <h2>Reservation Form</h2>
            <form onsubmit="handleReservationSubmit(event)">
                <div class="form-group">
                    <label for="reservation-name">Full Name *</label>
                    <input type="text" id="reservation-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="reservation-email">Email *</label>
                    <input type="email" id="reservation-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="reservation-phone">Phone Number *</label>
                    <input type="tel" id="reservation-phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="reservation-date">Date *</label>
                    <input type="date" id="reservation-date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="reservation-time">Time *</label>
                    <input type="time" id="reservation-time" name="time" required>
                </div>
                <div class="form-group">
                    <label for="reservation-guests">Number of Guests *</label>
                    <select id="reservation-guests" name="guests" required>
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
                <div class="form-group">
                    <label for="reservation-notes">Special Requests (Optional)</label>
                    <textarea id="reservation-notes" name="notes" rows="4" placeholder="Any special requests or dietary requirements..."></textarea>
                </div>
                <button type="submit" class="submit-reservation-btn">Make Reservation</button>
            </form>
        `;
        document.body.appendChild(form);
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('reservation-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Show form
    form.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close form on outside click
    form.addEventListener('click', function(e) {
        if (e.target === form) {
            closeReservationForm();
        }
    });
    
    // Close form on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && form.style.display === 'block') {
            closeReservationForm();
        }
    });
}

function closeReservationForm() {
    const form = document.getElementById('reservation-form');
    if (form) {
        form.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function handleReservationSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const reservationData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateReservationForm(reservationData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-reservation-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showReservationSuccess(reservationData);
        
        // Reset form
        event.target.reset();
        
        // Close form
        closeReservationForm();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateReservationForm(data) {
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

function showReservationSuccess(reservationData) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'reservation-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Reservation Confirmed!</h3>
            <p>Thank you, ${reservationData.name}! Your reservation for ${reservationData.guests} guest(s) on ${reservationData.date} at ${reservationData.time} has been received.</p>
            <p>We'll send a confirmation email to ${reservationData.email} shortly.</p>
            <button onclick="closeReservationSuccess()" class="success-close-btn">Close</button>
        </div>
    `;
    
    // Add success message styles
    const styles = document.createElement('style');
    styles.textContent = `
        .reservation-success {
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

function closeReservationSuccess() {
    const successMessage = document.querySelector('.reservation-success');
    if (successMessage) {
        successMessage.remove();
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

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmission(this);
    });
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function handleContactFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const formObject = {};
    
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Validate form
    if (!validateContactForm(form)) {
        resetSubmitButton(submitBtn, originalText);
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showContactFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        resetSubmitButton(submitBtn, originalText);
    }, 2000);
}

function validateContactForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    // Validate email
    else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    // Validate name (no numbers or special characters)
    else if (field.name === 'userName' && value) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(value)) {
            errorMessage = 'Name should only contain letters and spaces';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showContactFormMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `contact-form-message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Insert message before the form
    const form = document.getElementById('contactForm');
    const formWrapper = form.parentNode;
    formWrapper.insertBefore(messageDiv, form);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function resetSubmitButton(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

// Reservation Form Functionality
function initializeReservationForm() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (!reservationForm) return;
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleReservationSubmit(this);
    });
}

function handleReservationSubmit(form) {
    const submitBtn = form.querySelector('.reservation-page-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Processing...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const reservationData = {
        guests: formData.get('guests'),
        date: formData.get('date'),
        time: formData.get('time'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    // Simulate API call
    setTimeout(() => {
        try {
            // Here you would normally send the data to your server
            console.log('Reservation submitted:', reservationData);
            
            // Show success message
            showReservationMessage('success', 'Reservation submitted successfully! We will contact you soon.');
            form.reset();
            
            // Reset date minimum
            const dateInput = document.getElementById('date');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }
            
        } catch (error) {
            console.error('Reservation submission error:', error);
            showReservationMessage('error', 'Failed to submit reservation. Please try again.');
        } finally {
            resetReservationButton(submitBtn, originalText);
        }
    }, 2000);
}

function showReservationMessage(type, message) {
    // Remove any existing message
    const existingMessage = document.querySelector('.reservation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `reservation-message ${type}`;
    messageDiv.innerHTML = `
        <div class="reservation-message-content">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        font-family: 'Kumbh Sans', sans-serif;
        font-size: 16px;
        max-width: 400px;
        text-align: center;
    `;
    
    messageDiv.querySelector('.reservation-message-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
    `;
    
    // Add to body
    document.body.appendChild(messageDiv);
    
    // Auto-remove message after 4 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 4000);
}

function resetReservationButton(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}
