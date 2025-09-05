/*
========================================
SWEET DREAMS BAKERY - JAVASCRIPT
========================================

This file contains minimal JavaScript for:
1. Mobile menu toggle
2. Smooth scrolling to sections
3. Copy email functionality

The code is kept simple and well-commented for beginners.
*/

// Wait for the page to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // === MOBILE MENU FUNCTIONALITY ===
    
    // Get the mobile menu button and mobile navigation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.nav-mobile');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    
    // Toggle mobile menu when hamburger button is clicked
    mobileMenuBtn.addEventListener('click', function() {
        // Toggle the 'active' class to show/hide mobile menu
        mobileNav.classList.toggle('active');
        
        // Animate hamburger lines (optional enhancement)
        const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
        lines.forEach(line => {
            line.style.transform = mobileNav.classList.contains('active') 
                ? 'rotate(45deg)' 
                : 'rotate(0deg)';
        });
    });
    
    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            
            // Reset hamburger lines
            const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
            lines.forEach(line => {
                line.style.transform = 'rotate(0deg)';
            });
        });
    });
    
    // === SMOOTH SCROLLING FOR NAVIGATION LINKS ===
    
    // Get all navigation links (both desktop and mobile)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add smooth scrolling behavior to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section smoothly
            if (targetSection) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === COPY EMAIL FUNCTIONALITY ===
    
    // Get the copy email button and email text
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    const emailText = document.querySelector('.contact-email');
    
    // Add click event to copy email button
    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', function() {
            // Get the email address text
            const email = emailText.textContent;
            
            // Try to copy to clipboard using modern API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(function() {
                    // Show success message
                    showCopyMessage('Email copied to clipboard!');
                }).catch(function() {
                    // Fallback if clipboard API fails
                    fallbackCopyEmail(email);
                });
            } else {
                // Use fallback method for older browsers
                fallbackCopyEmail(email);
            }
        });
    }
    
    // Fallback copy method for older browsers
    function fallbackCopyEmail(email) {
        // Create a temporary text area element
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        // Select and copy the text
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyMessage('Email copied to clipboard!');
        } catch (err) {
            showCopyMessage('Please copy manually: ' + email);
        }
        
        // Remove the temporary element
        document.body.removeChild(textArea);
    }
    
    // Show copy success/error message
    function showCopyMessage(message) {
        // Change button text temporarily
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = message;
        copyEmailBtn.style.backgroundColor = '#4CAF50'; // Green success color
        
        // Reset button after 2 seconds
        setTimeout(function() {
            copyEmailBtn.textContent = originalText;
            copyEmailBtn.style.backgroundColor = ''; // Reset to original color
        }, 2000);
    }
    
    // === SCROLL ANIMATIONS (OPTIONAL ENHANCEMENT) ===
    
    // Add fade-in animation when elements come into view
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
    };
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.highlight-card, .menu-card, .testimonial-card, .about-img, .gallery-img');
    
    // Set initial state and observe each element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // === HEADER SCROLL EFFECT (OPTIONAL ENHANCEMENT) ===
    
    // Add shadow to header when scrolling
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 16px rgba(139, 69, 19, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.1)';
        }
    });
    
    // === LAZY LOADING FALLBACK ===
    
    // For browsers that don't support native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        console.log('Native lazy loading is supported');
    } else {
        // Fallback for older browsers
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    console.log('Sweet Dreams Bakery website loaded successfully! 🍰');
});