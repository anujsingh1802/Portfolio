/**
 * script.js - Main logic for Portfolio
 */

// 1. Loader Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
            
            // Initialize AOS after loader is gone to prevent issues
            AOS.init({
                once: true,
                offset: 50,
                duration: 800,
                easing: 'ease-in-out-cubic',
            });
        }, 500);
    }, 1000); // minimum 1s loader to show animation
});

// 2. Set active year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// 3. Dark/Light Mode Logic
const htmlRoot = document.getElementById('html-root');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeToggleBtnMobile = document.getElementById('themeToggleBtnMobile');

// Check local storage or system preference
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (userTheme === 'dark' || (!userTheme && systemTheme)) {
    htmlRoot.classList.add('dark');
} else {
    htmlRoot.classList.remove('dark');
}

function toggleTheme() {
    htmlRoot.classList.toggle('dark');
    const isDark = htmlRoot.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', toggleTheme);
themeToggleBtnMobile.addEventListener('click', toggleTheme);

// 4. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if(mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 5. Typing Animation
const typingTextElement = document.getElementById('typing-text');
const texts = ["Web Developer", "AI Enthusiast", "Building Smart Applications"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before new text
    }

    setTimeout(typeEffect, typeSpeed);
}
// Start typing effect
setTimeout(typeEffect, 1500);


// 6. Skills Data
const skills = [
    { name: 'HTML5', color: 'bg-orange-500', text: 'text-white' },
    { name: 'CSS3', color: 'bg-blue-500', text: 'text-white' },
    { name: 'JavaScript', color: 'bg-yellow-400', text: 'text-gray-900' },
    { name: 'React', color: 'bg-cyan-500', text: 'text-white' },
    { name: 'Tailwind CSS', color: 'bg-teal-400', text: 'text-white' },
    { name: 'Bootstrap', color: 'bg-purple-600', text: 'text-white' },
    { name: 'Node.js', color: 'bg-green-600', text: 'text-white' },
    { name: 'Express', color: 'bg-gray-800', text: 'text-white' },
    { name: 'MongoDB', color: 'bg-green-500', text: 'text-white' },
    { name: 'Python', color: 'bg-blue-600', text: 'text-white' },
];

const skillsContainer = document.getElementById('skills-container');
skills.forEach((skill, index) => {
    const delay = index * 50;
    const span = document.createElement('span');
    span.className = `${skill.color} ${skill.text} px-5 py-2.5 rounded-full font-medium shadow-md transition transform hover:-translate-y-1 hover:shadow-lg`;
    span.setAttribute('data-aos', 'zoom-in');
    span.setAttribute('data-aos-delay', delay);
    span.textContent = skill.name;
    skillsContainer.appendChild(span);
});


// 7. Project Modal Logic
const projectsData = {
    'project1': {
        title: 'Girvi App',
        desc: 'A modern fintech platform for managing pawned assets (Girvi system) with secure authentication, real-time tracking, and digital record management for users and shop owners.',
        img: 'images/project1.png',
        tech: [
            { name: 'Node.js', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
            { name: 'MongoDB', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
            { name: 'React', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' }
        ],
        live: 'https://girvi-app-9a2y.vercel.app/',
        repo: 'https://github.com/anujsingh1802/girviApp'
    },
    'project2': {
        title: 'Tire Management',
        desc: 'A smart management system for tracking tire inventory, maintenance schedules, and usage history with real-time updates and analytics for efficient fleet and shop operations.',
        img: 'images/project2.png',
        tech: [
            { name: 'JavaScript', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
            { name: 'React', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
            { name: 'Node.js', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' }
        ],
        live: 'https://tier-management-iota.vercel.app/',
        repo: 'https://github.com/anujsingh1802/Tier_management'
    },
    'project3': {
        title: 'Weather App',
        desc: 'A multi-feature web app that provides real-time weather updates along with train services like live train status, PNR tracking, and station details in a clean and user-friendly interface.',
        img: 'images/project3.png',
        tech: [
            { name: 'Tailwind CSS', class: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
            { name: 'React', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
            { name: 'Railway API', class: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' }
        ],
        live: 'https://weather-blond-kappa.vercel.app/',
        repo: 'https://github.com/anujsingh1802/weather-pwa'
    }
};

const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');

function openModal(projectId) {
    const data = projectsData[projectId];
    if(!data) return;

    // Populate Data
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    const modalImg = document.getElementById('modalImg');
    modalImg.src = data.img;
    modalImg.onerror = function() {
        this.onerror = null;
        this.src = `https://placehold.co/600x400/2a2a2a/FFFFFF?text=${encodeURIComponent(data.title)}`;
    };
    document.getElementById('modalLive').href = data.live;
    document.getElementById('modalRepo').href = data.repo;

    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = `text-xs px-3 py-1 rounded-md ${t.class} font-medium`;
        span.textContent = t.name;
        techContainer.appendChild(span);
    });

    // Show Modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Animate in
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    // Animate out
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Close modal on click outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


// 8. Contact Form Submit Logic
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // You'll need to change the URL to your deployed backend URL later
        const response = await fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        if(response.ok) {
            formStatus.textContent = 'Message sent successfully! 🎉';
            formStatus.className = 'mt-4 p-3 rounded text-center text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 block';
            contactForm.reset();
        } else {
            throw new Error(result.error || 'Something went wrong.');
        }

    } catch (error) {
        console.error('Error submitting form:', error);
        formStatus.textContent = error.message || 'Failed to connect to the server.';
        formStatus.className = 'mt-4 p-3 rounded text-center text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 block';
    } finally {
        // Reset button
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('block');
            formStatus.classList.add('hidden');
        }, 5000);
    }
});