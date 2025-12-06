// main.js
const path = window.location.pathname.split('/').pop();

// HOME PAGE
if (path === '' || path === 'index.html') {
    import('./index-init.js')
        .then(m => m.initIndex?.())
        .catch(err => console.warn("Index init not found:", err));
}

// TOOLS PAGE
else if (path === 'tools.html') {
    import('./tech-init.js')
        .then(m => m.initTechPage?.())
        .catch(err => console.error("Tools init error:", err));
}

// FORM PAGE
else if (path === 'form.html') {
    import('./form-init.js')
        .then(m => m.initForm?.())
        .catch(err => console.warn("Form init missing:", err));
}

// FORM ACTION PAGE
else if (path === 'form-action.html') {
    import('./action-init.js')
        .then(m => m.initFormAction?.())
        .catch(err => console.warn("Action init missing:", err));
}

// ABOUT PAGE
else if (path === 'about.html') {
    // Optional: could import an about-init.js
}
