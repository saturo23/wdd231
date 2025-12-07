// modal.js

const modal = document.getElementById("detail-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalFeatures = document.getElementById("modal-features");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".modal-close");

export function openModal(data) {
  modalTitle.textContent = data.name;
  modalDesc.textContent = data.desc;

  modalFeatures.innerHTML = data.features
    .map(f => `<li>${f}</li>`)
    .join("");

  modalLink.href = data.link;

  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");
}

export function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
