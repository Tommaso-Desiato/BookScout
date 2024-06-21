import forEach from "lodash/forEach";
import map from "lodash/map";
import { fetchDescription } from "./fetchDescription";

export const displayResults = (response) => {
  const bookInfoDiv = document.getElementById("book-info");
  const fragment = document.createDocumentFragment();

  forEach(response.data.works, (work) => {
    const title = work.title;
    const authorNames = map(work.authors, "name").join(",");
    const workKey = work.key;
    const coverId = work.cover_id;

    const bookContainer = document.createElement("div");
    bookContainer.dataset.workKey = workKey;
    bookContainer.className =
      "bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center cursor-pointer";
    bookContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-2 text-center">${title}</h3> 
      <img src="https://covers.openlibrary.org/b/id/${coverId}-L.jpg" alt="${title} cover" class="w-11/12 h-auto object-cover mb-2" /> 
      <p class="text-gray-700 mb-2">${authorNames}</p>`;
    //Rimuove event listener per evitare molteplici fetchDescription
    const handleClick = () => {
      fetchDescription(workKey, bookContainer);
      bookContainer.removeEventListener("click", handleClick);
    };

    bookContainer.addEventListener("click", handleClick);

    fragment.appendChild(bookContainer);
  });

  bookInfoDiv.appendChild(fragment);
};
