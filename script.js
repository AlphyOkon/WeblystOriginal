// HERO FADE-IN ANIMATION (Webflow-style)
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  hero.style.opacity = "0";
  hero.style.transform = "translateY(20px)";
  
  setTimeout(() => {
    hero.style.transition = "0.8s ease";
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }, 100);
});


// SEARCH BAR FUNCTIONALITY
const searchForm = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar input");

document.querySelector('a[href="#browse-items"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#browse-items').scrollIntoView({ behavior: 'smooth' });
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (query === "") {
    alert("Please enter a model, make, or keyword");
    return;
  }

  fetchCarData(query);
  searchInput.value = "";
});

async function fetchCarData(query) {
  const resultBox = document.getElementById("search-result");
  const spinner = document.getElementById("spinner");
  const noResults = document.getElementById("no-results");

  // Reset states
  resultBox.classList.remove("active");
  noResults.classList.remove("active");

  // Show spinner
  spinner.classList.add("active");

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/cars?model=${query}`, {
      headers: { 'X-Api-Key': 'ESBCEhJ4PpvRnU2UsmFkqIXTnGcMbyTHxdN8uBqs' }
    });

    const data = await response.json();

    // Hide spinner
    spinner.classList.remove("active");

    if (data.length === 0) {
      noResults.classList.add("active");
      return;
    }

    const car = data[0];

    resultBox.innerHTML = `
      <div class="car-card">
        <h3>${car.make} ${car.model}</h3>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Class:</strong> ${car.class}</p>
      </div>
    `;

    resultBox.classList.add("active");

  } catch (error) {
    spinner.classList.remove("active");
    noResults.innerText = "Error fetching car data.";
    noResults.classList.add("active");
  }
}




  // Placeholder for future functionality:
  // - Filter car list
  // - Fetch API results
  // - Navigate to results page

  searchInput.value = "";
;


// OPTIONAL: Add subtle input glow on typing
searchInput.addEventListener("input", () => {
  if (searchInput.value.length > 0) {
    searchInput.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.15)";
  } else {
    searchInput.style.boxShadow = "none";
  }
});

// SORTING PROJECT DATA
const items = [
  { title: "Toyota Camry", date: "2024-05-10" },
  { title: "Chevrolet Silverado", date: "2024-03-02" },
  { title: "Lexus RX", date: "2023-12-15" },
  { title: "Ford F-150", date: "2024-06-01" }
];

const itemsContainer = document.getElementById("items-container");
const sortSelect = document.getElementById("sort-select");

// Render cards
function renderItems(list) {
  itemsContainer.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    card.innerHTML = `
      <h3 class="item-title">${item.title}</h3>
      <p class="item-date">Date: ${item.date}</p>
    `;

    itemsContainer.appendChild(card);
  });
}

// Sorting logic
function sortItems(list, mode) {
  const sorted = [...list];

  if (mode === "az") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (mode === "za") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  } else if (mode === "newest") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (mode === "oldest") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return sorted;
}

// Listen for dropdown changes
sortSelect.addEventListener("change", () => {
  const mode = sortSelect.value;
  const sortedList = sortItems(items, mode);
  renderItems(sortedList);
});

// Initial load
renderItems(items);

// Menu toggle functionality
const menuToggle = document.getElementById("menuToggle");
const sidebarMenu = document.getElementById("sidebarMenu");

menuToggle.addEventListener("click", () => {
  sidebarMenu.classList.toggle("active");
});

