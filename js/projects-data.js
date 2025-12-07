// Projects Data
// To add a new project, simply add a new object to this array with the same structure
// Set featured: true for the main project to display larger

const projectsData = [
    {
        title: "Starview",
        category: "Web App",
        date: "Aug 2024 - Dec 2025",
        description: "A full-stack star viewing application that allows users to find the best viewing spots on the globe. Built with Django and PostgreSQL for robust data management and real-time location services.",
        technologies: ["Django", "Python", "PostgreSQL", "HTML", "CSS", "JavaScript"],
        image: 'images/event-horizon.png',
        featured: true,
        links: {
            github: "https://github.com/adiazpar/star-view",
            demo: "https://www.starview.app/"
        }
    },
    {
        title: "Placeholder",
        category: "Mobile App",
        date: "Sep 2024 - Nov 2024",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
        image: null,
        featured: false,
        links: {
            github: "https://github.com/adiazpar/",
            demo: "#"
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
