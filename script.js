const parentList = document.querySelectorAll('.parent-list-item')
parentList.forEach(parent => parent.addEventListener('click', () => {
  parent.classList.toggle('close-drop-down')
}))

const searchVisibleContainer = document.querySelector(
  ".search-visible-container"
);
const searchInput = document.querySelector(".search-input");
const searchVisibleSection = document.querySelector(".search-visible-section");
const searchBar = document.querySelector(".search-bar");
const searchCloseIcon = document.querySelector(".search-close-img");

//Hard coded companies data - Initial GET
const allCompaniesData = [
  {
    company: "Data Dynamix",
    slug: "data-dynamix",
    location: {
      name: "Denver, CO",
      slug: "denver-co",
    },
    vertical: "Business Services",
    color: "red",
    logo: "https://cbandrey2static.s3.amazonaws.com/media/logos/data-dynamix.jpg",
    website: "www.data-dynamix.com",
  },
  {
    company: "HMS",
    slug: "hi-tech-marketing-solutions",
    location: {
      name: "Pompano Beach, FL",
      slug: "pompano-beach-fl",
    },
    vertical: "Business Services",
    color: "blue-grey",
    logo: "https://cbandrey2static.s3.amazonaws.com/media/logos/hi-tech-marketing-solutions.jpg",
    website: "www.hi-techms.com",
  },
  {
    company: "Garden of E LLC",
    slug: "garden-of-e-llc",
    location: {
      name: "Irvine, CA",
      slug: "irvine-ca",
    },
    vertical: "Business Services",
    color: "teal",
    logo: "",
    website: "www.gardenofe.com",
  },
  {
    company: "Autosort Inc",
    slug: "autosort-inc",
    location: {
      name: "Boise, ID",
      slug: "boise-id",
    },
    vertical: "Business Services",
    color: "cyan",
    logo: "",
    website: "www.mailautosort.com",
  },
  {
    company: "FrontLine Marketing",
    slug: "frontline-marketing-inc",
    location: {
      name: "Norwalk, CT",
      slug: "norwalk-ct",
    },
    vertical: "Business Services",
    color: "green",
    logo: "https://cbandrey2static.s3.amazonaws.com/media/logos/Logo_Frontline_Marketing__resized.png",
    website: "www.frontmark.com",
  },
  {
    company: "Incentive Plus Network",
    slug: "incentive-plus-network",
    location: {
      name: "Castaic, CA",
      slug: "castaic-ca",
    },
    vertical: "Business Services",
    color: "teal",
    logo: "",
    website: "www.incentiveplus.net",
  },
  {
    company: "Admento Specialties Inc",
    slug: "admento-specialties-inc",
    location: {
      name: "New York City, NY",
      slug: "new-york-city-ny",
    },
    vertical: "Business Services",
    color: "indigo",
    logo: "",
    website: "www.admento.com",
  },
  {
    company: "Ad Communal Inc.",
    slug: "ad-communal-inc",
    location: {
      name: "Christiana, North-West, South Africa",
      slug: "christiana-north-west-south-africa",
    },
    vertical: "Business Services",
    color: "blue",
    logo: "https://cbandrey2static.s3.amazonaws.com/media/logos/ad-communal-inc.jpg",
    website: "www.adcommunal.com",
  },
  {
    company: "Mindshare USA LLC",
    slug: "mindshare",
    location: {
      name: "London, England, United Kingdom",
      slug: "london-england-united-kingdom",
    },
    vertical: "Business Services",
    color: "purple",
    logo: "https://cbandrey2static.s3.amazonaws.com/media/logos/mindshare_20190808132034",
    website: "www.mindshareworld.com",
  },
  {
    company: "Data Based Marketing",
    slug: "data-based-marketing",
    location: {
      name: "San Luis Obispo, CA",
      slug: "san-luis-obispo-ca",
    },
    vertical: "Business Services",
    color: "yellow",
    logo: "https://cbandrey2static.s3.amazonaws.com/media/logos/data-based-marketing.jpg",
    website: "www.dbmkt.com",
  },
];

function populateCompanies(companiesData) {
  let myHTML = "";

  companiesData.forEach((item) => {
    myHTML += `
  <div class="results-card" data-slug="${item.slug.replace(
      "-",
      " "
    )}" data-company-name="${item.company.toLowerCase()}">
    <div class="result-image">
      <img src="/images/accounts-logo.png">
    </div>
    <div class="result-text">
      <h4>${item.company}</h4>
      <p>${item.website}</p>
      <p style="display:none">${item.slug}</p>
    </div>
    <button class="track-btn">
    <img src="/images/icons/spinner.svg">
    <span>Track</span>
    </button>
  </div>
`;
  });
  searchVisibleContainer.innerHTML = myHTML;
  searchVisibleContainer.querySelectorAll('.track-btn').forEach((button) => {
    button.addEventListener('click', function () {
      button.parentElement.lastElementChild.classList.add("loading");

      setTimeout(() => {
        button.parentElement.lastElementChild.classList.remove("loading");
        button.parentElement.lastElementChild.classList.add("tracking");
        button.parentElement.lastElementChild.lastElementChild.innerText = "Tracking";
        console.log(`${Array.from(Array.from(button.parentElement.children)[1].children)[0].innerText} ${Array.from(Array.from(button.parentElement.children)[1].children)[2].innerText} tracked at ${new Date(Date.now()).toLocaleTimeString()}`)
      }, 500)
    })


  })
}

populateCompanies(allCompaniesData)

searchInput.addEventListener("input", (e) => {
  fetch('https://staging.staging.b2brain.com/search/autocomplete_org_all/' + '?q=' + e.target.value.toLowerCase())
    .then((response) => response.json())
    .then((data) => {
      populateCompanies(data)
    });

});

const heroSection = document.querySelector('.hero-section-container')
const featuredSection = document.querySelector('.featured-section-container')
const testimonialSection = document.querySelector('.testimonials-container')


searchInput.addEventListener("focus", () => {
  searchBar.classList.add("search-focus");
  searchVisibleSection.classList.add("search-focus");
  heroSection.classList.toggle('hide-display')
  featuredSection.classList.toggle('hide-display')
  testimonialSection.classList.toggle('hide-display')
});

searchCloseIcon.addEventListener("click", () => {
  searchBar.classList.remove("search-focus");
  searchVisibleSection.classList.remove("search-focus");
  searchInput.value = "";
  heroSection.classList.toggle('hide-display')
  featuredSection.classList.toggle('hide-display')
  testimonialSection.classList.toggle('hide-display')
});
