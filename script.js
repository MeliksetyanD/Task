// =================================== gallery

const main = [
  ...document.querySelectorAll('.gallery__main-item div'),
  ...document.querySelectorAll('.floor-plan__item div'),
]
const imagePopup = document.querySelector('.image__popup')
const imagePopupImage = document.querySelector('.image__popup img')
const closeSpan = document.querySelector('.image__popup span')
const overlay = document.querySelectorAll('.overlay')
// Questions select
const questionItem = document.querySelectorAll('.question-close')

questionItem.forEach((item) => {
  item.addEventListener('click', function (e) {
    if (item.classList.contains('question-open')) {
      item.className = 'question-close'
      return
    }
    questionItem.forEach((elem) => (elem.className = 'question-close'))
    item.className = 'question-close'
    item.className = 'question-open'
  })
})

// gallery
main.forEach((item) => {
  item.onclick = () => {
    overlay.forEach((overlayItem) => (overlayItem.style.display = 'none'))
    imagePopup.style.display = 'block'
    imagePopupImage.src = item.nextElementSibling.getAttribute('src')
  }

  closeSpan.onclick = () => {
    overlay.forEach((overlayItem) => (overlayItem.style.display = 'flex'))
    imagePopup.style.display = 'none'
  }
  imagePopup.addEventListener('click', function (event) {
    if (event.target != imagePopupImage) {
      overlay.forEach((overlayItem) => (overlayItem.style.display = 'flex'))

      imagePopup.style.display = 'none'
    }
  })
})
// =================================== gallery

// navigation
function addActiveClass(bool) {}
let navigation = document.querySelectorAll('.nav__sidebar-list__item')
navigation.forEach((item) => {
  item.addEventListener('click', function () {
    navigation.forEach((item) => {
      item.classList.remove('nav__sidebar-list__item-active')
    })
    item.classList.add('nav__sidebar-list__item-active')
  })
})

// select
const selectCancel = document.querySelectorAll('#select-cancel')
const selectAll = document.querySelectorAll('#select-all')
const downloadBtn = document.querySelectorAll('#download-button')
const checkbox = document.querySelectorAll('.checkbox')

checkbox.forEach((el) => {
  el.addEventListener('click', function (event) {
    selectAllHandler(event)
  })
})

selectCancel.forEach((item) => {
  item.addEventListener('click', function (event) {
    cancelSelectHandler(event)
  })
})
selectAll.forEach((item) => {
  item.addEventListener('click', function (event) {
    selectAllHandler(event)
  })
})

function cancelSelectHandler(event) {
  let itemEl = [...event.target.parentElement.previousElementSibling.children]

  itemEl.forEach((elem) => {
    if (
      elem.classList.contains('floor-plan__item') ||
      elem.classList.contains('gallery__main-item')
    ) {
      elem.querySelector('.checkbox').checked = false
    }
  })
}
function selectAllHandler(event) {
  if (!event.target.classList.contains('checkbox')) {
    let itemEl = [...event.target.parentElement.previousElementSibling.children]

    itemEl.forEach((elem) => {
      let elementCheck = elem.querySelector('.checkbox')

      if (
        elem.classList.contains('floor-plan__item') ||
        elem.classList.contains('gallery__main-item')
      ) {
        elementCheck.checked = true
      }
    })
  } else {
  }
}
