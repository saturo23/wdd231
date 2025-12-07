// tools-main.js
// Handles hover ripple effect, modal, and tool list filtering

export function applyHoverAnimations() {
  // Ripple effect for buttons
  document.querySelectorAll("button").forEach(btn => {
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

// Simple modal functionality
export function initModal() {
  const modal = document.getElementById("detail-modal");
  const closeBtn = modal.querySelector(".modal-close");

  function openModal() {
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

// Initialize everything
export function initToolsPage() {
  applyHoverAnimations();
  initModal();

  // Set current year
  document.getElementById("year-tools").textContent = new Date().getFullYear();
}

// Auto-run on import
initToolsPage();
