/* steps to build wikepedia application
1)add event listener and get the searched result
2)make http request to get the searched results of the entered text;
3)display searched results */
let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAppendEachResult(result) {
  let { title, link, description } = result;
  //1)create HTMLDivElement
  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  searchResultsEl.appendChild(resultItemEl);
  //2)anchor title
  let resultTitleEl = document.createElement("a");
  resultTitleEl.classList.add("result-title");
  resultTitleEl.textContent = title;
  resultTitleEl.href = link;
  resultTitleEl.target = "_blank";

  resultItemEl.appendChild(resultTitleEl);
  //3)break Element
  let breakEl = document.createElement("br");

  resultItemEl.appendChild(breakEl);
  //4)anchor url
  let anchorurlEl = document.createElement("a");
  anchorurlEl.classList.add("result-url");
  anchorurlEl.href = link;
  anchorurlEl.target = "_blank";
  anchorurlEl.textContent = link;

  resultItemEl.appendChild(anchorurlEl);
  //4)break Element
  let breakEl2 = document.createElement("br");

  resultItemEl.appendChild(breakEl2);
  //5)paragraph dexcription
  let descriotionEl = document.createElement("p");
  descriotionEl.classList.add("link-description");
  descriotionEl.textContent = description;

  resultItemEl.appendChild(descriotionEl);
}

function displayResults(search_results) {
  spinnerEl.classList.toggle("d-none"); //as we want to hide spinner when results are displaying
  for (let result of search_results) {
    createAppendEachResult(result); //to display each result we are this function
  }
}

function searchwikipedia(event) {
  //here browser sends the event object
  if (event.key === "Enter") {
    //when we press enter key,then we get the input value
    let searchinput = searchInputEl.value;
    //console.log(searchinput);
    //line 65 helps to clear the result of previous entered input on clicking enter
    searchResultsEl.textContent = "";
    spinnerEl.classList.toggle("d-none"); //as we want to appear spinner onclicking enter .toggle removes this class name when it is there/adds class name when it is not ther
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchinput;
    let options = {
      method: "GET", //here we don't need to communicate additional information to the sever as it bydefault gives us the jsondata
    };
    fetch(url, options) //using fetch we send request
      .then(function (response) {
        //getting results
        return response.json(); //we want the json object in response in console
      })
      .then(function (jsonData) {
        //if you want to see the json object data
        //console.log(jsonData);//logging jsondata object
        let { search_results } = jsonData; //we can see the jsonData in search_results key of an object when we log the jsonDataobject
        //console.log(search_results);
        displayResults(search_results);
      });
  }
}
searchInputEl.addEventListener("keydown", searchwikipedia);
