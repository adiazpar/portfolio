// Projects Data
// To add a new project, simply add a new object to this array with the same structure
// Set featured: true for the main project to display larger

const projectsData = [
    {
        title: "Starview",
        category: "Web App",
        date: "Aug 2024 - Dec 2025",
        description: "A community-driven platform helping stargazers discover quality dark sky locations worldwide. Features user reviews with photo verification, interactive maps, and discussion threads. Achieved A+ security rating with 99.3% query optimization.",
        technologies: ["Django", "PostgreSQL", "React", "Redis", "Celery", "Mapbox GL"],
        image: 'images/event-horizon.png',
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
        imageFit: 'contain',
        featured: false,
        links: {
            github: "https://github.com/adiazpar/kasero.git",
            demo: "https://www.kasero.app"
        }
    },
    {
        title: "Placeholder",
        category: "API",
        date: "Jun 2024 - Aug 2024",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        technologies: ["Express.js", "PostgreSQL", "Docker", "AWS"],
        image: null,
        featured: false,
        links: {
            github: "https://github.com/adiazpar/",
            demo: "#"
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

        // Description
        const description = document.createElement('p');
        description.className = 'project-card__description card-content-reveal';
        description.textContent = project.description;

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
