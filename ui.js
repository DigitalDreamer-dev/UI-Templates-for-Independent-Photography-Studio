const loadingOverlay = document.getElementById("loadingOverlay");
const templateGrid = document.getElementById("templateGrid");
const emptyState = document.getElementById("emptyState");
const totalTemplates = document.getElementById("totalTemplates");
const totalCategories = document.getElementById("totalCategories");
const recentUpdate = document.getElementById("recentUpdate");
const modal = document.getElementById("templateModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");


const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const filterButtons = document.querySelectorAll(".filter");

let templates = [
  {
    title: "Wedding Booking Form",
    category: "Wedding",
    description: "Customer booking workflow for photography sessions.",
    updated: "Updated Today",
  },
  {
    title: "Photo Shoot Checklist",
    category: "Portrait",
    description: "Checklist used before portrait sessions.",
    updated: "Updated Yesterday",
  },
  {
    title: "Invoice Template",
    category: "Invoice",
    description: "Billing template for completed projects.",
    updated: "Updated This Week",
  },
];

let currentCategory = "All";

function showLoader() {
  loadingOverlay.style.display = "flex";
}

function hideLoader() {
  loadingOverlay.style.display = "none";
}

function updateStatistics() {

  totalTemplates.textContent = templates.length;

  const uniqueCategories = new Set(
    templates.map(template => template.category)
  );

  totalCategories.textContent = uniqueCategories.size;

  if (templates.length > 0) {
    recentUpdate.textContent = templates[0].updated;
  }

}

function createCard(template, index) {
  return `
        <article class="template-card">

            <div class="badge">
                ${template.category}
            </div>

            <h3>${template.title}</h3>

            <p>
                ${template.description}
            </p>

            <div class="card-footer">

                <span>
                    ${template.updated}
                </span>

                <button class="open-btn" data-index="${index}">
                Open
                </button>

            </div>

        </article>
    `;
}

function renderTemplates(data) {
  templateGrid.innerHTML = "";

  if (data.length === 0) {
    emptyState.style.display = "block";
    templateGrid.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  templateGrid.style.display = "grid";

  data.forEach((template, index) => {
  templateGrid.innerHTML += createCard(template, index);
});

document.querySelectorAll(".open-btn").forEach((btn) => {

    btn.addEventListener("click", () => {

        const template = data[btn.dataset.index];

        modalTitle.textContent = template.title;

        modalCategory.textContent = template.category;

        modalDescription.textContent = template.description;

        modal.style.display = "flex";

        console.log("[Analytics] User opened template");

    });

});

  updateStatistics();
}

function filterTemplates() {
  let keyword = searchInput.value.trim().toLowerCase();

  let filtered = templates.filter((template) => {
    let matchesSearch =
      template.title.toLowerCase().includes(keyword) ||
      template.description.toLowerCase().includes(keyword) ||
      template.category.toLowerCase().includes(keyword);

    let matchesCategory =
      currentCategory === "All" || template.category === currentCategory;

    return matchesSearch && matchesCategory;
  });

  renderTemplates(filtered);
}

searchBtn.addEventListener("click", () => {
  showLoader();

  setTimeout(() => {
    hideLoader();
    filterTemplates();
  }, 1000);
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentCategory = button.textContent.trim();

    filterTemplates();
  });
});

window.addEventListener("load", () => {
  showLoader();

  setTimeout(() => {
    hideLoader();
    renderTemplates(templates);
  }, 1200);
});
const form = document.getElementById("templateForm");
const templateName = document.getElementById("templateName");
const category = document.getElementById("category");
const description = document.getElementById("description");

function sanitizeInput(value) {
  const div = document.createElement("div");

  div.textContent = value;

  return div.innerHTML.trim();
}

function showError(element) {
  element.classList.add("error");
}

function removeError(element) {
  element.classList.remove("error");
}

function validateForm() {
  let valid = true;

  if (templateName.value.trim() === "") {
    showError(templateName);

    valid = false;
  } else {
    removeError(templateName);
  }

  if (category.value === "") {
    showError(category);

    valid = false;
  } else {
    removeError(category);
  }

  if (description.value.trim() === "") {
    showError(description);

    valid = false;
  } else {
    removeError(description);
  }

  return valid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  showLoader();

  setTimeout(() => {
    const newTemplate = {
      title: sanitizeInput(templateName.value),

      category: sanitizeInput(category.value),

      description: sanitizeInput(description.value),

      updated: "Just Now",
    };

    templates.unshift(newTemplate);

    updateStatistics();

    filterTemplates();

    hideLoader();

    console.log("[Analytics] User interacted with UI Templates");

    form.reset();

    removeError(templateName);
    removeError(category);
    removeError(description);

    alert("Template created successfully.");
  }, 800);
});

templateName.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    removeError(this);
  }
});

category.addEventListener("change", function () {
  if (this.value !== "") {
    removeError(this);
  }
});

description.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    removeError(this);
  }
});

document.getElementById("showFormBtn").addEventListener("click", () => {
  document.querySelector(".form-section").scrollIntoView({
    behavior: "smooth",
  });
});

updateStatistics();
// const modal = document.getElementById("templateModal");

document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.display = "none";
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {

    if(event.target===modal){

        modal.style.display="none";

    }

});
