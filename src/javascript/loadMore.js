import { fetchBooks } from "./fetchBooks";

let offset = 0;

//Funzione per caricare più risultati
export const loadMore = () => {
  const loadMoreBtn = document.getElementById("load-more");
  loadMoreBtn.classList.add("hidden");
  offset += 10;
  fetchBooks(null, offset);
};
