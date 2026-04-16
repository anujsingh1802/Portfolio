/**
 * script.js - Main logic for Portfolio
 */

// 1. Loader Animation (Optimized to max 300ms)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
            
            // Initialize AOS
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    once: true,
                    offset: 50,
                    duration: 800,
                    easing: 'ease-in-out-cubic',
                });
            }
        }, 300);
    }, 100); 
});

// 2. Set active year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 3. Dark/Light Mode Logic
const htmlRoot = document.documentElement; // Tailwind dark mode operates on html element
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeToggleBtnMobile = document.getElementById('themeToggleBtnMobile');

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

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);

// 4. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
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
}

// 5. Skills Data & Injection
const categorizedSkills = [
    {
        category: 'Frontend Development',
        icon: 'fa-layer-group',
        skills: ['React', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3']
    },
    {
        category: 'Backend Development',
        icon: 'fa-server',
        skills: ['Node.js', 'Express', 'MongoDB', 'Python']
    },
    {
        category: 'Tools & Workflows',
        icon: 'fa-toolbox',
        skills: ['Git', 'GitHub', 'Vercel', 'Render', 'VS Code', 'Figma']
    }
];

const skillsContainer = document.getElementById('skills-container');
if (skillsContainer) {
    categorizedSkills.forEach((cat, index) => {
        const delay = index * 100;
        
        // Create skill tags HTML
        const skillTagsHTML = cat.skills.map(skill => 
            `<span class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-lg border border-indigo-100 dark:border-indigo-800/50">${skill}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow";
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', delay);
        
        card.innerHTML = `
            <div class="w-12 h-12 bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center text-xl mb-6 shadow-sm">
                <i class="fas ${cat.icon}"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">${cat.category}</h3>
            <div class="flex flex-wrap gap-2">
                ${skillTagsHTML}
            </div>
        `;
        
        skillsContainer.appendChild(card);
    });
}


// 6. Case Study Projects Data & Injection
const projectsData = [
    {
        id: 'girvi',
        title: 'Girvi App',
        type: 'Fintech Platform',
        problem: 'Local pawn shop owners manage complex asset-backed loans (Girvi) strictly on paper, leading to calculation errors, lost tracking, and a lack of transparency for the loan bearers.',
        solution: 'Developed a robust digital ledger system to manage pawned assets. It enforces secure authentication, computes real-time interest trajectories, and maintains a transparent digital record for both shop owners and borrowers.',
        img: 'images/project1.png',
        tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        live: 'https://girvi-app-9a2y.vercel.app/',
        repo: 'https://github.com/anujsingh1802/girviApp'
    },
    {
        id: 'tire',
        title: 'Tire Management System',
        type: 'Inventory Dashboard',
        problem: 'Fleet managers struggle to accurately track tire lifespan, maintenance schedules, and inventory usage across multiple vehicles, causing inefficient operational spending and potential safety risks.',
        solution: 'Engineered a smart inventory dashboard capturing real-time updates and historical analytics. It provides predictive maintenance alerts and simplifies inventory management for shop operations.',
        img: 'images/project2.png',
        tech: ['React', 'Node.js', 'JavaScript', 'Tailwind CSS'],
        live: 'https://tier-management-iota.vercel.app/',
        repo: 'https://github.com/anujsingh1802/Tier_management'
    },
    {
        id: 'weather',
        title: 'Multi-Utility Platform',
        type: 'Weather & Railway Services',
        problem: 'Users frequently have to switch between clunky interfaces to check weather conditions and live train tracking systems during travel.',
        solution: 'Built a consolidated web application providing real-time weather updates integrated with Indian Railway API services. It allows users to track PNR status, live trains, and station details all via a single clean interface.',
        img: 'images/project3.png',
        tech: ['React', 'Tailwind CSS', 'Railway APIs', 'Weather APIs'],
        live: 'https://weather-blond-kappa.vercel.app/',
        repo: 'https://github.com/anujsingh1802/weather-pwa'
    }
];

const projectsContainer = document.getElementById('projects-container');
if (projectsContainer) {
    projectsData.forEach((project, index) => {
        // Alternate flex direction for case study layout on desktop
        const isEven = index % 2 === 0;
        const flexDirection = isEven ? 'lg:flex-row' : 'lg:flex-row-reverse';
        const fadeDirection = isEven ? 'fade-right' : 'fade-left';
        
        const techTags = project.tech.map(t => `<span class="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">${t}</span>`).join('');

        const projectHTML = `
            <div class="flex flex-col ${flexDirection} gap-10 lg:gap-16 items-center">
                <!-- Project Image -->
                <div class="w-full lg:w-1/2" data-aos="${fadeDirection}">
                    <div class="relative group rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        <div class="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                        <img src="${project.img}" alt="${project.title}" class="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500" onerror="this.src='https://placehold.co/800x600/1e293b/FFFFFF?text=${encodeURIComponent(project.title)}'"/>
                    </div>
                </div>
                
                <!-- Project Details -->
                <div class="w-full lg:w-1/2 space-y-6" data-aos="fade-up">
                    <div>
                        <p class="text-indigo-600 dark:text-indigo-400 font-bold tracking-wide uppercase text-sm mb-2">${project.type}</p>
                        <h3 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">${project.title}</h3>
                    </div>
                    
                    <div class="space-y-4">
                        <div>
                            <h4 class="text-slate-900 dark:text-white font-semibold mb-1">The Problem</h4>
                            <p class="text-slate-600 dark:text-slate-400 font-light leading-relaxed">${project.problem}</p>
                        </div>
                        <div>
                            <h4 class="text-slate-900 dark:text-white font-semibold mb-1">The Solution</h4>
                            <p class="text-slate-600 dark:text-slate-400 font-light leading-relaxed">${project.solution}</p>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-2 pt-2">
                        ${techTags}
                    </div>

                    <div class="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 mt-6 md:mt-8">
                        <a href="${project.live}" target="_blank" class="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-sm hover:shadow hover-lift flex items-center">
                            <i class="fas fa-external-link-alt mr-2"></i> Live Demo
                        </a>
                        <a href="${project.repo}" target="_blank" class="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm hover-lift flex items-center">
                            <i class="fab fa-github mr-2"></i> View Code
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        projectsContainer.insertAdjacentHTML('beforeend', projectHTML);
    });
}


// 7. Contact Form Submit Logic
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('https://portfolio-lv9d.onrender.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();

            if(response.ok) {
                formStatus.textContent = 'Message sent successfully! 🎉';
                formStatus.className = 'mt-4 p-4 rounded-xl text-center text-sm font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50 block';
                contactForm.reset();
            } else {
                throw new Error(result.error || 'Something went wrong.');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            formStatus.textContent = error.message || 'Failed to connect to the server.';
            formStatus.className = 'mt-4 p-4 rounded-xl text-center text-sm font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50 block';
        } finally {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formStatus.classList.remove('block');
                formStatus.classList.add('hidden');
            }, 5000);
        }
    });
}