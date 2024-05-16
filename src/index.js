import _ from "lodash";
const axios = require("axios");

//Funzione per la chiamata API
const apiCall = function (event) {
  //Prevent Default per non far aggiornare la pagina
  event.preventDefault();
  const query = document.getElementById("search-bar").value;
  const endpoint = `https://openlibrary.org/subjects/${query}.json?limit=10&jscmd=data`;
  axios
    .get(endpoint)
    .then(function (response) {
      _.forEach(response.data.works, (work) => {
        const title = work.title;
        const authorNames = _.map(work.authors, "name");
        //const description =;
        const bookContainer = document.createElement("div");
        bookContainer.innerHTML = ` ${title} ${authorNames}`;
        document.body.appendChild(bookContainer);
      });
      loadMoreBtn.innerHTML = `<button id="load-more">Load More</button>`;
      document.body.appendChild(loadMoreBtn);
      document.getElementById("load-more").addEventListener("click", loadMore);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//Nello scope globale perché richiamato da diverse funzioni
const loadMoreBtn = document.createElement("button");
let offset = 0;

const loadMore = function () {
  loadMoreBtn.innerHTML = `<button style= "display: hidden" id="load-more">Load More</button>`;
  offset += 10;
  const query = document.getElementById("search-bar").value;
  const endpoint = `https://openlibrary.org/subjects/${query}.json?limit=10&offset=${offset}`;
  axios
    .get(endpoint)
    .then(function (response) {
      _.forEach(response.data.works, (work) => {
        const title = work.title;
        const authorNames = _.map(work.authors, "name");

        const bookContainer = document.createElement("div");
        bookContainer.innerHTML = ` ${title} ${authorNames}`;
        document.body.appendChild(bookContainer);
      });
      loadMoreBtn.innerHTML = `<button id="load-more">Load More</button>`;
      document.body.appendChild(loadMoreBtn);
      document.getElementById("load-more").addEventListener("click", loadMore);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

document.getElementById("search-box").addEventListener("submit", apiCall);