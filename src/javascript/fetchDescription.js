import axios from "axios";
import get from "lodash/get";

export const fetchDescription = (workKey, container) => {
  axios
    .get(`https://openlibrary.org${workKey}.json`)
    .then((response) => {
      const description =
        get(response.data, "description.value") ||
        get(response.data, "description") ||
        "Description not available";

      const descriptionContainer = document.createElement("p");
      descriptionContainer.className = "mt-2 text-gray-600";
      descriptionContainer.innerText = description;
      container.appendChild(descriptionContainer);
    })
    .catch((error) => {
      console.error("Errore nella descrizione:", error);
    });
};
