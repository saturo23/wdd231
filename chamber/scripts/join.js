// Add timestamp for join form
const timestampField = document.getElementById('timestamp');
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Modals
document.querySelectorAll('[data-modal]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.getElementById(link.dataset.modal);
    if (modal) modal.style.display = 'block';
  });
});

document.querySelectorAll('.modal .close').forEach(btn => {
  btn.addEventListener('click', e => {
    btn.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) e.target.style.display = 'none';
});

// Populate thankyou.html fields
const params = new URLSearchParams(window.location.search);
const fieldIds = ['firstName', 'lastName', 'email', 'mobile', 'businessName', 'timestamp'];
fieldIds.forEach(id => {
  const el = document.getElementById(id);
  if (el && params.get(id)) el.textContent = params.get(id);
});
