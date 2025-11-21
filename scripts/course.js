// === Load Courses ===
import courses from "/wdd231/scripts/course.js";

const container = document.getElementById("courseContainer");
const totalCredits = document.getElementById("totalCredits");
const dialog = document.getElementById("course-details");

function displayCourses(list) {
  container.innerHTML = "";

  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    card.dataset.id = course.number;

    card.innerHTML = `
      <h3>${course.number}</h3>
      <p>${course.name}</p>
      <p><strong>${course.credits} Credits</strong></p>
    `;

    card.addEventListener("click", () => openModal(course));
    container.appendChild(card);
  });

  updateCredits(list);
}

function updateCredits(list) {
  const sum = list.reduce((t, c) => t + c.credits, 0);
  totalCredits.textContent = sum;
}

// === Modal ===
function openModal(course) {
  dialog.innerHTML = `
    <button id="closeModal">X</button>
    <h2>${course.number}</h2>
    <p><strong>${course.name}</strong></p>
    <p>Credits: ${course.credits}</p>
    <p>${course.description}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
  `;

  dialog.showModal();

  document.getElementById("closeModal").addEventListener("click", () => {
    dialog.close();
  });
}

// Close modal when clicking outside
dialog.addEventListener("click", (e) => {
  const dialogBox = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogBox.left ||
    e.clientX > dialogBox.right ||
    e.clientY < dialogBox.top ||
    e.clientY > dialogBox.bottom
  ) {
    dialog.close();
  }
});

// === Filters ===
document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.number.startsWith("WDD"))));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.number.startsWith("CSE"))));

// === Start ===
displayCourses(courses);
