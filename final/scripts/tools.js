// tools.js
// Minimal modern hover animations for cards, buttons, and images.

export function applyHoverAnimations() {
    // Smooth scaling for cards, images, tool items
    const hoverables = document.querySelectorAll('.card, .tool-item, img, button, a');

    hoverables.forEach(el => {
        el.style.transition = "transform .25s ease, box-shadow .25s ease";

        el.addEventListener('mouseenter', () => {
            el.style.transform = "scale(1.03)";
            el.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = "scale(1)";
            el.style.boxShadow = "none";
        });
    });

    // Button ripple effect
    document.querySelectorAll("button").forEach(btn => {
        btn.style.position = "relative";
        btn.style.overflow = "hidden";

        btn.addEventListener("click", e => {
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.top = `${e.offsetY}px`;

            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Inject minimal ripple CSS
const style = document.createElement('style');
style.textContent = `
.ripple {
    position: absolute;
    width: 15px;
    height: 15px;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple .6s ease-out;
}

@keyframes ripple {
    to {
        transform: scale(12);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
