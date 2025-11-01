(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Toggle GST visibility with the tax switch
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('flexSwitchCheckDefault');
  if (!toggle) return;

  const updateTaxVisibility = () => {
    // When checked (display totals), hide +GST text; when unchecked, show it
    if (toggle.checked) {
      document.body.classList.add('tax-show');
    } else {
      document.body.classList.remove('tax-show');
    }
  };

  toggle.addEventListener('change', updateTaxVisibility);
  updateTaxVisibility(); // initialize on load
});

// Scroll controls for filters row
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('filters-container');
  const leftBtn = document.querySelector('.scroll-btn.left-btn');
  const rightBtn = document.querySelector('.scroll-btn.right-btn');
  if (!container || !leftBtn || !rightBtn) return;

  const SCROLL_AMOUNT = 300;
  leftBtn.addEventListener('click', () => {
    container.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    container.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  });
});