let faqs = document.querySelectorAll(".faq-item");

// Toggles the active state of each FAQ item and updates the icon (+/-) when clicked
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
    const icons = faq.querySelector(".faq-icon");

    if (faq.classList.contains("active")) {
      icons.textContent = "-";
    } else {
      icons.textContent = "+";
    }
  });
});
