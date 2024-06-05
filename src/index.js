import _ from "lodash";
import "./style.css";

const axios = require("axios");

//Funzione per generare l'endpoint
const getEndpoint = (query, offset = 0) =>
  `https://openlibrary.org/subjects/${query}.json?limit=10&offset=${offset}`;

//Funzione per visualizzare i risultati della chiamata API
const displayResults = (response) => {
  const bookInfoDiv = document.getElementById("book-info");
  //Per ogni libro estrae titolo e lista degli autori e chiave del libro
  _.forEach(response.data.works, (work) => {
    const title = work.title;
    const authorNames = _.map(work.authors, "name");
    const workKey = work.key;
    const coverId = work.cover_id;

    //Crea un div per visualizzare ogni libro
    const bookContainer = document.createElement("div");
    bookContainer.dataset.workKey = workKey;
    bookContainer.innerHTML = `<h3>${title}</h3> <img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" /> <p>${authorNames}</p>`;
    bookContainer.addEventListener("click", fetchDescription);
    bookInfoDiv.appendChild(bookContainer);
  });
};

//Funzione per la chiamata API
const fetchBooks = (event, offset = 0, isNewSearch = false) => {
  //Prevent Default per non far aggiornare la pagina
  if (event) event.preventDefault();
  const query = document.getElementById("search-bar").value;
  const endpoint = getEndpoint(query, offset);

  axios
    .get(endpoint)
    .then((response) => {
      if (isNewSearch) {
        document.getElementById("book-info").innerHTML = "";
        offset = 0;
      }

      displayResults(response);

      loadMoreBtn.innerHTML = `<button id="load-more">Load More</button>`;
      document.body.appendChild(loadMoreBtn);
      document.getElementById("load-more").addEventListener("click", loadMore);
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchDescription = function () {
  const workKey = this.dataset.workKey;

  axios
    .get(`https://openlibrary.org${workKey}.json`)
    .then((response) => {
      const description =
        _.get(response.data, "description.value") ||
        _.get(response.data, "description") ||
        "Descrizione non disponibile";

      const descriptionContainer = document.createElement("p");
      descriptionContainer.innerText = description;
      this.appendChild(descriptionContainer);
      this.removeEventListener("click", fetchDescription);
    })
    .catch((error) => {
      console.error("Errore nella descrizione:", error);
    });
};

//Nello scope globale perché richiamato da diverse funzioni
const loadMoreBtn = document.createElement("button");
let offset = 0;

//Funzione per caricare più risultati
const loadMore = () => {
  loadMoreBtn.innerHTML = `<button style= "display: hidden" id="load-more">Load More</button>`;
  offset += 10;
  fetchBooks(null, offset);
};

document
  .getElementById("search-box")
  .addEventListener("submit", (event) => fetchBooks(event, 0, true));
