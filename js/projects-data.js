// Projects Data
// To add a new project, simply add a new object to this array with the same structure
// Set featured: true for the main project to display larger

const projectsData = [
    {
        title: "Starview",
        category: "Web App",
        date: "Sep 2024 - Feb 2026",
        description: [
            "The night sky is a lot more interesting when you actually know where to look. Starview is a community-driven platform for stargazers to find — and trust — the dark-sky locations worth driving to, anchored by photo-verified reviews, threaded discussions, and a 24-badge achievement system that rewards everything from a first review to a hundred contributions. A built-in celestial hub answers the question every stargazer asks before heading out: a Sky Score for tonight, an hourly weather timeline, an accurate moon-phase calendar, and a Bortle light-pollution slider keyed to the World Atlas 2015 dataset.",
            "Under the hood, a Django REST Framework API leans on PostgreSQL with PostGIS to do the geographic heavy lifting, while a React frontend (Vite plus TanStack Query) keeps the client snappy. Performance got obsessed over — the location-list endpoint went from 548 queries down to 4, and Redis-backed caching brought 10–60x speedups on hot routes. Security got the same treatment: django-allauth, django-axes, django-csp, bleach for XSS, and tight rate limiting together earned the live site an A+ on securityheaders.com."
        ],
        technologies: ["Django", "DRF", "PostgreSQL", "PostGIS", "React", "Vite", "TanStack Query", "Redis", "Mapbox GL"],
        image: 'images/starview-logo.png',
        imageBackground: '#0a0f1a',
        imageFit: 'auto 55%',
        featured: true,
        links: {
            github: "https://github.com/adiazpar/star-view",
            demo: "https://www.starview.app/"
        }
    },
    {
        title: "Kasero",
        category: "Mobile-first PWA",
        date: "Feb 2026 - May 2026",
        description: "A mobile-first PWA for small business owners to run multiple businesses from a single account. Combines a product catalog with AI-generated icons and barcode scanning, inventory and supplier order tracking, role-based team management, and ownership transfer in one installable app that also works offline. Internationalized for English and Spanish with per-business currency and date formatting, and engineered to run entirely on free-tier infrastructure at $0/month.",
        technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Turso", "next-intl"],
        image: 'images/kasero-icon.png',
        imageBackground: '#fffde4',
        imageFit: 'auto 100%',
        featured: false,
        links: {
            github: "https://github.com/adiazpar/kasero.git",
            demo: "https://www.kasero.app"
        }
    },
    {
        title: "Claude Relay",
        category: "Open Source Tool",
        date: "Feb 2026 - Present",
        description: "An open-source web relay that turns your phone into a remote workspace for Claude Code, exposing N parallel tmux sessions as mobile-friendly tabs over a small Node.js and WebSocket server. Detects dev servers binding TCP ports inside any pane and swaps the chat input for tappable port chips with stop/restart controls, attaches images to messages, and self-heals via launchd or systemd supervision plus tmux session auto-recreate. Built for developers on a Claude Max subscription who want to keep coding from anywhere without giving up their local environment, and reachable from outside your network through Tailscale.",
        technologies: ["TypeScript", "Node.js", "Express", "WebSockets", "tmux", "Vanilla JS"],
        image: 'images/claude-relay-logo.svg',
        imageBackground: '#1a1915',
        imageFit: 'auto 60%',
        featured: false,
        links: {
            github: "https://github.com/adiazpar/claude-relay.git",
            demo: null
        }
    }
];

// Function to generate project cards dynamically
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');

    if (!projectsGrid) {
        console.error('Projects grid container not found');
        return;
    }

    projectsGrid.innerHTML = '';

    // Sort projects so featured comes first
    const sortedProjects = [...projectsData].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    });

    sortedProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = project.featured ? 'project-card project-card--featured reveal' : 'project-card reveal';
        card.setAttribute('data-delay', Math.min(index + 1, 5));

        // Create image wrapper
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'project-card__image card-content-reveal';

        if (project.image) {
            imageWrapper.style.backgroundImage = `url(${project.image})`;
            if (project.imageBackground) {
                imageWrapper.style.backgroundColor = project.imageBackground;
            }
            if (project.imageFit) {
                imageWrapper.style.backgroundSize = project.imageFit;
            }
        } else {
            const placeholder = document.createElement('i');
            placeholder.className = 'fa-solid fa-code project-card__image-placeholder';
            imageWrapper.appendChild(placeholder);
        }

        // Create card content
        const cardContent = document.createElement('div');
        cardContent.className = 'project-card__content';

        // Featured label (only for featured projects)
        if (project.featured) {
            const featuredLabel = document.createElement('span');
            featuredLabel.className = 'project-card__featured-label card-content-reveal';
            featuredLabel.textContent = 'Featured';
            cardContent.appendChild(featuredLabel);
        }

        // Title
        const title = document.createElement('h3');
        title.className = 'project-card__title card-content-reveal';
        title.textContent = project.title;

        // Meta info (category and date)
        const meta = document.createElement('div');
        meta.className = 'project-card__meta card-content-reveal';
        meta.innerHTML = `
            <span class="project-card__category">${project.category}</span>
            <span class="project-card__meta-separator"></span>
            <span>${project.date}</span>
        `;

        // Description (string or array of paragraph strings)
        const description = document.createElement('div');
        description.className = 'project-card__description card-content-reveal';
        const paragraphs = Array.isArray(project.description) ? project.description : [project.description];
        paragraphs.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            description.appendChild(p);
        });

        // Tech stack - inline text
        const techStack = document.createElement('p');
        techStack.className = 'project-card__tech card-content-reveal';
        techStack.innerHTML = `<span class="project-card__tech-label">Built with:</span> ${project.technologies.join(', ')}`;

        // Project links
        const links = document.createElement('div');
        links.className = 'project-card__links card-content-reveal';

        if (project.links.github) {
            const githubLink = document.createElement('a');
            githubLink.href = project.links.github;
            githubLink.className = 'project-card__link';
            githubLink.target = '_blank';
            githubLink.innerHTML = `<i class="fa-brands fa-github"></i> Code`;
            links.appendChild(githubLink);
        }

        if (project.links.demo) {
            const demoLink = document.createElement('a');
            demoLink.href = project.links.demo;
            demoLink.className = 'project-card__link';
            demoLink.target = '_blank';
            demoLink.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Live`;
            links.appendChild(demoLink);
        }

        // Assemble card content
        cardContent.appendChild(title);
        cardContent.appendChild(meta);
        cardContent.appendChild(description);
        cardContent.appendChild(techStack);
        cardContent.appendChild(links);

        // Assemble card
        card.appendChild(imageWrapper);
        card.appendChild(cardContent);

        // Add to grid
        projectsGrid.appendChild(card);
    });

    // Observe project cards for reveal animation (they're created after DOMContentLoaded)
    if (typeof revealObserver !== 'undefined') {
        projectsGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }
}

// Render projects when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProjects);
