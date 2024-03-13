

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    const accordionItemBody = accordionItemHeader.nextElementSibling;

    // Close all accordion items except the clicked one
    accordionItemHeaders.forEach((item) => {
      if (item !== accordionItemHeader) {
        item.classList.remove("active");
        item.nextElementSibling.style.maxHeight = 0;
      }
    });

    // Toggle the active state of the clicked accordion item
    accordionItemHeader.classList.toggle("active");

    // Toggle the maxHeight of the accordion item body
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});
