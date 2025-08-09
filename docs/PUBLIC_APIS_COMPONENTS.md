## Public APIs, Functions, and Components

This document describes the public contracts and behaviors of the site, including how sections are loaded, how styles are resolved, and how to extend or use the existing components. It also includes examples and usage instructions.

### Overview
- The site is a static, client-rendered portfolio with lazy-loaded content sections and per-section CSS.
- JavaScript entrypoint: `resources/scripts/index.js`.
- HTML entrypoint: `index.html`.
- Section partials: `sections/*.html`.
- Styles:
  - Global: `resources/styles/css/index.css` (and `index.min.css`).
  - Per-section: `resources/styles/css/<section-name>.css` (and `.min.css`).

### Public Contracts (What you can rely on)

- **Lazy-loading contract for sections**
  - Any element with class `main-section` and attribute `data-src` will be observed for visibility and lazily loaded.
  - When the element becomes visible (IntersectionObserver threshold), the HTML at `data-src` is fetched and injected into the section.
  - The section's `id` must start with an underscore and match the convention `_<section-name>` (e.g., `_home-section`). The loader will derive the CSS URL as `resources/styles/css/<section-name>.min.css` and inject it once.
  - The section will have classes toggled:
    - Initially: `placeholder`
    - After load: `loaded` (and `placeholder` is removed)

- **Navigation behavior contract**
  - Any anchor with class `main-nav-item` will cause the responsive nav checkbox (with id `main-nav-button`) to uncheck on click, closing the mobile menu.

- **Contact form contract**
  - The contact form is found in `sections/contact-section.html` and posts to the configured endpoint. Field names are `name`, `email`, `message`. Adjust types/validation as needed for your provider.

### JavaScript Runtime: Functions and Configuration
File: `resources/scripts/index.js`

- **Global lifecycle**
  - All behavior is registered in a `window.addEventListener('load', ...)` handler.

- **Menu control**
  - Selectors: `.main-nav-item`, `#main-nav-button`.
  - Behavior: On clicking any `.main-nav-item`, the checkbox `#main-nav-button` is set to `false` to close the menu.

- **Lazy section loader**
  - Configuration:
    - `observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 }`.
  - Functions:
    - `loadCSS(href: string): void`
      - Injects a `<link rel="stylesheet">` pointing to `href` into `<head>` if not already present.
      - Idempotent per `href` (no duplicate `<link>` tags).
    - `loadSection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void`
      - For each intersecting `entry`, finds the target `section` and reads `section.dataset.src`.
      - Derives CSS path from `section.id.substring(1)` → `<section-name>` and loads `resources/styles/css/<section-name>.min.css` via `loadCSS`.
      - Fetches the HTML from `data-src`, injects it, toggles classes (`loaded`/`placeholder`), then `observer.unobserve(section)`.
      - Errors are logged to console and a friendly message is injected into the section on failure.
  - Initialization:
    - `const sectionsToLoad = document.querySelectorAll('.main-section[data-src]')`
    - `const observer = new IntersectionObserver(loadSection, observerOptions)`
    - Each section is observed via `observer.observe(section)`

### Components (Sections)
Each component is a standalone HTML partial under `sections/` that is lazy-loaded into its corresponding placeholder in `index.html`.

- **Home (`_home-section`)**
  - Partial: `sections/home-section.html`
  - Styles: `resources/styles/css/home-section.min.css`
  - Purpose: Hero with name, title, photo, and quick links.

- **Sobre mí (`_about-me-section`)**
  - Partial: `sections/about-me-section.html`
  - Styles: `resources/styles/css/about-me-section.min.css`
  - Purpose: Bio and background.

- **Habilidades técnicas (`_hard-skills-section`)**
  - Partial: `sections/hard-skills-section.html`
  - Styles: `resources/styles/css/hard-skills-section.min.css`
  - Purpose: Skills grouped by areas.

- **Experiencia profesional (`_prof-exp-section`)**
  - Partial: `sections/prof-exp-section.html`
  - Styles: `resources/styles/css/prof-exp-section.min.css`
  - Purpose: Work history with roles and achievements.

- **Contacto (`_contact-section`)**
  - Partial: `sections/contact-section.html`
  - Styles: `resources/styles/css/contact-section.min.css`
  - Purpose: Contact form posting to the configured endpoint.

### How to Add a New Section (Example: "Projects")

1) Create the HTML partial under `sections/`:
```html
<!-- sections/projects-section.html -->
<h2 class="section-title">Proyectos</h2>
<div class="section-content">
  <p>Listado de proyectos destacados.</p>
</div>
```

2) Create the CSS file and (optionally) a minified version:
```css
/* resources/styles/css/projects-section.css */
.section-content {
  /* estilos específicos */
}
```
Also provide `resources/styles/css/projects-section.min.css` in production. The loader will request the `.min.css` file.

3) Reference it in `index.html` as a placeholder with a matching id and data-src:
```html
<section id="_projects-section" class="main-section placeholder" data-src="./sections/projects-section.html">
  <h2 class="section-title">Proyectos</h2>
  <span class="loader"></span>
</section>
```
The loader derives the CSS href `resources/styles/css/projects-section.min.css` from the id `_projects-section` by removing the leading underscore.

### Adjusting Lazy-Load Behavior (Examples)

- Change when sections load by editing `observerOptions` in `resources/scripts/index.js`:
```js
const observerOptions = {
  root: null,
  rootMargin: '200px 0px', // pre-load earlier
  threshold: 0.0
};
```

- Eager-load all sections (development): set `threshold: 0` and `rootMargin: '100% 0px'`, or temporarily bypass the observer:
```js
// After creating the observer, immediately trigger loads once:
sectionsToLoad.forEach(section => {
  loadSection([{ isIntersecting: true, target: section }], observer);
});
```

### Navigation: Adding Items
Add links with class `main-nav-item` so the mobile menu auto-closes on click:
```html
<li><a href="#_projects-section" class="main-nav-item">Proyectos</a></li>
```

### Contact Form Notes
- Partial: `sections/contact-section.html`
- Fields: `name`, `email`, `message`
- Ensure `type="email"` is set on the email field for HTML5 validation, and the action URL matches your provider’s endpoint format.

### Folder Structure (key paths)
```
index.html
resources/
  scripts/
    index.js
  styles/css/
    index.css
    index.min.css
    <section>.css
    <section>.min.css
sections/
  about-me-section.html
  contact-section.html
  hard-skills-section.html
  home-section.html
  prof-exp-section.html
```

### Local Development and Usage
- Because section HTML is fetched at runtime, serve the site over HTTP locally to avoid CORS/file:// restrictions.
- From the project root:

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```

### Troubleshooting
- Section doesn’t style correctly: Confirm the section `id` maps to the correct CSS filename (`_<name>` → `resources/styles/css/<name>.min.css`).
- Section never loads: Ensure the section has `data-src` and the URL is correct; check console for fetch errors.
- Duplicate CSS: The loader prevents duplicate `<link>` tags per `href`, but confirm only one `<link href="...">` exists in `<head>`.