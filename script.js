document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    if (window.matchMedia("(min-width: 769px)").matches) {
        document.addEventListener('mousemove', e => {
            cursor.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
        });

        document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
            el.addEventListener('mouseover', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseout', () => cursor.classList.remove('hovered'));
        });
    }

    // --- Sticky Header & Active Nav Link on Scroll ---
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu ---
    const menuIcon = document.querySelector('#menu-icon');
    const navBar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navBar.classList.toggle('active');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navBar.classList.contains('active')) {
                menuIcon.classList.remove('bx-x');
                navBar.classList.remove('active');
            }
        });
    });

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- Project Detail Page Logic ---
    const projectCards = document.querySelectorAll('.project-card');
    const mainContent = document.getElementById('main-content');
    const projectDetailSection = document.getElementById('project-detail');
    const backToProjectsBtn = document.getElementById('back-to-projects-btn');
    const transitionOverlay = document.querySelector('.transition-overlay');

    const showProjectDetail = (data) => {
        document.getElementById('project-detail-title').textContent = data.title;
        const videoContainer = document.getElementById('project-detail-video');
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${data.youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        document.getElementById('project-detail-description').innerHTML = data.description.replace(/\n/g, '<br>');

        const gallery = document.getElementById('project-detail-gallery');
        gallery.innerHTML = '';
        if (data.images) {
            data.images.split(',').forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl.trim();
                img.alt = `${data.title} screenshot`;
                gallery.appendChild(img);
            });
        }

        transitionOverlay.classList.add('active');
        setTimeout(() => {
            mainContent.classList.add('hidden');
            projectDetailSection.classList.add('visible');
            window.scrollTo(0, 0);
            transitionOverlay.classList.remove('active');
        }, 500);
    };

    const showMainContent = () => {
        transitionOverlay.classList.add('active');
        setTimeout(() => {
            projectDetailSection.classList.remove('visible');
            mainContent.classList.remove('hidden');
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'auto' });
            }
            transitionOverlay.classList.remove('active');
        }, 500);
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectData = {
                title: card.dataset.title,
                youtubeId: card.dataset.youtubeId,
                description: card.dataset.description,
                images: card.dataset.images
            };
            showProjectDetail(projectData);
        });
    });

    if (backToProjectsBtn) {
        backToProjectsBtn.addEventListener('click', showMainContent);
    }
});
