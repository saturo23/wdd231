// course.js - Display and filter courses
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 3, type: "CSE", completed: false },
  { code: "CSE210", name: "Programming with Classes", credits: 3, type: "CSE", completed: false },
  { code: "WDD231", name: "Frontend Development I", credits: 3, type: "WDD", completed: false },
];

const container = document.getElementById('courseContainer');
const totalCredits = document.getElementById('totalCredits');

function displayCourses(list) {
  if (!container || !totalCredits) return;

  container.innerHTML = '';
  let creditSum = 0;

  list.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');

    // Inline background colors based on completion
    card.style.backgroundColor = course.completed ? '#c3e6cb' : '#f5c6cb';

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>${course.credits} credits</p>
    `;

    container.appendChild(card);
    creditSum += course.credits;
  });

  totalCredits.textContent = creditSum;
}

// Initial display
displayCourses(courses);

// Filter buttons
const filters = [
  { id: 'all', filter: () => courses },
  { id: 'wdd', filter: () => courses.filter(c => c.type === 'WDD') },
  { id: 'cse', filter: () => courses.filter(c => c.type === 'CSE') },
];

filters.forEach(f => {
  const btn = document.getElementById(f.id);
  if (btn) {
    btn.addEventListener('click', () => displayCourses(f.filter()));
  }
});
