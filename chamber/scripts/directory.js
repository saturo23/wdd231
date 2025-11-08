// === Directory Script ===

// Wait for DOM to load before running
document.addEventListener("DOMContentLoaded", () => {

  // === Display Members in Grid or List ===
  function displayMembers(members) {
    const container = document.getElementById("member-container");
    container.innerHTML = "";

    // Sort members by membershipLevel (highest first)
    members.sort((a, b) => b.membershipLevel - a.membershipLevel);

    members.forEach(member => {
      const card = document.createElement("section");
      card.classList.add("member-card", `member-level-${member.membershipLevel}`);

      // Handle missing or broken images
      const imageSrc = member.image
        ? `images/${member.image}`
        : "images/placeholder.png"; 

      card.innerHTML = `
        <img src="${imageSrc}" alt="Logo of ${member.name}" onerror="this.src='images/placeholder.png'">
        <div>
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // === Load Members from JSON ===
  async function loadMembers() {
    const container = document.getElementById("member-container");

    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Failed to load members.json");

      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error loading members:", error);
      container.innerHTML = `
        <p style="text-align:center; color:red;">
          Unable to load members at this time.
        </p>`;
    }
  }

  // === View Toggle Buttons ===
  const memberContainer = document.getElementById("member-container");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
      memberContainer.classList.remove("list-view");
      memberContainer.classList.add("grid-view");
    });

    listBtn.addEventListener("click", () => {
      memberContainer.classList.remove("grid-view");
      memberContainer.classList.add("list-view");
    });
  }

  // === Mobile menu toggle ===
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // === Footer Info ===
  const yearEl = document.getElementById("year");
  const lastModifiedEl = document.getElementById("last-modified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

  // === Initialize Directory ===
  loadMembers();
});
