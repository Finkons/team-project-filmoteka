const themeBtn = document.getElementById('toggle-theme-btn')




function setDarkTheme() {
  document.body.classList.add('dark')
  themeBtn.textContent = "🔆"
  localStorage.theme = 'dark'
}

function setLightTheme() {
  document.body.classList.remove('dark')
  themeBtn.textContent = "🌙"
  localStorage.theme = 'light'
}

themeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    setLightTheme()
  } else {
    setDarkTheme()
  }
})

if (localStorage.theme === 'dark') {
  setDarkTheme()
}


