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
  container.innerHTML = '';
  let creditSum = 0;

  list.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>${course.credits} credits</p>
    `;
    card.style.background = course.completed ? '#c3e6cb' : '#f5c6cb';
    container.appendChild(card);
    creditSum += course.credits;
  });

  totalCredits.textContent = creditSum;
}

// Initial load
displayCourses(courses);

// Filter buttons
document.getElementById('all').addEventListener('click', () => displayCourses(courses));
document.getElementById('wdd').addEventListener('click', () => displayCourses(courses.filter(c => c.type === 'WDD')));
document.getElementById('cse').addEventListener('click', () => displayCourses(courses.filter(c => c.type === 'CSE')));
