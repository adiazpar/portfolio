const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/projects-data.js'), 'utf8');

// A minimal DOM harness for the card renderer. Layout still needs browser QA.
class Element {
    constructor(tagName) {
        this.tagName = tagName;
        this.children = [];
        this.style = {};
        this.attributes = {};
        this.clientWidth = 320;
        this.clientHeight = 200;
    }
    set innerHTML(value) { this.html = value; this.children = []; }
    get innerHTML() { return this.html || ''; }
    appendChild(child) { this.children.push(child); }
    setAttribute(name, value) { this.attributes[name] = value; }
    querySelectorAll() { return this.children; }
}

function load({ missingGrid = false } = {}) {
    const grid = new Element('div');
    const ready = [];
    const observed = [];
    const errors = [];
    const context = vm.createContext({
        document: {
            getElementById: id => id === 'projects-grid' && !missingGrid ? grid : null,
            createElement: tag => new Element(tag),
            addEventListener: (event, callback) => ready.push(callback)
        },
        console: { error: message => errors.push(message) },
        Image: class {
            naturalWidth = 1000;
            naturalHeight = 200;
            set src(value) { this.onload(); }
        },
        ResizeObserver: class { constructor(callback) { this.callback = callback; } observe() {} },
        revealObserver: { observe: element => observed.push(element) }
    });
    vm.runInContext(source, context);
    return { grid, ready, observed, errors, context, data: vm.runInContext('projectsData', context) };
}

test('flagship evidence and public destinations stay accurate', () => {
    const { data } = load();
    const [starview, snapmap, relay] = data;
    assert.deepEqual(Array.from(data, p => p.title), ['Starview', 'Snapmap+', 'Claude Relay']);
    assert.equal(starview.date, 'Sep 2024 - Present');
    assert.equal(starview.links.github, 'https://github.com/adiazpar/starview');
    assert.equal(snapmap.featured, true);
    assert.equal(snapmap.links.github, 'https://github.com/doom-snapmap/snapmap-plus');
    assert.equal(snapmap.links.demo, 'https://doom-snapmap.github.io/snapmap-plus/');
    assert.equal(snapmap.links.demoLabel, 'Website');
    assert.match(snapmap.description.join(' '), /Chrispy's SnapHak/);
    assert.doesNotMatch(relay.category + ' ' + relay.description, /open.source/i);
    assert.equal(relay.links.github, null);
    for (const project of data) {
        assert.ok(fs.existsSync(path.join(root, project.image)), project.image);
        for (const key of ['github', 'demo']) {
            if (project.links[key]) assert.equal(new URL(project.links[key]).protocol, 'https:');
        }
    }
});

test('renders two featured cards, usable public links, and no private-code link', () => {
    const { grid, ready, observed } = load();
    ready.forEach(callback => callback());
    assert.equal(grid.children.length, 3);
    assert.equal(observed.length, 3);
    const [starview, snapmap, relay] = grid.children;
    assert.match(starview.className, /project-card--featured/);
    assert.match(snapmap.className, /project-card--featured/);
    assert.doesNotMatch(relay.className, /project-card--featured/);
    const links = card => card.children[1].children.at(-1).children;
    assert.deepEqual(links(starview).map(link => link.href), [
        'https://github.com/adiazpar/starview', 'https://www.starview.app/'
    ]);
    assert.match(links(starview)[1].innerHTML, /Live$/);
    assert.match(links(snapmap)[1].innerHTML, /Website$/);
    assert.equal(links(relay).length, 0);
    assert.equal(snapmap.children[0].style.backgroundSize, 'contain');
});

test('repeat rendering replaces cards rather than duplicating them', () => {
    const { context, grid } = load();
    vm.runInContext('renderProjects(); renderProjects();', context);
    assert.equal(grid.children.length, 3);
});

test('wide logos remain width-constrained at narrow and desktop banner sizes', () => {
    const { context } = load();
    for (const width of [280, 320, 768]) {
        const element = new Element('div');
        element.clientWidth = width;
        context.banner = element;
        vm.runInContext("applyImageScale(banner, 'logo.png', { height: 0.55, maxWidth: 0.85 })", context);
        const [renderedWidth] = element.style.backgroundSize.split(' ').map(parseFloat);
        assert.ok(renderedWidth <= Math.ceil(width * 0.85));
    }
});

test('missing container exits cleanly', () => {
    const { ready, errors } = load({ missingGrid: true });
    ready.forEach(callback => callback());
    assert.deepEqual(errors, ['Projects grid container not found']);
});
