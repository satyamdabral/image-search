const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
const formEl = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults= document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");
let page = 1;

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  page = 1;
  await searchImages();
});

showMoreButton.addEventListener("click", searchImages);

async function searchImages() {
  const inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
      const imageWrapper = createImageWrapper(result);
      searchResults.appendChild(imageWrapper);
    });

    page++;

    showMoreButton.style.display = page > 1 ? "block" : "none";
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function createImageWrapper(result) {
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("search-result");
  imageWrapper.innerHTML = `
    <img src="${result.urls.small}" alt="${result.alt_description}">
    <a href="${result.links.html}" target="_blank">${result.alt_description}</a>
  `;
  return imageWrapper;
}
