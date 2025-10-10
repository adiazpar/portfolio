// Projects Data
// To add a new project, simply add a new object to this array with the same structure

const projectsData = [
    {
        title: "Event Horizon",
        category: "Web App",
        categoryIcon: "fa-solid fa-laptop-code", // Icon shown next to category name
        date: "Aug 2024 - June 2025",
        description: "A full-stack star viewing application that allows users to find the best viewing spots on the globe.",
        technologies: [
            { name: "Django", icon: "fa-classic fa-code" },
            { name: "Python", icon: "fa-brands fa-python" },
            { name: "SQLite", icon: "fa-solid fa-database" },
            { name: "HTML", icon: "fa-brands fa-html5" },
            { name: "CSS", icon: "fa-brands fa-css3" },
            { name: "JavaScript", icon: "fa-brands fa-node-js" }
        ],
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        image: 'images/event-horizon.png', // Set to image URL to replace gradient/placeholder, or leave as null
        links: {
            github: "https://github.com/adiazpar/",
            demo: "#"
        }
    },
    {
        title: "Placeholder",
        category: "Mobile App",
        categoryIcon: "fa-solid fa-mobile-screen-button", // Icon shown next to category name
        date: "Sep 2024 - Nov 2024",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        technologies: [
            { name: "React Native", icon: "fa-brands fa-react" },
            { name: "Firebase", icon: "fa-solid fa-fire" },
            { name: "Redux", icon: "fa-solid fa-code" },
            { name: "TypeScript", icon: "fa-solid fa-code" }
        ],
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        image: null, // Set to image URL to replace gradient/placeholder, or leave as null
        links: {
            github: "https://github.com/adiazpar/",
            demo: "#"
        }
    },
    {
        title: "Placeholder",
        category: "API",
        categoryIcon: "fa-solid fa-database", // Icon shown next to category name
        date: "Jun 2024 - Aug 2024",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        technologies: [
            { name: "Express.js", icon: "fa-brands fa-node-js" },
            { name: "PostgreSQL", icon: "fa-solid fa-database" },
            { name: "Docker", icon: "fa-brands fa-docker" },
            { name: "AWS", icon: "fa-brands fa-aws" }
        ],
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        image: null, // Set to image URL to replace gradient/placeholder, or leave as null
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

    projectsGrid.innerHTML = ''; // Clear existing content

    projectsData.forEach(project => {
        // Create project card
        const card = document.createElement('div');
        card.className = 'project-card';

        // Create image wrapper
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'project-image-wrapper';

        // Check if project has a custom image, otherwise use gradient with placeholder
        if (project.image) {
            imageWrapper.style.backgroundImage = `url(${project.image})`;
            imageWrapper.style.backgroundSize = 'cover';
            imageWrapper.style.backgroundPosition = 'center';
        } else {
            imageWrapper.style.background = project.gradient;
            // Show code icon placeholder when no image is provided
            const imageIcon = document.createElement('i');
            imageIcon.className = 'fa-solid fa-code project-image-placeholder';
            imageWrapper.appendChild(imageIcon);
        }

        // Create card content
        const cardContent = document.createElement('div');
        cardContent.className = 'project-card-content';

        // Title
        const title = document.createElement('h3');
        title.textContent = project.title;

        // Meta info (category and date)
        const meta = document.createElement('div');
        meta.className = 'project-meta';
        meta.innerHTML = `
            <span class="project-category">
                <i class="${project.categoryIcon}"></i>
                ${project.category}
            </span>
            <i class="fa-solid fa-circle meta-separator"></i>
            <span>
                ${project.date}
            </span>
        `;

        // Description
        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;

        // Tech stack
        const techStack = document.createElement('div');
        techStack.className = 'tech-stack';
        project.technologies.forEach(tech => {
            const badge = document.createElement('span');
            badge.className = 'tech-badge';
            badge.innerHTML = `
                <i class="${tech.icon}"></i>
                ${tech.name}
            `;
            techStack.appendChild(badge);
        });

        // Project links
        const links = document.createElement('div');
        links.className = 'project-links';

        // Add links based on what's available
        if (project.links.github) {
            const githubLink = document.createElement('a');
            githubLink.href = project.links.github;
            githubLink.className = 'project-link';
            githubLink.target = '_blank';
            githubLink.innerHTML = `
                <i class="fa-brands fa-github"></i>
                Code
            `;
            links.appendChild(githubLink);
        }

        if (project.links.demo) {
            const demoLink = document.createElement('a');
            demoLink.href = project.links.demo;
            demoLink.className = 'project-link';
            demoLink.target = '_blank';
            demoLink.innerHTML = `
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                Live Demo
            `;
            links.appendChild(demoLink);
        }

        if (project.links.docs) {
            const docsLink = document.createElement('a');
            docsLink.href = project.links.docs;
            docsLink.className = 'project-link';
            docsLink.target = '_blank';
            docsLink.innerHTML = `
                <i class="fa-solid fa-book"></i>
                Docs
            `;
            links.appendChild(docsLink);
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
}

// Render projects when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProjects);
