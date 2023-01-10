let searchInput = document.getElementById("searchInput");
let searchResultContainer = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultConatiner = document.createElement("div");
    resultConatiner.classList.add("result-item", "shadow", "p-3");
    searchResultContainer.appendChild(resultConatiner);

    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    resultConatiner.appendChild(titleEl);

    let lineBreak = document.createElement("br");
    resultConatiner.appendChild(lineBreak);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_balnk";
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    resultConatiner.appendChild(urlEl);

    let lineBreakEl = document.createElement("br");
    resultConatiner.appendChild(lineBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultConatiner.appendChild(descriptionEl)
}

function displaySearchResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAppendSearchResult(result);
    }

}

function searchWikipedia(event) {
    if (event.key === 'Enter') {
        searchResultContainer.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInputValue = searchInput.value;
        if (searchInputValue === "") {
            alert("Enter a word");
            spinnerEl.classList.toggle("d-none")
            return;
        }
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            let {
                search_results
            } = jsonData;

            displaySearchResults(search_results);
        });
    }
}
searchInput.addEventListener("keydown", searchWikipedia);
