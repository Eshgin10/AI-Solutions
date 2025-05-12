document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');

        // Toggle hamburger animation
        mobileMenuToggle.classList.toggle('open');
    });

    // Close mobile menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.classList.remove('open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.classList.remove('open');
        }
    });

    // Update current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const contactStatusMessage = document.getElementById('form-status-message');

    if (contactForm && contactStatusMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            contactStatusMessage.textContent = 'Sending...';
            contactStatusMessage.style.color = '#475569';

            // Simulate form submission (replace with actual API endpoint)
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                contactStatusMessage.textContent = 'Message sent successfully!';
                contactStatusMessage.style.color = '#7c3aed';
                contactForm.reset();
            } catch (error) {
                contactStatusMessage.textContent = 'Error sending message. Please try again.';
                contactStatusMessage.style.color = '#dc2626';
            }
        });
    }

    // Demo Form Submission
    const demoForm = document.getElementById('demoForm');
    const demoStatusMessage = document.getElementById('demo-form-status-message');

    if (demoForm && demoStatusMessage) {
        demoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            demoStatusMessage.textContent = 'Submitting...';
            demoStatusMessage.style.color = '#475569';

            // Simulate form submission (replace with actual API endpoint)
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                demoStatusMessage.textContent = 'Demo request submitted successfully!';
                demoStatusMessage.style.color = '#7c3aed';
                demoForm.reset();
            } catch (error) {
                demoStatusMessage.textContent = 'Error submitting request. Please try again.';
                demoStatusMessage.style.color = '#dc2626';
            }
        });
    }

    // Intersection Observer for Animations
    const animatedElements = document.querySelectorAll('.anim-fade-in, .anim-slide-in, .anim-slide-in-delay, .anim-slide-in-delay-2, .anim-fade-up, .anim-fade-up-delay-1, .anim-fade-up-delay-2, .anim-fade-up-delay-3, .anim-fade-up-delay-4');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Industries Slider Interaction
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('click', () => {
            industryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // Sticky Header Effect
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // Elements
    const aboutSection = document.getElementById('about');
    const aboutTextContainer = document.querySelector('.about-text-container');
    const aboutTextScroll = document.querySelector('.about-text-scroll');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutSection && aboutTextContainer && aboutTextScroll && aboutImage) {
        // Variables for scroll calculations
        let isScrollingAboutSection = false;
        let aboutSectionHeight = 0;
        let aboutTextScrollHeight = 0;
        let viewportHeight = 0;
        
        // Initialize dimensions
        function initDimensions() {
            aboutSectionHeight = aboutTextScroll.scrollHeight;
            aboutTextScrollHeight = aboutTextScroll.scrollHeight - aboutTextContainer.clientHeight;
            viewportHeight = window.innerHeight;
            
            // Set section height to allow scrolling through all the content
            aboutSection.style.height = aboutSectionHeight + 'px';
        }
        
        // Handle scroll events
        function handleScroll() {
            const aboutSectionTop = aboutSection.getBoundingClientRect().top;
            const aboutSectionBottom = aboutSection.getBoundingClientRect().bottom;
            
            // Check if we're in the about section
            if (aboutSectionTop <= 0 && aboutSectionBottom > 0) {
                isScrollingAboutSection = true;
                
                // Calculate how far we've scrolled through the section
                const scrollProgress = -aboutSectionTop / (aboutSectionHeight - viewportHeight);
                const translateY = scrollProgress * aboutTextScrollHeight;
                
                // Apply scroll position to text container
                aboutTextScroll.style.transform = `translateY(-${Math.min(translateY, aboutTextScrollHeight)}px)`;
                
                // Keep the image sticky in its container
                aboutImage.style.position = 'sticky';
            } else {
                isScrollingAboutSection = false;
            }
            
            // Animate elements when they come into view
            animateOnScroll();
        }
        
        // Animation on scroll
        function animateOnScroll() {
            const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-up-delay-1');
            
            animElements.forEach(elem => {
                const elemTop = elem.getBoundingClientRect().top;
                const elemBottom = elem.getBoundingClientRect().bottom;
                
                if (elemTop < window.innerHeight - 100 && elemBottom > 0) {
                    elem.classList.add('visible');
                }
            });
        }
        
        // Initialize
        initDimensions();
        handleScroll(); // Initial call to set positions
        
        // Event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', function() {
            initDimensions();
            handleScroll();
        });
    }
});
