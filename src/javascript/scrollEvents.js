export const handleScroll = () => {
  const returnTopBtn = document.getElementById("return-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      returnTopBtn.classList.remove("opacity-0", "pointer-events-none");
      returnTopBtn.classList.add("opacity-100");
    } else {
      returnTopBtn.classList.remove("opacity-100");
      returnTopBtn.classList.add("opacity-0", "pointer-events-none");
    }
  });
  returnTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
};
