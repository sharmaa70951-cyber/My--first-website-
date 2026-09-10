const searchInput = document.getElementById("searchInput");
const movieCards = document.querySelectorAll(".movie-card");
const categoryButtons = document.querySelectorAll(".category-btn");
const noResults = document.getElementById("noResults");

let selectedCategory = "All";

function filterMovies() {
    const searchText = searchInput.value.toLowerCase().trim();
    let count = 0;

    movieCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const category = card.dataset.category;

        const searchMatch = title.includes(searchText);
        const categoryMatch =
            selectedCategory === "All" ||
            category === selectedCategory;

        if (searchMatch && categoryMatch) {
            card.style.display = "block";
            count++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display =
        count === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterMovies);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterMovies();
    });
});
