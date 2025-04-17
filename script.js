document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offsetTop = targetElement.offsetTop - document.querySelector('#main-nav').offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('#main-nav').offsetHeight;

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            if (pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Optional: Change navigation background on scroll
    const nav = document.querySelector('#main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Function to handle staggered animations
    function staggerAnimation(elements, delayIncrement = 0.1) {
        elements.forEach((el, index) => {
            el.style.setProperty('--animation-delay', `${index * delayIncrement}s`);
        });
    }

    // Apply stagger to specific sections
    const skillCategories = document.querySelectorAll('#skills .skill-category');
    const projectCards = document.querySelectorAll('#projects .project-card');
    const timelineItems = document.querySelectorAll('#experience .timeline-item');

    staggerAnimation(skillCategories, 0.15);
    staggerAnimation(projectCards, 0.15);
    staggerAnimation(timelineItems, 0.2);
}); 