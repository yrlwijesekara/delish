// Gallery and Counter JavaScript

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
