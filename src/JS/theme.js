const themeBtn = document.getElementById('toggle-theme-btn')
const themeImg = document.getElementById('toggle-theme-img')

themeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    setLightTheme()
  } else {
    setDarkTheme()
  }
})

function setDarkTheme() {
  document.body.classList.add('dark')
  themeImg.src = 'images/theme/sunnysunshine.ico'
  localStorage.theme = 'dark'
}

function setLightTheme() {
  document.body.classList.remove('dark')
  themeImg.src = 'images/theme/moon.png'
  localStorage.theme = 'light'
}

if (localStorage.theme === 'dark') {
  setDarkTheme()
}
console.log(themeImg.src);