const themeBtn = document.getElementById('toggle-theme-btn')

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})