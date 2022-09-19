const parentItems = document.querySelectorAll('.parent-list-item')
const dropDownList = document.querySelector('.dropdown-list-item')

parentItems.forEach((parentItem) => {
  parentItem.addEventListener('click', () => {
    parentItem.classList.toggle('close-drop-down')
  })
})

const baseURL =
  'https://staging.staging.b2brain.com/search/autocomplete_org_all/'

let accountsData
const searchVisibleContainer = document.querySelector(
  '.search-visible-container'
)
const searchInput = document.querySelector('.search-input')
const searchVisibleSection = document.querySelector('.search-visible-section')
const searchBar = document.querySelector('.search-bar')
const searchCloseIcon = document.querySelector('.search-close-img')

fetch(baseURL)
  .then((response) => response.json())
  .then((data) => {
    getData(data)
  })

function getData(data) {
  accountsData = data
  let myHTML = ''
  data.forEach((item) => {
    myHTML += `
    <div class="results-card" data-slug="${item.slug.replace(
      '-',
      ' '
    )}" data-company-name="${item.company.toLowerCase()}">
      <div class="result-image">
        <img src="/images/accounts-logo.png">
      </div>
      <div class="result-text">
        <h4>${item.company}</h4>
        <p>${item.website}</p>
      </div>
      <button class="track-btn">
      <img src="/images/icons/spinner.svg">
      <span>Track</span>
      </button>
    </div>
  `
  })

  searchVisibleContainer.innerHTML = myHTML
}

searchInput.addEventListener('input', (e) => {
  const companiesArray = Array.from(searchVisibleContainer.children)
  companiesArray.forEach((company) => {
    if (
      (company.dataset.slug + company.dataset.companyName).includes(
        e.target.value.toLowerCase()
      ) &&
      e.target.value.length
    ) {
      company.lastElementChild.classList.add('loading')
      timerId = setTimeout(() => {
        company.lastElementChild.classList.remove('loading')
        company.lastElementChild.classList.add('tracking')
        company.lastElementChild.lastElementChild.innerText = 'Tracking'
      }, 500)
    } else {
      setTimeout(() => {
        company.lastElementChild.classList.remove('tracking')
        company.lastElementChild.lastElementChild.innerText = 'Track'
      }, 550)
    }
  })
})

searchInput.addEventListener('focus', () => {
  document.body.style.cssText = 'overflow-y: hidden;'
  searchBar.classList.add('search-focus')
  searchVisibleSection.classList.add('search-focus')
})

searchCloseIcon.addEventListener('click', () => {
  document.body.style.cssText = ''
  searchBar.classList.remove('search-focus')
  searchVisibleSection.classList.remove('search-focus')
  searchInput.value = ''
})
