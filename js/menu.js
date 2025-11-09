let listOfData = [];

// Fetches article data from a JSON file
const fetchData = async () => {
  try {
    const promise = await fetch("files/data.json");
    const data = await promise.json();
    listOfData = [...data];
    setData();
  } catch (error) {
    alert(error.message);
  }
};

fetchData();

const menuSearchBar = document.getElementById("menu-search-bar");
const menuFilter = document.getElementById("menu-filter");
const menuResetButton = document.getElementById("menu-reset-button");

let searchResult = "";
let searchFilter = "";

// Take user input in the search bar, updates the search query, and refreshes the displayed data.
menuSearchBar.addEventListener("input", () => {
  searchResult = menuSearchBar.value.toLowerCase();
  //console.log(searchResult);
  setData();
});

// Take user input in the filter and refreshes the displayed data.
menuFilter.addEventListener("change", () => {
  searchFilter = menuFilter.value.toLowerCase();
  //console.log(searchFilter);
  setData();
});

// Add reset the search bar functionality to the button
menuResetButton.addEventListener("click", resetSearch);

// Reset the search bar
function resetSearch() {
  menuSearchBar.value = "";
  searchResult = "";
  menuFilter.value = "All";
  searchFilter = "";
  setData();
}

// Filters and displays articles based on the current search input.
const setData = () => {
  const articleContainer = document.getElementById("menu-container");
  const listOfArticles = listOfData
    .filter((element) => {
      let checkSearch = searchResult
        ? element.article_title.toLowerCase().includes(searchResult)
        : true;

      let checkFilter =
        searchFilter && searchFilter != "all"
          ? element.language.toLowerCase() == searchFilter
          : true;

      return checkSearch && checkFilter;
    })
    .map((element) => createCard(element));

  articleContainer.innerHTML = listOfArticles.join("");
};

setData();

// Stores the selected article ID in localStorage for later retrieval.
function handleClick(articleId) {
  console.log(articleId);
  localStorage.setItem("articleId", articleId);
}

// Creates and returns a DOM card element based on the provided article data.
function createCard(element) {
  logoUrl = "./images/cpp-logo.png";
  if (element.language == "Python") {
    logoUrl = "./images/python-logo.svg.png";
  }
  return `
    <a href="article.html" class="menu-card" id="${element.id}" onclick="handleClick('${element.id}')">
        <div class="menu-card-image">
            <img src="${logoUrl}" />
        </div>
        <div class="menu-card-content">
            <h1 class="menu-card-title">${element.article_title}</h1>
            <p>${element.article_intro}</p>
        </div>
    </a>`;
}

const backToTopBtn = document.getElementById("btn-to-top");

// Creates back to top button
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
