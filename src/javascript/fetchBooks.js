import axios from "axios";
import { displayResults } from "./displayResults";

const getEndpoint = (query, offset = 0) =>
  `https://openlibrary.org/subjects/${query}.json?limit=10&offset=${offset}`;

export const fetchBooks = (event, offset = 0, isNewSearch = false) => {
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
      document.getElementById("load-more").classList.remove("hidden");
    })
    .catch((error) => {
      console.error(error);
    });
};
