import "../style.css";
import { fetchBooks } from "./fetchBooks";
import { loadMore } from "./loadMore";
import { handleScroll } from "./scrollEvents";

// Elementi del DOM globali
const loadMoreBtn = document.createElement("button");
loadMoreBtn.id = "load-more";
loadMoreBtn.className =
  "bg-slate-950 hover:bg-slate-900 shadow-lg text-white py-2 px-4 rounded hidden";
loadMoreBtn.innerText = "Load More";
document.getElementById("load-more-btn-container").appendChild(loadMoreBtn);

const returnTopBtn = document.createElement("button");
returnTopBtn.id = "return-top";
returnTopBtn.className =
  "bg-slate-950 text-white rounded-full w-10 h-10 shadow-lg hover:bg-slate-900 transition transition-opacity opacity-0 pointer-events-none fixed bottom-10 right-4 flex items-center justify-center";
returnTopBtn.innerHTML = `
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
  </svg>`;
document.body.appendChild(returnTopBtn);

document.getElementById("search-box").addEventListener("submit", (event) => {
  //Prevent default per evitare che la pagina si aggiorni
  event.preventDefault();
  fetchBooks(event, 0, true);
});

loadMoreBtn.addEventListener("click", loadMore);

handleScroll();
