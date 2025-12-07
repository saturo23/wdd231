// form-action.js
document.getElementById('year-action').textContent = new Date().getFullYear();

(function () {
  let data = null;

  try {
    const raw = sessionStorage.getItem('aetherion_contact');

    if (raw) {
      data = JSON.parse(raw);
      sessionStorage.removeItem('aetherion_contact'); // cleanup
    } else {
      // fallback: get data from URL query parameters
      const params = new URLSearchParams(window.location.search);
      if ([...params.keys()].length > 0) {
        data = Object.fromEntries(params.entries());
      }
    }
  } catch (e) {
    console.warn(e);
  }

  const out = document.getElementById('result');

  if (!data) {
    out.innerHTML = `
      <p>No form data found. Try submitting the contact form again.</p>
    `;
  } else {
    out.innerHTML = `
      <table class="card">
        <thead>
          <tr><th>Field</th><th>Value</th></tr>
        </thead>
        <tbody>
          ${Object.entries(data)
            .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
            .join("")}
        </tbody>
      </table>
    `;
  }
})();
