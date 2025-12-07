// main.js

// Get current page filename
const path = window.location.pathname.split('/').pop() || 'index.html';

// PAGE ROUTING
switch (path) {
    case 'index.html':
        import('./index-init.js')
            .then(m => m.initIndex?.())
            .catch(err => console.warn("Index init missing:", err));
        break;

    case 'tools.html':
        import('./tech-init.js')
            .then(m => m.initTechPage?.())
            .catch(err => console.error("Tools init error:", err));
        break;

    case 'form.html':
        import('./form-init.js')
            .then(m => m.initForm?.())
            .catch(err => console.warn("Form init missing:", err));
        break;

    case 'form-action.html':
        import('./action-init.js')
            .then(m => m.initFormAction?.())
            .catch(err => console.warn("Action init missing:", err));
        break;

    case 'about.html':
        // Future imports if needed
        break;
}

// GLOBAL HOVER ANIMATIONS
import('./tools.js')
    .then(m => m.applyHoverAnimations?.())
    .catch(err => console.warn("Tools.js not loaded:", err));
