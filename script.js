//--Montrer le Menu
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  // valider la variable exist
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      // ajout de montrer le menu dans la div
      nav.classList.toggle( 'show-menu')
    })
  }
}
showMenu('nav-toggle','nav-menu')

/*-- retirer le menu mobile--*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  // lorscqu'on click sur le nav_link
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*-- scroll sections--*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
  const scrollY = window.pageYOffset

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
    }else{
      document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*-- montrer scroll top--*/
function scrollTop(){
  const scrollTop = document.getElementById('scroll-top');
  // lorsqu'il est superieur a 560viewport, ajout the show-scroll class
  if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*-------- Dark Light Theme ----*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//we obtain the current theme that the interface has by validating the dark theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// we validate if the user previously choose a topic
if (selectedTheme) {
  // if the validation is fulfilled, we ask what the issue was to know if we activated
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

//Activate / desactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  //Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // we have the theme and the current icon that the user choose
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

/*--- reduce the size and print on A4 sheet ---*/
function scaleCv(){
  document.body.classList.add('scale-cv')
}

/*--- remove the size when the cv is downloaded --*/
function removeScale(){
  document.body.classList.remove('scale-cv')
}
/*--- generate PDF ---*/
// PDF generated area
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')

// Html2pdf options
let opt = {
  margin:       0,
  filename:     'myResume.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 4 },
  jsPDF:        {  format: 'a4', orientation: 'portrait' }
}

// Function to call areaCv and Html2Pdf options
function generateResume(){
  html2pdf(areaCv, opt)
}


//when the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () =>{
  //1. The scaleCv(): void is added to the body, where it reduces the size
  scaleCv()

  //2. The PDF  is generated
  generateResume()

  //3. The .scale-cv class is removed from the body after 5 seconds to return
  setTimeout(removeScale, 5000)
})
  
