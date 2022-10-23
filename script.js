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
const galleryCounts = document.querySelectorAll('.gallery__about')
const newarr = new Set()

function checkHandler(element) {
  let slectedItems = element
    .closest('section')
    .querySelector('.selected__items')
  let checkedItems = [
    ...element.closest('.gallery__main').querySelectorAll('.checkbox'),
  ]
  let itemsLength = 0
  let itemsSize = 0

  checkedItems.map((item) => {
    if (item.checked) {
      let image = item.previousElementSibling
      console.log(image)
      newarr.add(image)
      itemsLength++
      itemsSize += Number(
        (image.naturalWidth * image.naturalHeight) / 8 / 1024 / 1024
      )
    } else {
      newarr.delete(item.previousElementSibling)
    }
    slectedItems.children[0].innerHTML = `Selected ${itemsLength}  Items •`
    slectedItems.children[1].innerHTML = `Size :  ${itemsSize.toFixed(2)}  MB `
  })
}

checkbox.forEach((el) => {
  el.addEventListener('click', function (event) {
    checkHandler(el)
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
      checkHandler(elem)
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
        checkHandler(elem)
      }
    })
  } else {
  }
}
downloadBtn.forEach((item) => {
  item.addEventListener('click', function () {
    for (const item of newarr) {
      let a = document.createElement('a')
      a.href = item.src
      a.download = item.id
      a.click()
    }
    newarr.clear()
    checkbox.forEach((item) => (item.checked = false))
  })
})

galleryCounts.forEach((countItem) => {
  let count = 0
  let size = 0
  let elem = [
    ...countItem.closest('section').querySelector('.gallery__main').children,
  ]

  elem.forEach((item) => {
    if (
      item.matches('.floor-plan__item') ||
      item.matches('.gallery__main-item')
    ) {
      let currentImg = item.querySelector('img')
      size += Number(currentImg.naturalWidth * currentImg.naturalHeight)
      count++

      countItem.children[0].innerHTML = `Quantity: ${count}`
      countItem.children[1].innerHTML = `Size: ${(size / 8 / 1024).toFixed(
        2
      )} MB`
    }
  })
})
