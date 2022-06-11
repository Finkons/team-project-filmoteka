const themeBtn = document.getElementById('toggle-theme-btn')
const themeImg = document.querySelector('.theme-img')



function setDarkTheme() {
  document.body.classList.add('dark')
  themeImg.src = "./images/theme/sun.png"
  localStorage.theme = 'dark'
}

function setLightTheme() {
  document.body.classList.remove('dark')
  themeImg.src = "./images/theme/moon.png"
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
console.log(themeImg.src);